import { GameFrame } from '@/types/game';

// Comeback Thriller Demo - Seahawks vs Patriots (Super Bowl LX)
// 10 minutes = 600 seconds, ~40 frames, 15 seconds per frame
export const DEMO_GAME: GameFrame[] = [
  // Q1 - Patriots dominate early
  { t: 0, quarter: 1, clock: 900, home: 0, away: 0, down: 1, distance: 10, yardline: 25, possession: 'home', event: 'game_start', win_prob: 0.50, description: "Kickoff! Super Bowl LX begins!" },
  { t: 15, quarter: 1, clock: 840, home: 0, away: 0, down: 1, distance: 10, yardline: 30, possession: 'home', event: 'first_down', win_prob: 0.52, description: "Seahawks move the chains" },
  { t: 30, quarter: 1, clock: 780, home: 0, away: 0, down: 2, distance: 6, yardline: 45, possession: 'home', event: 'big_play', win_prob: 0.55, description: "Kenneth Walker III breaks loose!" },
  { t: 45, quarter: 1, clock: 720, home: 0, away: 0, down: 1, distance: 10, yardline: 68, possession: 'home', event: null, win_prob: 0.56, description: "Seahawks in Patriots territory" },
  { t: 60, quarter: 1, clock: 660, home: 0, away: 0, down: 3, distance: 4, yardline: 72, possession: 'home', event: 'interception', win_prob: 0.35, description: "INTERCEPTED! Christian Gonzalez has it!" },
  { t: 75, quarter: 1, clock: 600, home: 0, away: 0, down: 1, distance: 10, yardline: 28, possession: 'away', event: 'big_play', win_prob: 0.32, description: "Hunter Henry breaks free for 25 yards!" },
  { t: 90, quarter: 1, clock: 540, home: 0, away: 7, down: 1, distance: 10, yardline: 0, possession: 'away', event: 'touchdown', win_prob: 0.28, description: "TOUCHDOWN PATRIOTS! Drake Maye to Stefon Diggs!" },
  { t: 105, quarter: 1, clock: 480, home: 0, away: 7, down: 1, distance: 10, yardline: 25, possession: 'home', event: null, win_prob: 0.30, description: "Seahawks need to respond" },
  { t: 120, quarter: 1, clock: 420, home: 0, away: 7, down: 3, distance: 8, yardline: 35, possession: 'home', event: 'sack', win_prob: 0.25, description: "Darnold goes down! Harold Landry III with the sack!" },
  { t: 135, quarter: 1, clock: 360, home: 0, away: 7, down: 4, distance: 15, yardline: 28, possession: 'home', event: 'punt', win_prob: 0.24, description: "Seahawks forced to punt" },
  
  // Q2 - Patriots extend lead, Seahawks collapse
  { t: 150, quarter: 2, clock: 900, home: 0, away: 7, down: 1, distance: 10, yardline: 40, possession: 'away', event: 'quarter_end', win_prob: 0.24, description: "End of Q1 - Patriots lead 7-0" },
  { t: 165, quarter: 2, clock: 840, home: 0, away: 7, down: 1, distance: 10, yardline: 55, possession: 'away', event: 'first_down', win_prob: 0.22, description: "Patriots driving" },
  { t: 180, quarter: 2, clock: 780, home: 0, away: 14, down: 1, distance: 10, yardline: 0, possession: 'away', event: 'touchdown', win_prob: 0.15, description: "TOUCHDOWN! Rhamondre Stevenson punches it in!" },
  { t: 195, quarter: 2, clock: 720, home: 0, away: 14, down: 2, distance: 8, yardline: 32, possession: 'home', event: 'fumble', win_prob: 0.10, description: "FUMBLE! Patriots recover!" },
  { t: 210, quarter: 2, clock: 660, home: 0, away: 17, down: 1, distance: 10, yardline: 0, possession: 'away', event: 'field_goal', win_prob: 0.08, description: "Field goal good! Patriots 17-0" },
  { t: 225, quarter: 2, clock: 600, home: 0, away: 17, down: 1, distance: 10, yardline: 25, possession: 'home', event: null, win_prob: 0.09, description: "Seahawks facing a mountain" },
  { t: 240, quarter: 2, clock: 540, home: 0, away: 17, down: 1, distance: 10, yardline: 45, possession: 'home', event: 'big_play', win_prob: 0.12, description: "Jaxon Smith-Njigba! 35-yard catch!" },
  { t: 255, quarter: 2, clock: 480, home: 7, away: 17, down: 1, distance: 10, yardline: 0, possession: 'home', event: 'touchdown', win_prob: 0.22, description: "TOUCHDOWN SEAHAWKS! Darnold to Cooper Kupp!" },
  { t: 270, quarter: 2, clock: 420, home: 7, away: 17, down: 1, distance: 10, yardline: 35, possession: 'away', event: null, win_prob: 0.20, description: "Patriots looking to extend" },
  { t: 285, quarter: 2, clock: 300, home: 7, away: 17, down: 1, distance: 10, yardline: 50, possession: 'away', event: 'two_minute_warning', win_prob: 0.19, description: "Two-minute warning!" },
  { t: 300, quarter: 2, clock: 0, home: 7, away: 17, down: 1, distance: 10, yardline: 25, possession: 'away', event: 'halftime', win_prob: 0.18, description: "HALFTIME - Patriots lead 17-7" },
  
  // Q3 - Seahawks rally begins
  { t: 315, quarter: 3, clock: 900, home: 7, away: 17, down: 1, distance: 10, yardline: 25, possession: 'home', event: null, win_prob: 0.20, description: "Second half underway!" },
  { t: 330, quarter: 3, clock: 840, home: 7, away: 17, down: 1, distance: 10, yardline: 50, possession: 'home', event: 'big_play', win_prob: 0.25, description: "Rashid Shaheed! 25 yards!" },
  { t: 345, quarter: 3, clock: 780, home: 14, away: 17, down: 1, distance: 10, yardline: 0, possession: 'home', event: 'touchdown', win_prob: 0.38, description: "TOUCHDOWN! Seahawks within 3!" },
  { t: 360, quarter: 3, clock: 720, home: 14, away: 17, down: 2, distance: 7, yardline: 33, possession: 'away', event: 'sack', win_prob: 0.42, description: "Boye Mafe sacks Maye!" },
  { t: 375, quarter: 3, clock: 660, home: 14, away: 17, down: 4, distance: 12, yardline: 28, possession: 'away', event: 'turnover_on_downs', win_prob: 0.48, description: "TURNOVER ON DOWNS! Seahawks ball!" },
  { t: 390, quarter: 3, clock: 600, home: 14, away: 17, down: 1, distance: 10, yardline: 72, possession: 'home', event: 'first_down', win_prob: 0.50, description: "Seahawks in business" },
  { t: 405, quarter: 3, clock: 540, home: 17, away: 17, down: 1, distance: 10, yardline: 0, possession: 'home', event: 'field_goal', win_prob: 0.52, description: "FIELD GOAL! IT'S TIED!" },
  { t: 420, quarter: 3, clock: 480, home: 17, away: 17, down: 3, distance: 6, yardline: 42, possession: 'away', event: 'interception', win_prob: 0.62, description: "PICKED OFF! Devon Witherspoon has it!" },
  { t: 435, quarter: 3, clock: 420, home: 21, away: 17, down: 1, distance: 10, yardline: 0, possession: 'home', event: 'touchdown', win_prob: 0.72, description: "TOUCHDOWN! SEAHAWKS LEAD!" },
  
  // Q4 - The dramatic finish
  { t: 450, quarter: 4, clock: 900, home: 21, away: 17, down: 1, distance: 10, yardline: 25, possession: 'away', event: 'quarter_end', win_prob: 0.70, description: "Fourth quarter - Seahawks lead 21-17" },
  { t: 465, quarter: 4, clock: 840, home: 21, away: 17, down: 1, distance: 10, yardline: 45, possession: 'away', event: 'big_play', win_prob: 0.62, description: "DeMario Douglas finds space! 20 yards!" },
  { t: 480, quarter: 4, clock: 780, home: 21, away: 24, down: 1, distance: 10, yardline: 0, possession: 'away', event: 'touchdown', win_prob: 0.45, description: "TOUCHDOWN PATRIOTS! They retake the lead!" },
  { t: 495, quarter: 4, clock: 720, home: 21, away: 24, down: 1, distance: 10, yardline: 25, possession: 'home', event: null, win_prob: 0.42, description: "Seahawks need to answer" },
  { t: 510, quarter: 4, clock: 660, home: 21, away: 24, down: 3, distance: 12, yardline: 38, possession: 'home', event: 'big_play', win_prob: 0.48, description: "Darnold scrambles! First down!" },
  { t: 525, quarter: 4, clock: 540, home: 24, away: 24, down: 1, distance: 10, yardline: 0, possession: 'home', event: 'field_goal', win_prob: 0.52, description: "FIELD GOAL! WE'RE TIED AT 24!" },
  { t: 540, quarter: 4, clock: 420, home: 24, away: 24, down: 2, distance: 5, yardline: 55, possession: 'away', event: 'fumble', win_prob: 0.65, description: "FUMBLE! Leonard Williams forces it, SEAHAWKS RECOVER!" },
  { t: 555, quarter: 4, clock: 300, home: 24, away: 24, down: 1, distance: 10, yardline: 42, possession: 'home', event: 'two_minute_warning', win_prob: 0.68, description: "Two-minute warning! Seahawks in control!" },
  { t: 570, quarter: 4, clock: 180, home: 24, away: 24, down: 1, distance: 10, yardline: 22, possession: 'home', event: 'first_down', win_prob: 0.75, description: "Seahawks in field goal range!" },
  { t: 585, quarter: 4, clock: 60, home: 24, away: 24, down: 1, distance: 10, yardline: 15, possession: 'home', event: null, win_prob: 0.82, description: "Clock running down..." },
  { t: 600, quarter: 4, clock: 0, home: 27, away: 24, down: 1, distance: 10, yardline: 0, possession: 'home', event: 'game_end', win_prob: 1.00, description: "FIELD GOAL! SEAHAWKS WIN SUPER BOWL LX!" },
];

// Team info
export const TEAMS = {
  home: {
    name: 'Seahawks',
    city: 'Seattle',
    abbreviation: 'SEA',
    color: 'team-home',
  },
  away: {
    name: 'Patriots',
    city: 'New England',
    abbreviation: 'NE',
    color: 'team-away',
  },
} as const;

// Suggested player names from actual rosters
export const SUGGESTED_PLAYERS = {
  home: [
    // Offense
    { name: 'Sam Darnold', position: 'QB' },
    { name: 'Kenneth Walker III', position: 'RB' },
    { name: 'Jaxon Smith-Njigba', position: 'WR' },
    { name: 'Cooper Kupp', position: 'WR' },
    { name: 'Rashid Shaheed', position: 'WR' },
    { name: 'Jake Bobo', position: 'WR' },
    { name: 'AJ Barner', position: 'TE' },
    { name: 'Charles Cross', position: 'OT' },
    { name: 'Abraham Lucas', position: 'OT' },
    // Defense
    { name: 'Devon Witherspoon', position: 'CB' },
    { name: 'Riq Woolen', position: 'CB' },
    { name: 'Boye Mafe', position: 'LB' },
    { name: 'Leonard Williams', position: 'DT' },
    { name: 'Uchenna Nwosu', position: 'LB' },
    { name: 'Julian Love', position: 'S' },
    { name: 'Ernest Jones IV', position: 'LB' },
    { name: 'Coby Bryant', position: 'S' },
    { name: 'Derick Hall', position: 'LB' },
  ],
  away: [
    // Offense
    { name: 'Drake Maye', position: 'QB' },
    { name: 'Rhamondre Stevenson', position: 'RB' },
    { name: 'TreVeyon Henderson', position: 'RB' },
    { name: 'Stefon Diggs', position: 'WR' },
    { name: 'DeMario Douglas', position: 'WR' },
    { name: 'Kayshon Boutte', position: 'WR' },
    { name: 'Hunter Henry', position: 'TE' },
    { name: 'Austin Hooper', position: 'TE' },
    { name: 'Mike Onwenu', position: 'OL' },
    // Defense
    { name: 'Christian Gonzalez', position: 'CB' },
    { name: 'Carlton Davis III', position: 'CB' },
    { name: 'Harold Landry III', position: 'LB' },
    { name: 'Robert Spillane', position: 'LB' },
    { name: 'Christian Barmore', position: 'DT' },
    { name: 'Marcus Jones', position: 'CB' },
    { name: 'Marte Mapu', position: 'LB' },
    { name: 'Jahlani Tavai', position: 'LB' },
    { name: 'Milton Williams', position: 'DT' },
  ],
} as const;

export const FRAME_INTERVAL = 15; // seconds between frames
export const TOTAL_DURATION = 600; // 10 minutes in seconds
