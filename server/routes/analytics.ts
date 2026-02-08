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

// GET /api/analytics/dashboard - Live dashboard data for B2B portal
router.get('/dashboard', async (_req: Request, res: Response) => {
  try {
    // Get all active/recent sessions
    const sessions = await GameSession.find({
      status: { $in: ['playing', 'paused', 'waiting'] },
    });
    const allSessions = await GameSession.find();

    // Count total participants across all sessions
    let totalParticipants = 0;
    const brandCounts: Record<string, number> = {};
    const allPlayers: Array<{ name: string; team: string; beerBrand: string; sips: number; shots: number; shotguns: number }> = [];

    for (const session of allSessions) {
      totalParticipants += session.players.length;
      for (const p of session.players) {
        const brand = (p as any).beerBrand || 'Bud Light';
        brandCounts[brand] = (brandCounts[brand] || 0) + 1;
        allPlayers.push({
          name: p.name,
          team: p.team,
          beerBrand: brand,
          sips: p.sips,
          shots: p.shots,
          shotguns: p.shotguns,
        });
      }
    }

    // Total drinks across all sessions
    const totalDrinkEvents = await DrinkEvent.countDocuments();
    const totalSips = allPlayers.reduce((sum, p) => sum + p.sips, 0);
    const totalShots = allPlayers.reduce((sum, p) => sum + p.shots, 0);
    const totalShotguns = allPlayers.reduce((sum, p) => sum + p.shotguns, 0);
    const totalDrinks = totalSips + totalShots + totalShotguns;

    // Brand share as percentages
    const brandColors: Record<string, string> = {
      'Bud Light': '#004A99',
      'Coors Light': '#FFB81C',
      'Miller Lite': '#003087',
      'Corona': '#FFC72C',
      'Modelo': '#C8102E',
    };
    const brandShareData = Object.entries(brandCounts).map(([name, value]) => ({
      name,
      value,
      color: brandColors[name] || '#64748b',
    }));
    if (brandShareData.length === 0) {
      brandShareData.push({ name: 'No Data', value: 1, color: '#64748b' });
    }

    // Recent drink events for live feed
    const recentEvents = await DrinkEvent.find()
      .sort({ createdAt: -1 })
      .limit(10);
    const recentActivity = recentEvents.map(e => ({
      time: new Date(e.timestamp * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
      event: `${e.playerName}: ${e.drinkType?.toUpperCase()} - ${e.reason}`,
      impact: e.drinkType === 'shotgun' ? '+3 Units' : e.drinkType === 'shot' ? '+2 Units' : '+1 Unit',
    }));

    // ROI estimate ($0.50 per sip, $1.50 per shot, $3.00 per shotgun engagement value)
    const roiEstimate = totalSips * 0.5 + totalShots * 1.5 + totalShotguns * 3.0;

    res.json({
      totalParticipants,
      totalDrinks,
      totalSips,
      totalShots,
      totalShotguns,
      totalDrinkEvents,
      roiEstimate,
      brandShareData,
      recentActivity,
      activeSessions: sessions.length,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

export default router;
