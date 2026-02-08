import { GameFrame } from '@/types/game';
import { fetchSuperBowl2025Data, TEAM_INFO } from './nflData';

// Fetch real Super Bowl 2025 data or use demo data as fallback
export async function getGameData(): Promise<GameFrame[]> {
  console.log('Using demo data - Super Bowl 2025 hasn\'t been played yet');
  return DEMO_GAME;
  
  /* Commented out for now - will work when Super Bowl 2025 data is available
  try {
    const realData = await fetchSuperBowl2025Data();
    if (realData.length > 0) {
      console.log('Using real Super Bowl 2025 data');
      return realData;
    }
  } catch (error) {
    console.error('Failed to fetch real data, using demo data:', error);
  }
  
  console.log('Using demo data');
  return DEMO_GAME;
  */
}

// Comeback Thriller Demo - Chiefs vs Eagles (Super Bowl LIX)
// 10 minutes = 600 seconds, ~40 frames, 15 seconds per frame
export const DEMO_GAME: GameFrame[] = [
  // Q1 - Eagles dominate early
  { t: 0, quarter: 1, clock: 900, home: 0, away: 0, down: 1, distance: 10, yardline: 25, possession: 'home', event: 'game_start', win_prob: 0.50, description: "Kickoff! Super Bowl LIX begins!" },
  { t: 15, quarter: 1, clock: 840, home: 0, away: 0, down: 1, distance: 10, yardline: 30, possession: 'home', event: 'first_down', win_prob: 0.52, description: "Chiefs move the chains" },
  { t: 30, quarter: 1, clock: 780, home: 0, away: 0, down: 2, distance: 6, yardline: 45, possession: 'home', event: 'big_play', win_prob: 0.55, description: "Mahomes to Worthy! 25 yards!" },
  { t: 45, quarter: 1, clock: 720, home: 0, away: 0, down: 1, distance: 10, yardline: 68, possession: 'home', event: null, win_prob: 0.56, description: "Chiefs in Eagles territory" },
  { t: 60, quarter: 1, clock: 660, home: 0, away: 0, down: 3, distance: 4, yardline: 72, possession: 'home', event: 'interception', win_prob: 0.35, description: "INTERCEPTED! Cooper DeJean has it!" },
  { t: 75, quarter: 1, clock: 600, home: 0, away: 0, down: 1, distance: 10, yardline: 28, possession: 'away', event: 'big_play', win_prob: 0.32, description: "Hurts finds AJ Brown! 35 yards!" },
  { t: 90, quarter: 1, clock: 540, home: 0, away: 7, down: 1, distance: 10, yardline: 0, possession: 'away', event: 'touchdown', win_prob: 0.28, description: "TOUCHDOWN EAGLES! Jalen Hurts to DeVonta Smith!" },
  { t: 105, quarter: 1, clock: 480, home: 0, away: 7, down: 1, distance: 10, yardline: 25, possession: 'home', event: null, win_prob: 0.30, description: "Chiefs need to respond" },
  { t: 120, quarter: 1, clock: 420, home: 0, away: 7, down: 3, distance: 8, yardline: 35, possession: 'home', event: 'sack', win_prob: 0.25, description: "Mahomes goes down! Brandon Graham with the sack!" },
  { t: 135, quarter: 1, clock: 360, home: 0, away: 7, down: 4, distance: 15, yardline: 28, possession: 'home', event: 'punt', win_prob: 0.24, description: "Chiefs forced to punt" },
  
  // Q2 - Eagles extend lead, Chiefs collapse
  { t: 150, quarter: 2, clock: 900, home: 0, away: 7, down: 1, distance: 10, yardline: 40, possession: 'away', event: 'quarter_end', win_prob: 0.24, description: "End of Q1 - Eagles lead 7-0" },
  { t: 165, quarter: 2, clock: 840, home: 0, away: 7, down: 1, distance: 10, yardline: 55, possession: 'away', event: 'first_down', win_prob: 0.22, description: "Eagles driving" },
  { t: 180, quarter: 2, clock: 780, home: 0, away: 14, down: 1, distance: 10, yardline: 0, possession: 'away', event: 'touchdown', win_prob: 0.15, description: "TOUCHDOWN! Saquon Barkley punches it in!" },
  { t: 195, quarter: 2, clock: 720, home: 0, away: 14, down: 2, distance: 8, yardline: 32, possession: 'home', event: 'fumble', win_prob: 0.10, description: "FUMBLE! Eagles recover!" },
  { t: 210, quarter: 2, clock: 660, home: 0, away: 17, down: 1, distance: 10, yardline: 0, possession: 'away', event: 'field_goal', win_prob: 0.08, description: "Field goal good! Eagles 17-0" },
  { t: 225, quarter: 2, clock: 600, home: 0, away: 17, down: 1, distance: 10, yardline: 25, possession: 'home', event: null, win_prob: 0.09, description: "Chiefs facing a mountain" },
  { t: 240, quarter: 2, clock: 540, home: 0, away: 17, down: 1, distance: 10, yardline: 45, possession: 'home', event: 'big_play', win_prob: 0.12, description: "Travis Kelce! 35-yard catch!" },
  { t: 255, quarter: 2, clock: 480, home: 7, away: 17, down: 1, distance: 10, yardline: 0, possession: 'home', event: 'touchdown', win_prob: 0.22, description: "TOUCHDOWN CHIEFS! Mahomes to Hopkins!" },
  { t: 270, quarter: 2, clock: 420, home: 7, away: 17, down: 1, distance: 10, yardline: 35, possession: 'away', event: null, win_prob: 0.20, description: "Eagles looking to extend" },
  { t: 285, quarter: 2, clock: 300, home: 7, away: 17, down: 1, distance: 10, yardline: 50, possession: 'away', event: 'two_minute_warning', win_prob: 0.19, description: "Two-minute warning!" },
  { t: 300, quarter: 2, clock: 0, home: 7, away: 17, down: 1, distance: 10, yardline: 25, possession: 'away', event: 'halftime', win_prob: 0.18, description: "HALFTIME - Eagles lead 17-7" },
  
  // Q3 - Chiefs rally begins
  { t: 315, quarter: 3, clock: 900, home: 7, away: 17, down: 1, distance: 10, yardline: 25, possession: 'home', event: null, win_prob: 0.20, description: "Second half underway!" },
  { t: 330, quarter: 3, clock: 840, home: 7, away: 17, down: 1, distance: 10, yardline: 50, possession: 'home', event: 'big_play', win_prob: 0.25, description: "Worthy! 25 yards!" },
  { t: 345, quarter: 3, clock: 780, home: 14, away: 17, down: 1, distance: 10, yardline: 0, possession: 'home', event: 'touchdown', win_prob: 0.38, description: "TOUCHDOWN! Chiefs within 3!" },
  { t: 360, quarter: 3, clock: 720, home: 14, away: 17, down: 2, distance: 7, yardline: 33, possession: 'away', event: 'sack', win_prob: 0.42, description: "Chris Jones sacks Hurts!" },
  { t: 375, quarter: 3, clock: 660, home: 14, away: 17, down: 4, distance: 12, yardline: 28, possession: 'away', event: 'turnover_on_downs', win_prob: 0.48, description: "TURNOVER ON DOWNS! Chiefs ball!" },
  { t: 390, quarter: 3, clock: 600, home: 14, away: 17, down: 1, distance: 10, yardline: 72, possession: 'home', event: 'first_down', win_prob: 0.50, description: "Chiefs in business" },
  { t: 405, quarter: 3, clock: 540, home: 17, away: 17, down: 1, distance: 10, yardline: 0, possession: 'home', event: 'field_goal', win_prob: 0.52, description: "FIELD GOAL! IT'S TIED!" },
  { t: 420, quarter: 3, clock: 480, home: 17, away: 17, down: 3, distance: 6, yardline: 42, possession: 'away', event: 'interception', win_prob: 0.62, description: "PICKED OFF! Trent McDuffie has it!" },
  { t: 435, quarter: 3, clock: 420, home: 24, away: 17, down: 1, distance: 10, yardline: 0, possession: 'home', event: 'touchdown', win_prob: 0.72, description: "TOUCHDOWN! CHIEFS LEAD!" },
  
  // Q4 - The dramatic finish
  { t: 450, quarter: 4, clock: 900, home: 24, away: 17, down: 1, distance: 10, yardline: 25, possession: 'away', event: 'quarter_end', win_prob: 0.70, description: "Fourth quarter - Chiefs lead 24-17" },
  { t: 465, quarter: 4, clock: 840, home: 24, away: 17, down: 1, distance: 10, yardline: 45, possession: 'away', event: 'big_play', win_prob: 0.62, description: "AJ Brown finds space! 20 yards!" },
  { t: 480, quarter: 4, clock: 780, home: 24, away: 24, down: 1, distance: 10, yardline: 0, possession: 'away', event: 'touchdown', win_prob: 0.45, description: "TOUCHDOWN EAGLES! They tie it up!" },
  { t: 495, quarter: 4, clock: 720, home: 24, away: 24, down: 1, distance: 10, yardline: 25, possession: 'home', event: null, win_prob: 0.42, description: "Chiefs need to answer" },
  { t: 510, quarter: 4, clock: 660, home: 24, away: 24, down: 3, distance: 12, yardline: 38, possession: 'home', event: 'big_play', win_prob: 0.48, description: "Mahomes scrambles! First down!" },
  { t: 525, quarter: 4, clock: 540, home: 27, away: 24, down: 1, distance: 10, yardline: 0, possession: 'home', event: 'field_goal', win_prob: 0.52, description: "FIELD GOAL! CHIEFS LEAD 27-24!" },
  { t: 540, quarter: 4, clock: 420, home: 27, away: 24, down: 2, distance: 5, yardline: 55, possession: 'away', event: 'fumble', win_prob: 0.65, description: "FUMBLE! Chiefs force it, THEY RECOVER!" },
  { t: 555, quarter: 4, clock: 300, home: 27, away: 24, down: 1, distance: 10, yardline: 42, possession: 'home', event: 'two_minute_warning', win_prob: 0.68, description: "Two-minute warning! Chiefs in control!" },
  { t: 570, quarter: 4, clock: 180, home: 27, away: 24, down: 1, distance: 10, yardline: 22, possession: 'home', event: 'first_down', win_prob: 0.75, description: "Chiefs in field goal range!" },
  { t: 585, quarter: 4, clock: 60, home: 27, away: 24, down: 1, distance: 10, yardline: 15, possession: 'home', event: null, win_prob: 0.82, description: "Clock running down..." },
  { t: 600, quarter: 4, clock: 0, home: 30, away: 24, down: 1, distance: 10, yardline: 0, possession: 'home', event: 'game_end', win_prob: 1.00, description: "FIELD GOAL! CHIEFS WIN SUPER BOWL LIX!" },
];

// Team info with ESPN logo URLs - Updated for Super Bowl 2025
export const TEAMS = {
  home: {
    name: 'Chiefs',
    city: 'Kansas City',
    abbreviation: 'KC',
    color: 'team-home',
    logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/kc.png',
  },
  away: {
    name: 'Eagles',
    city: 'Philadelphia',
    abbreviation: 'PHI',
    color: 'team-away',
    logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/phi.png',
  },
} as const;

// ESPN Player ID for headshot URLs: https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/{id}.png
export const getPlayerHeadshotUrl = (espnId?: string) => 
  espnId ? `https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/${espnId}.png&w=96&h=70&cb=1` : null;

// Super Bowl LIX Rosters - Chiefs (home) vs Eagles (away)
export const FULL_ROSTERS = {
  home: [
    { name: 'Patrick Mahomes', position: 'QB', number: '15', espnId: '3139477' },
    { name: 'Travis Kelce', position: 'TE', number: '87', espnId: '15847' },
    { name: 'Xavier Worthy', position: 'WR', number: '1', espnId: '4686413' },
    { name: 'DeAndre Hopkins', position: 'WR', number: '10', espnId: '15795' },
    { name: 'Rashee Rice', position: 'WR', number: '4', espnId: '4426406' },
    { name: 'Isiah Pacheco', position: 'RB', number: '10', espnId: '4430658' },
    { name: 'Kareem Hunt', position: 'RB', number: '27', espnId: '3033218' },
    { name: 'Chris Jones', position: 'DT', number: '95', espnId: '3116406' },
    { name: 'Trent McDuffie', position: 'CB', number: '22', espnId: '4362087' },
    { name: 'Nick Bolton', position: 'LB', number: '32', espnId: '4361409' },
    { name: 'George Karlaftis', position: 'DE', number: '56', espnId: '4361418' },
    { name: 'Harrison Butker', position: 'K', number: '7', espnId: '3055268' },
  ],
  away: [
    { name: 'Jalen Hurts', position: 'QB', number: '1', espnId: '4040715' },
    { name: 'Saquon Barkley', position: 'RB', number: '26', espnId: '3929630' },
    { name: 'AJ Brown', position: 'WR', number: '11', espnId: '4047646' },
    { name: 'DeVonta Smith', position: 'WR', number: '6', espnId: '4241479' },
    { name: 'Dallas Goedert', position: 'TE', number: '88', espnId: '3043216' },
    { name: 'Cooper DeJean', position: 'CB', number: '33', espnId: '4697810' },
    { name: 'Jalen Carter', position: 'DT', number: '98', espnId: '4426354' },
    { name: 'Haason Reddick', position: 'LB', number: '7', espnId: '3115364' },
    { name: 'Darius Slay', position: 'CB', number: '2', espnId: '2976545' },
    { name: 'Landon Dickerson', position: 'G', number: '69', espnId: '3915184' },
    { name: 'Jake Elliott', position: 'K', number: '4', espnId: '3050481' },
    { name: 'Brandon Graham', position: 'DE', number: '55', espnId: '13230' },
  ],
};

export const FRAME_INTERVAL = 15; // seconds between frames
export const TOTAL_DURATION = 600; // 10 minutes in seconds
