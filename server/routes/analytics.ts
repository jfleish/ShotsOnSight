import { Router, Request, Response } from 'express';
import { DrinkEvent } from '../models/DrinkEvent.js';
import { GameSession } from '../models/GameSession.js';

const router = Router();

// GET /api/analytics/sessions/:id - Full drink stats for a session
router.get('/sessions/:id', async (req: Request, res: Response) => {
  try {
    const session = await GameSession.findById(req.params.id);
    if (!session) return res.status(404).json({ error: 'Session not found' });

    const events = await DrinkEvent.find({ sessionId: req.params.id }).sort({ timestamp: 1 });

    // Aggregate stats
    const totalDrinks = events.length;
    const byType = {
      sip: events.filter(e => e.drinkType === 'sip').length,
      shot: events.filter(e => e.drinkType === 'shot').length,
      shotgun: events.filter(e => e.drinkType === 'shotgun').length,
    };

    const byTeam = {
      home: events.filter(e => e.team === 'home').length,
      away: events.filter(e => e.team === 'away').length,
    };

    // Per-player breakdown
    const playerMap = new Map<string, { name: string; team: string; sips: number; shots: number; shotguns: number; total: number }>();
    for (const event of events) {
      const existing = playerMap.get(event.playerId) || {
        name: event.playerName,
        team: event.team,
        sips: 0,
        shots: 0,
        shotguns: 0,
        total: 0,
      };
      if (event.drinkType === 'sip') existing.sips++;
      if (event.drinkType === 'shot') existing.shots++;
      if (event.drinkType === 'shotgun') existing.shotguns++;
      existing.total++;
      playerMap.set(event.playerId, existing);
    }

    // Drink timeline (drinks per frame bucket)
    const timeline = events.map(e => ({
      frameIndex: e.frameIndex,
      timestamp: e.timestamp,
      drinkType: e.drinkType,
      playerName: e.playerName,
      reason: e.reason,
      winProbDelta: e.winProbDelta,
    }));

    // Game events that triggered drinks
    const triggerEvents = events
      .filter(e => e.gameEvent)
      .reduce((acc, e) => {
        const key = e.gameEvent!;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    res.json({
      sessionId: req.params.id,
      sessionStatus: session.status,
      totalDrinks,
      byType,
      byTeam,
      perPlayer: Object.fromEntries(playerMap),
      timeline,
      triggerEvents,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// GET /api/analytics/summary - Overall summary across all sessions
router.get('/summary', async (_req: Request, res: Response) => {
  try {
    const totalSessions = await GameSession.countDocuments();
    const completedSessions = await GameSession.countDocuments({ status: 'finished' });
    const totalDrinkEvents = await DrinkEvent.countDocuments();

    const typeAgg = await DrinkEvent.aggregate([
      { $group: { _id: '$drinkType', count: { $sum: 1 } } },
    ]);

    const teamAgg = await DrinkEvent.aggregate([
      { $group: { _id: '$team', count: { $sum: 1 } } },
    ]);

    res.json({
      totalSessions,
      completedSessions,
      totalDrinkEvents,
      byType: Object.fromEntries(typeAgg.map(t => [t._id, t.count])),
      byTeam: Object.fromEntries(teamAgg.map(t => [t._id, t.count])),
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch summary' });
  }
});

export default router;
