import { useState, useCallback, useEffect, useRef } from 'react';
import { GameState, GameFrame, Player, DrinkAssignment, Team } from '@/types/game';
import * as api from '@/lib/api';
import { getSocket, joinSession, leaveSession } from '@/lib/socket';

const generateId = () => Math.random().toString(36).substring(2, 9);

const mapPlayer = (p: any): Player => ({
  id: p.playerId,
  name: p.name,
  team: p.team as Team,
  mode: p.mode,
  beerBrand: p.beerBrand || 'Bud Light',
  focusedOn: p.focusedOn || 'None',
  sips: p.sips || 0,
  shots: p.shots || 0,
  shotguns: p.shotguns || 0,
  lastDrinkTime: p.lastDrinkTime || 0,
  lastShotTime: p.lastShotTime || 0,
  lastShotgunTime: p.lastShotgunTime || 0,
});

export function useGameEngine() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [gameId, setGameId] = useState<string | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    isPlaying: false,
    isPaused: false,
    currentFrame: 0,
    elapsedTime: 0,
    frames: [],
    players: [],
    alerts: [],
    alertQueue: [],
    currentAlert: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [winProbDelta, setWinProbDelta] = useState(0);
  const socketSetup = useRef(false);

  // Initialize: fetch game from API, create session, connect socket
  useEffect(() => {
    const init = async () => {
      try {
        // 1. Get available games
        const games = await api.getGames();
        if (games.length === 0) {
          console.error('No games available in database');
          setIsLoading(false);
          return;
        }

        const game = games[0];
        setGameId(game._id);

        // 2. Fetch full game with frames
        const fullGame = await api.getGame(game._id);

        // 3. Create a session for this game
        const session = await api.createSession(game._id);
        setSessionId(session._id);

        // 4. Set initial state with frames from DB
        setGameState(prev => ({
          ...prev,
          frames: fullGame.frames,
        }));

        // 5. Join socket room
        joinSession(session._id);
      } catch (error) {
        console.error('Failed to initialize from backend:', error);
      } finally {
        setIsLoading(false);
      }
    };

    init();

    return () => {
      if (sessionId) leaveSession(sessionId);
    };
  }, []);

  // Socket event listeners
  useEffect(() => {
    if (!sessionId || socketSetup.current) return;
    socketSetup.current = true;

    const socket = getSocket();

    socket.on('frame_update', (data: any) => {
      setWinProbDelta(data.winProbDelta || 0);

      // Map server player state to client Player format
      const players: Player[] = (data.players || []).map(mapPlayer);

      let newAlert: DrinkAssignment | null = null;
      if (data.drinkAlert) {
        newAlert = {
          id: generateId(),
          playerId: data.drinkAlert.playerId,
          playerName: data.drinkAlert.playerName,
          type: data.drinkAlert.type,
          reason: data.drinkAlert.reason,
          timestamp: data.drinkAlert.timestamp,
        };
      }

      setGameState(prev => {
        if (newAlert) {
          const newQueue = [...prev.alertQueue, newAlert];
          return {
            ...prev,
            currentFrame: data.currentFrame,
            elapsedTime: data.elapsedTime,
            players,
            alerts: [...prev.alerts, newAlert],
            alertQueue: newQueue,
            currentAlert: prev.currentAlert || newAlert,
          };
        }
        return {
          ...prev,
          currentFrame: data.currentFrame,
          elapsedTime: data.elapsedTime,
          players,
        };
      });
    });

    socket.on('game_over', (data: any) => {
      const players: Player[] = (data.players || []).map(mapPlayer);

      setGameState(prev => ({
        ...prev,
        isPlaying: false,
        isPaused: false,
        players,
      }));
    });

    socket.on('game_started', () => {
      setGameState(prev => ({ ...prev, isPlaying: true, isPaused: false }));
    });

    socket.on('game_paused', () => {
      setGameState(prev => ({ ...prev, isPaused: true }));
    });

    socket.on('game_resumed', () => {
      setGameState(prev => ({ ...prev, isPaused: false }));
    });

    socket.on('game_reset', (data: any) => {
      const players: Player[] = (data.session?.players || []).map(mapPlayer);

      setGameState(prev => ({
        ...prev,
        isPlaying: false,
        isPaused: false,
        currentFrame: 0,
        elapsedTime: 0,
        alerts: [],
        alertQueue: [],
        currentAlert: null,
        players,
      }));
      setWinProbDelta(0);
    });

    socket.on('player_joined', (data: any) => {
      const players: Player[] = (data.session?.players || []).map(mapPlayer);
      setGameState(prev => ({ ...prev, players }));
    });

    socket.on('player_left', (data: any) => {
      const players: Player[] = (data.session?.players || []).map(mapPlayer);
      setGameState(prev => ({ ...prev, players }));
    });

    return () => {
      socket.off('frame_update');
      socket.off('game_over');
      socket.off('game_started');
      socket.off('game_paused');
      socket.off('game_resumed');
      socket.off('game_reset');
      socket.off('player_joined');
      socket.off('player_left');
    };
  }, [sessionId]);

  // Confirm current alert: call API, then shift queue
  const confirmCurrentAlert = useCallback(async () => {
    const alert = gameState.currentAlert;
    if (!alert || !sessionId) return;

    try {
      await api.confirmAlert(sessionId, alert.playerId, alert.id, alert.type || 'sip');
    } catch (error) {
      console.error('Failed to confirm alert:', error);
    }

    setGameState(prev => {
      const newQueue = prev.alertQueue.slice(1);
      return {
        ...prev,
        alertQueue: newQueue,
        currentAlert: newQueue.length > 0 ? newQueue[0] : null,
      };
    });
  }, [gameState.currentAlert, sessionId]);

  const currentFrameData = gameState.frames[gameState.currentFrame] || gameState.frames[0];

  // Add a player via API
  const addPlayer = useCallback(async (
    name: string,
    team: Team,
    mode: 'casual' | 'savage' | 'dd',
    beerBrand: string = 'Bud Light',
    focusedOn: string = 'None'
  ) => {
    if (!sessionId) return;
    try {
      const session = await api.addPlayer(sessionId, name, team, mode, beerBrand, focusedOn);
      const players: Player[] = session.players.map(mapPlayer);
      setGameState(prev => ({ ...prev, players }));
    } catch (error) {
      console.error('Failed to add player:', error);
    }
  }, [sessionId]);

  // Remove a player via API
  const removePlayer = useCallback(async (playerId: string) => {
    if (!sessionId) return;
    try {
      const session = await api.removePlayer(sessionId, playerId);
      const players: Player[] = session.players.map(mapPlayer);
      setGameState(prev => ({ ...prev, players }));
    } catch (error) {
      console.error('Failed to remove player:', error);
    }
  }, [sessionId]);

  // Start game via API (server runs the game loop)
  const startGame = useCallback(async () => {
    if (!sessionId || gameState.players.length === 0) return;
    try {
      await api.startSession(sessionId);
      setGameState(prev => ({ ...prev, isPlaying: true, isPaused: false }));
    } catch (error) {
      console.error('Failed to start game:', error);
    }
  }, [sessionId, gameState.players.length]);

  // Pause game via API
  const pauseGame = useCallback(async () => {
    if (!sessionId) return;
    try {
      await api.pauseSession(sessionId);
      setGameState(prev => ({ ...prev, isPaused: true }));
    } catch (error) {
      console.error('Failed to pause game:', error);
    }
  }, [sessionId]);

  // Resume game via API
  const resumeGame = useCallback(async () => {
    if (!sessionId) return;
    try {
      await api.resumeSession(sessionId);
      setGameState(prev => ({ ...prev, isPaused: false }));
    } catch (error) {
      console.error('Failed to resume game:', error);
    }
  }, [sessionId]);

  // Reset game via API
  const resetGame = useCallback(async () => {
    if (!sessionId) return;
    try {
      const session = await api.resetSession(sessionId);
      const players: Player[] = session.players.map(mapPlayer);
      setGameState(prev => ({
        ...prev,
        isPlaying: false,
        isPaused: false,
        currentFrame: 0,
        elapsedTime: 0,
        alerts: [],
        alertQueue: [],
        currentAlert: null,
        players,
      }));
      setWinProbDelta(0);
    } catch (error) {
      console.error('Failed to reset game:', error);
    }
  }, [sessionId]);

  // Skip frame - not supported server-side, no-op
  const skipFrame = useCallback(() => {
    // Server controls frame advancement
  }, []);

  return {
    sessionId,
    gameState,
    currentFrameData,
    winProbDelta,
    isLoading,
    addPlayer,
    removePlayer,
    startGame,
    pauseGame,
    resumeGame,
    resetGame,
    skipFrame,
    confirmCurrentAlert,
  };
}
