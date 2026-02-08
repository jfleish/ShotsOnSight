import { useState, useCallback, useEffect, useRef } from 'react';
import { GameState, Player, DrinkAssignment, DrinkType, Team, DEFAULT_DRINK_RULES, EVENT_DRINKS, MODE_MULTIPLIERS } from '@/types/game';
import { getGameData, FRAME_INTERVAL } from '@/data/demoGame';

const generateId = () => Math.random().toString(36).substring(2, 9);

export function useGameEngine() {
  const [gameState, setGameState] = useState<GameState>({
    isPlaying: false,
    isPaused: false,
    currentFrame: 0,
    elapsedTime: 0,
    frames: [], // Will be loaded asynchronously
    players: [],
    alerts: [],
    currentAlert: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load game data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const frames = await getGameData();
        setGameState(prev => ({ ...prev, frames }));
      } catch (error) {
        console.error('Failed to load game data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastDrinkTimeRef = useRef<Record<string, number>>({});

  const currentFrameData = gameState.frames[gameState.currentFrame] || gameState.frames[0];
  const prevFrameData = gameState.currentFrame > 0 ? gameState.frames[gameState.currentFrame - 1] : null;

  // Calculate win probability delta
  const winProbDelta = prevFrameData 
    ? currentFrameData.win_prob - prevFrameData.win_prob 
    : 0;

  // Add a player
  const addPlayer = useCallback((name: string, team: Team, mode: 'casual' | 'savage' | 'dd') => {
    const player: Player = {
      id: generateId(),
      name,
      team,
      mode,
      sips: 0,
      shots: 0,
      shotguns: 0,
      lastDrinkTime: 0,
      lastShotTime: 0,
      lastShotgunTime: 0,
    };
    setGameState(prev => ({
      ...prev,
      players: [...prev.players, player],
    }));
  }, []);

  // Remove a player
  const removePlayer = useCallback((playerId: string) => {
    setGameState(prev => ({
      ...prev,
      players: prev.players.filter(p => p.id !== playerId),
    }));
  }, []);

  // Determine drink assignment based on rules
  const determineDrink = useCallback((delta: number, event: string | null, currentTime: number): { type: DrinkType; reason: string } => {
    // Check event-based triggers first
    if (event && EVENT_DRINKS[event as keyof typeof EVENT_DRINKS]) {
      const eventDrink = EVENT_DRINKS[event as keyof typeof EVENT_DRINKS];
      if (eventDrink) {
        return { type: eventDrink, reason: event.replace(/_/g, ' ').toUpperCase() };
      }
    }

    // Check probability delta
    const absDelta = Math.abs(delta);
    if (absDelta > DEFAULT_DRINK_RULES.probabilityThresholds.shot) {
      return { type: 'shot', reason: `${delta > 0 ? '+' : ''}${(delta * 100).toFixed(0)}% swing!` };
    }
    if (absDelta > DEFAULT_DRINK_RULES.probabilityThresholds.sip) {
      return { type: 'sip', reason: 'Momentum shift' };
    }

    return { type: null, reason: '' };
  }, []);

  // Select target players for drink
  const selectTargets = useCallback((players: Player[], losingTeam: Team, drinkType: DrinkType): Player[] => {
    // DD mode players never drink
    const eligiblePlayers = players.filter(p => p.mode !== 'dd');
    if (eligiblePlayers.length === 0) return [];

    // Target fans of the losing team primarily
    const losers = eligiblePlayers.filter(p => p.team === losingTeam);
    const winners = eligiblePlayers.filter(p => p.team !== losingTeam);

    // Random selection with bias toward losing team
    if (losers.length > 0 && Math.random() > 0.3) {
      return [losers[Math.floor(Math.random() * losers.length)]];
    }
    if (winners.length > 0) {
      return [winners[Math.floor(Math.random() * winners.length)]];
    }
    return eligiblePlayers.length > 0 ? [eligiblePlayers[Math.floor(Math.random() * eligiblePlayers.length)]] : [];
  }, []);

  // Process frame and assign drinks
  const processFrame = useCallback(() => {
    setGameState(prev => {
      if (prev.currentFrame >= prev.frames.length - 1) {
        // Game ended
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        return { ...prev, isPlaying: false, isPaused: false };
      }

      const nextFrame = prev.currentFrame + 1;
      const currentData = prev.frames[nextFrame];
      const prevData = prev.frames[prev.currentFrame];
      const delta = currentData.win_prob - prevData.win_prob;
      const currentTime = currentData.t;

      // Determine drink
      const { type: drinkType, reason } = determineDrink(delta, currentData.event, currentTime);

      // If there's a drink to assign
      let newAlert: DrinkAssignment | null = null;
      let updatedPlayers = prev.players;

      if (drinkType && prev.players.length > 0) {
        // Determine losing team (team with lower win prob gets targeted)
        const losingTeam: Team = currentData.win_prob > 0.5 ? 'away' : 'home';
        
        // Check rate limiting
        const lastDrink = lastDrinkTimeRef.current;
        let finalDrinkType = drinkType;

        if (drinkType === 'shot') {
          const timeSinceLastShot = currentTime - (lastDrink['shot'] || 0);
          if (timeSinceLastShot < DEFAULT_DRINK_RULES.minShotInterval) {
            finalDrinkType = 'sip'; // Downgrade
          }
        }
        if (drinkType === 'shotgun') {
          const timeSinceLastShotgun = currentTime - (lastDrink['shotgun'] || 0);
          if (timeSinceLastShotgun < DEFAULT_DRINK_RULES.minShotgunInterval) {
            finalDrinkType = 'shot'; // Downgrade
          }
        }

        // Select target
        const targets = selectTargets(prev.players, losingTeam, finalDrinkType);
        
        if (targets.length > 0) {
          const target = targets[0];
          
          // Apply mode multiplier - casual has 50% chance to skip
          if (target.mode === 'casual' && Math.random() > MODE_MULTIPLIERS.casual * 2) {
            // Skip drink for casual mode
          } else {
            newAlert = {
              id: generateId(),
              playerId: target.id,
              playerName: target.name,
              type: finalDrinkType,
              reason,
              timestamp: currentTime,
            };

            // Update player drink counts
            updatedPlayers = prev.players.map(p => {
              if (p.id === target.id) {
                return {
                  ...p,
                  sips: p.sips + (finalDrinkType === 'sip' ? 1 : 0),
                  shots: p.shots + (finalDrinkType === 'shot' ? 1 : 0),
                  shotguns: p.shotguns + (finalDrinkType === 'shotgun' ? 1 : 0),
                  lastDrinkTime: currentTime,
                  lastShotTime: finalDrinkType === 'shot' ? currentTime : p.lastShotTime,
                  lastShotgunTime: finalDrinkType === 'shotgun' ? currentTime : p.lastShotgunTime,
                };
              }
              return p;
            });

            // Update rate limiting tracker
            if (finalDrinkType === 'shot' || finalDrinkType === 'shotgun') {
              lastDrinkTimeRef.current[finalDrinkType] = currentTime;
            }
          }
        }
      }

      return {
        ...prev,
        currentFrame: nextFrame,
        elapsedTime: currentData.t,
        players: updatedPlayers,
        alerts: newAlert ? [...prev.alerts, newAlert] : prev.alerts,
        currentAlert: newAlert,
      };
    });
  }, [determineDrink, selectTargets]);

  // Clear current alert after delay
  useEffect(() => {
    if (gameState.currentAlert) {
      const timer = setTimeout(() => {
        setGameState(prev => ({ ...prev, currentAlert: null }));
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [gameState.currentAlert]);

  // Start game
  const startGame = useCallback(() => {
    if (gameState.players.length === 0) return;
    
    setGameState(prev => ({
      ...prev,
      isPlaying: true,
      isPaused: false,
    }));

    intervalRef.current = setInterval(processFrame, FRAME_INTERVAL * 1000);
  }, [gameState.players.length, processFrame]);

  // Pause game
  const pauseGame = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setGameState(prev => ({ ...prev, isPaused: true }));
  }, []);

  // Resume game
  const resumeGame = useCallback(() => {
    setGameState(prev => ({ ...prev, isPaused: false }));
    intervalRef.current = setInterval(processFrame, FRAME_INTERVAL * 1000);
  }, [processFrame]);

  // Reset game
  const resetGame = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    lastDrinkTimeRef.current = {};
    setGameState(prev => ({
      ...prev,
      isPlaying: false,
      isPaused: false,
      currentFrame: 0,
      elapsedTime: 0,
      alerts: [],
      currentAlert: null,
      players: prev.players.map(p => ({
        ...p,
        sips: 0,
        shots: 0,
        shotguns: 0,
        lastDrinkTime: 0,
        lastShotTime: 0,
        lastShotgunTime: 0,
      })),
    }));
  }, []);

  // Skip to next frame
  const skipFrame = useCallback(() => {
    processFrame();
  }, [processFrame]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
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
  };
}
