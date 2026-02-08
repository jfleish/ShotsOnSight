import { Router, Request, Response } from 'express';
import { Game } from '../models/Game.js';

const router = Router();

// GET /api/games - List all games
router.get('/', async (_req: Request, res: Response) => {
  try {
    const games = await Game.find({}, { frames: 0 }).sort({ createdAt: -1 });
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch games' });
  }
});

// GET /api/games/:id - Get game with frames
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ error: 'Game not found' });
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch game' });
  }
});

export default router;
