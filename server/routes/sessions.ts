import { Router, Request, Response } from 'express';
import { GameSession } from '../models/GameSession.js';
import { Game } from '../models/Game.js';
import { startLoop, stopLoop } from '../engine/gameLoop.js';
import { Server as SocketServer } from 'socket.io';

export function createSessionRouter(io: SocketServer) {
  const router = Router();

  // POST /api/sessions - Create a new session
  router.post('/', async (req: Request, res: Response) => {
    try {
      const { gameId } = req.body;
      const game = await Game.findById(gameId);
      if (!game) return res.status(404).json({ error: 'Game not found' });

      const session = await GameSession.create({ gameId: game._id });
      res.status(201).json(session);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create session' });
    }
  });

  // GET /api/sessions/:id - Get session state
  router.get('/:id', async (req: Request, res: Response) => {
    try {
      const session = await GameSession.findById(req.params.id);
      if (!session) return res.status(404).json({ error: 'Session not found' });

      const game = await Game.findById(session.gameId);
      res.json({ session, game });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch session' });
    }
  });

  // POST /api/sessions/:id/players - Add player
  router.post('/:id/players', async (req: Request, res: Response) => {
    try {
      const session = await GameSession.findById(req.params.id);
      if (!session) return res.status(404).json({ error: 'Session not found' });
      if (session.status === 'playing') return res.status(400).json({ error: 'Cannot add players while game is playing' });

      const { name, team, mode, beerBrand, focusedOn } = req.body;
      if (!name || !team || !mode) return res.status(400).json({ error: 'name, team, and mode are required' });

      const playerId = Math.random().toString(36).substring(2, 9);
      session.players.push({
        playerId,
        name,
        team,
        mode,
        beerBrand: beerBrand || 'Bud Light',
        focusedOn: focusedOn || 'None',
        sips: 0,
        shots: 0,
        shotguns: 0,
        lastDrinkTime: 0,
        lastShotTime: 0,
        lastShotgunTime: 0,
      });
      await session.save();

      io.to(req.params.id).emit('player_joined', { session });
      res.status(201).json(session);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add player' });
    }
  });

  // DELETE /api/sessions/:id/players/:playerId - Remove player
  router.delete('/:id/players/:playerId', async (req: Request, res: Response) => {
    try {
      const session = await GameSession.findById(req.params.id);
      if (!session) return res.status(404).json({ error: 'Session not found' });
      if (session.status === 'playing') return res.status(400).json({ error: 'Cannot remove players while game is playing' });

      session.players = session.players.filter(p => p.playerId !== req.params.playerId);
      await session.save();

      io.to(req.params.id).emit('player_left', { session });
      res.json(session);
    } catch (error) {
      res.status(500).json({ error: 'Failed to remove player' });
    }
  });

  // POST /api/sessions/:id/start - Start game
  router.post('/:id/start', async (req: Request, res: Response) => {
    try {
      const session = await GameSession.findById(req.params.id);
      if (!session) return res.status(404).json({ error: 'Session not found' });
      if (session.players.length === 0) return res.status(400).json({ error: 'Need at least one player' });
      if (session.status === 'playing') return res.status(400).json({ error: 'Game already playing' });

      const game = await Game.findById(session.gameId);
      if (!game) return res.status(404).json({ error: 'Game not found' });

      session.status = 'playing';
      session.startedAt = new Date();
      await session.save();

      startLoop(session._id!.toString(), game.frameInterval, io);

      io.to(req.params.id).emit('game_started', { session });
      res.json(session);
    } catch (error) {
      res.status(500).json({ error: 'Failed to start game' });
    }
  });

  // POST /api/sessions/:id/pause - Pause game
  router.post('/:id/pause', async (req: Request, res: Response) => {
    try {
      const session = await GameSession.findById(req.params.id);
      if (!session) return res.status(404).json({ error: 'Session not found' });

      session.status = 'paused';
      await session.save();
      stopLoop(req.params.id);

      io.to(req.params.id).emit('game_paused', { session });
      res.json(session);
    } catch (error) {
      res.status(500).json({ error: 'Failed to pause game' });
    }
  });

  // POST /api/sessions/:id/resume - Resume game
  router.post('/:id/resume', async (req: Request, res: Response) => {
    try {
      const session = await GameSession.findById(req.params.id);
      if (!session) return res.status(404).json({ error: 'Session not found' });

      const game = await Game.findById(session.gameId);
      if (!game) return res.status(404).json({ error: 'Game not found' });

      session.status = 'playing';
      await session.save();

      startLoop(req.params.id, game.frameInterval, io);

      io.to(req.params.id).emit('game_resumed', { session });
      res.json(session);
    } catch (error) {
      res.status(500).json({ error: 'Failed to resume game' });
    }
  });

  // POST /api/sessions/:id/reset - Reset game
  router.post('/:id/reset', async (req: Request, res: Response) => {
    try {
      const session = await GameSession.findById(req.params.id);
      if (!session) return res.status(404).json({ error: 'Session not found' });

      stopLoop(req.params.id);

      session.status = 'waiting';
      session.currentFrame = 0;
      session.elapsedTime = 0;
      session.startedAt = undefined;
      session.finishedAt = undefined;
      session.players = session.players.map(p => ({
        ...p,
        sips: 0,
        shots: 0,
        shotguns: 0,
        lastDrinkTime: 0,
        lastShotTime: 0,
        lastShotgunTime: 0,
      }));
      session.markModified('players');
      await session.save();

      io.to(req.params.id).emit('game_reset', { session });
      res.json(session);
    } catch (error) {
      res.status(500).json({ error: 'Failed to reset game' });
    }
  });

  return router;
}
