import { Server as SocketServer } from 'socket.io';
import { GameSession, IPlayerState } from '../models/GameSession.js';
import { Game, IGameFrame } from '../models/Game.js';
import { DrinkEvent } from '../models/DrinkEvent.js';

type DrinkType = 'sip' | 'shot' | 'shotgun' | null;
type Team = 'home' | 'away';

const EVENT_DRINKS: Record<string, DrinkType> = {
  touchdown: 'shot',
  field_goal: 'sip',
  turnover: 'shot',
  turnover_on_downs: 'shot',
  interception: 'shot',
  fumble: 'shot',
  missed_fg: 'shot',
  first_down: 'sip',
  big_play: 'sip',
  sack: 'sip',
  punt: null,
  safety: 'shot',
  kickoff: null,
  halftime: null,
  quarter_end: null,
  game_start: null,
  game_end: 'shotgun',
  two_minute_warning: 'sip',
};

const DRINK_RULES = {
  minShotInterval: 120,
  minShotgunInterval: 300,
  probabilityThresholds: { shot: 0.15, sip: 0.07 },
};

const MODE_MULTIPLIERS: Record<string, number> = {
  casual: 0.5,
  savage: 1.5,
  dd: 0,
};

// Active game loops keyed by session ID
const activeLoops = new Map<string, NodeJS.Timeout>();
const lastDrinkTimes = new Map<string, Record<string, number>>();

function determineDrink(delta: number, event: string | null): { type: DrinkType; reason: string } {
  if (event && EVENT_DRINKS[event] !== undefined) {
    const eventDrink = EVENT_DRINKS[event];
    if (eventDrink) {
      return { type: eventDrink, reason: event.replace(/_/g, ' ').toUpperCase() };
    }
  }

  const absDelta = Math.abs(delta);
  if (absDelta > DRINK_RULES.probabilityThresholds.shot) {
    return { type: 'shot', reason: `${delta > 0 ? '+' : ''}${(delta * 100).toFixed(0)}% swing!` };
  }
  if (absDelta > DRINK_RULES.probabilityThresholds.sip) {
    return { type: 'sip', reason: 'Momentum shift' };
  }

  return { type: null, reason: '' };
}

function selectTarget(players: IPlayerState[], losingTeam: Team): IPlayerState | null {
  const eligible = players.filter(p => p.mode !== 'dd');
  if (eligible.length === 0) return null;

  const losers = eligible.filter(p => p.team === losingTeam);
  const winners = eligible.filter(p => p.team !== losingTeam);

  if (losers.length > 0 && Math.random() > 0.3) {
    return losers[Math.floor(Math.random() * losers.length)];
  }
  if (winners.length > 0) {
    return winners[Math.floor(Math.random() * winners.length)];
  }
  return eligible[Math.floor(Math.random() * eligible.length)];
}

async function processFrame(sessionId: string, io: SocketServer): Promise<void> {
  const session = await GameSession.findById(sessionId);
  if (!session || session.status !== 'playing') {
    stopLoop(sessionId);
    return;
  }

  const game = await Game.findById(session.gameId);
  if (!game) {
    stopLoop(sessionId);
    return;
  }

  const nextFrameIdx = session.currentFrame + 1;
  if (nextFrameIdx >= game.frames.length) {
    // Game over
    session.status = 'finished';
    session.finishedAt = new Date();
    session.currentFrame = game.frames.length - 1;
    await session.save();
    stopLoop(sessionId);

    io.to(sessionId).emit('game_over', {
      sessionId,
      finalFrame: game.frames[game.frames.length - 1],
      players: session.players,
    });
    return;
  }

  const currentData = game.frames[nextFrameIdx];
  const prevData = game.frames[session.currentFrame];
  const delta = currentData.win_prob - prevData.win_prob;

  // Determine drink
  const { type: drinkType, reason } = determineDrink(delta, currentData.event);

  let drinkAlert: any = null;

  if (drinkType && session.players.length > 0) {
    const losingTeam: Team = currentData.win_prob > 0.5 ? 'away' : 'home';
    const sessionDrinkTimes = lastDrinkTimes.get(sessionId) || {};

    let finalDrinkType = drinkType;
    if (drinkType === 'shot') {
      const timeSince = currentData.t - (sessionDrinkTimes['shot'] || 0);
      if (timeSince < DRINK_RULES.minShotInterval) finalDrinkType = 'sip';
    }
    if (drinkType === 'shotgun') {
      const timeSince = currentData.t - (sessionDrinkTimes['shotgun'] || 0);
      if (timeSince < DRINK_RULES.minShotgunInterval) finalDrinkType = 'shot';
    }

    const target = selectTarget(session.players, losingTeam);

    if (target) {
      const shouldSkip = target.mode === 'casual' && Math.random() > MODE_MULTIPLIERS.casual * 2;

      if (!shouldSkip) {
        // Update player drink counts in session
        const playerIdx = session.players.findIndex(p => p.playerId === target.playerId);
        if (playerIdx !== -1) {
          if (finalDrinkType === 'sip') session.players[playerIdx].sips += 1;
          if (finalDrinkType === 'shot') session.players[playerIdx].shots += 1;
          if (finalDrinkType === 'shotgun') session.players[playerIdx].shotguns += 1;
          session.players[playerIdx].lastDrinkTime = currentData.t;
          if (finalDrinkType === 'shot') session.players[playerIdx].lastShotTime = currentData.t;
          if (finalDrinkType === 'shotgun') session.players[playerIdx].lastShotgunTime = currentData.t;
        }

        if (finalDrinkType === 'shot' || finalDrinkType === 'shotgun') {
          sessionDrinkTimes[finalDrinkType] = currentData.t;
          lastDrinkTimes.set(sessionId, sessionDrinkTimes);
        }

        drinkAlert = {
          playerId: target.playerId,
          playerName: target.name,
          type: finalDrinkType,
          reason,
          timestamp: currentData.t,
        };

        // Persist drink event
        await DrinkEvent.create({
          sessionId: session._id,
          playerId: target.playerId,
          playerName: target.name,
          team: target.team,
          drinkType: finalDrinkType,
          reason,
          gameEvent: currentData.event,
          frameIndex: nextFrameIdx,
          winProbDelta: delta,
          timestamp: currentData.t,
        });
      }
    }
  }

  // Update session state
  session.currentFrame = nextFrameIdx;
  session.elapsedTime = currentData.t;
  session.markModified('players');
  await session.save();

  // Emit frame update to all clients in session
  io.to(sessionId).emit('frame_update', {
    sessionId,
    currentFrame: nextFrameIdx,
    frameData: currentData,
    prevFrameData: prevData,
    winProbDelta: delta,
    players: session.players,
    drinkAlert,
    elapsedTime: currentData.t,
  });

  if (drinkAlert) {
    io.to(sessionId).emit('drink_alert', drinkAlert);
  }
}

export function startLoop(sessionId: string, frameInterval: number, io: SocketServer): void {
  stopLoop(sessionId); // Clear any existing loop
  lastDrinkTimes.set(sessionId, {});

  const interval = setInterval(() => {
    processFrame(sessionId, io).catch(err => {
      console.error(`Error processing frame for session ${sessionId}:`, err);
    });
  }, frameInterval * 1000);

  activeLoops.set(sessionId, interval);
}

export function stopLoop(sessionId: string): void {
  const interval = activeLoops.get(sessionId);
  if (interval) {
    clearInterval(interval);
    activeLoops.delete(sessionId);
  }
}

export function isLoopActive(sessionId: string): boolean {
  return activeLoops.has(sessionId);
}
