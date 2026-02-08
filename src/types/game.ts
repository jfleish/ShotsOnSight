// Game Types for SOS: Shot On Sight

export type Team = 'home' | 'away';
export type DrinkMode = 'casual' | 'savage' | 'dd';
export type DrinkType = 'sip' | 'shot' | 'shotgun' | null;
export type PlayEvent = 
  | 'touchdown' 
  | 'field_goal' 
  | 'turnover' 
  | 'turnover_on_downs' 
  | 'interception'
  | 'fumble'
  | 'missed_fg'
  | 'first_down'
  | 'big_play'
  | 'sack'
  | 'punt'
  | 'safety'
  | 'kickoff'
  | 'halftime'
  | 'quarter_end'
  | 'game_start'
  | 'game_end'
  | 'two_minute_warning'
  | null;

export interface GameFrame {
  t: number; // Demo timestamp in seconds
  quarter: number;
  clock: number; // Game clock in seconds
  home: number; // Home score
  away: number; // Away score
  down: number;
  distance: number;
  yardline: number;
  possession: Team;
  event: PlayEvent;
  win_prob: number; // 0-1, probability of home team winning
  description?: string;
}

export interface Player {
  id: string;
  name: string;
  team: Team;
  mode: DrinkMode;
  beerBrand: string;
  focusedOn: string;
  sips: number;
  shots: number;
  shotguns: number;
  lastDrinkTime: number; // For rate limiting
  lastShotTime: number;
  lastShotgunTime: number;
}

export interface DrinkAssignment {
  id: string;
  playerId: string;
  playerName: string;
  type: DrinkType;
  reason: string;
  timestamp: number;
}

export interface GameState {
  isPlaying: boolean;
  isPaused: boolean;
  currentFrame: number;
  elapsedTime: number;
  frames: GameFrame[];
  players: Player[];
  alerts: DrinkAssignment[];
  currentAlert: DrinkAssignment | null;
}

export interface DrinkRules {
  minShotInterval: number; // seconds
  minShotgunInterval: number; // seconds
  probabilityThresholds: {
    shot: number; // Delta threshold for shot
    sip: number; // Delta threshold for sip
  };
}

// Default drink rules
export const DEFAULT_DRINK_RULES: DrinkRules = {
  minShotInterval: 120, // 2 minutes
  minShotgunInterval: 300, // 5 minutes
  probabilityThresholds: {
    shot: 0.15,
    sip: 0.07,
  },
};

// Mode multipliers for drink frequency
export const MODE_MULTIPLIERS: Record<DrinkMode, number> = {
  casual: 0.5,
  savage: 1.5,
  dd: 0, // Designated driver - no drinks
};

// Event-based drink triggers
export const EVENT_DRINKS: Record<PlayEvent, DrinkType> = {
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
