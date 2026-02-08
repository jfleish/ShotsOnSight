import { GameFrame } from '@/types/game';

// Comeback Thriller Demo - Eagles vs Chiefs
// 10 minutes = 600 seconds, ~40 frames, 15 seconds per frame
export const DEMO_GAME: GameFrame[] = [
  // Q1 - Chiefs dominate early
  { t: 0, quarter: 1, clock: 900, home: 0, away: 0, down: 1, distance: 10, yardline: 25, possession: 'home', event: 'game_start', win_prob: 0.50, description: "Kickoff! The Super Bowl begins!" },
  { t: 15, quarter: 1, clock: 840, home: 0, away: 0, down: 1, distance: 10, yardline: 30, possession: 'home', event: 'first_down', win_prob: 0.52, description: "Eagles move the chains" },
  { t: 30, quarter: 1, clock: 780, home: 0, away: 0, down: 2, distance: 6, yardline: 45, possession: 'home', event: 'big_play', win_prob: 0.55, description: "Big gain up the middle!" },
  { t: 45, quarter: 1, clock: 720, home: 0, away: 0, down: 1, distance: 10, yardline: 68, possession: 'home', event: null, win_prob: 0.56, description: "Eagles in Chiefs territory" },
  { t: 60, quarter: 1, clock: 660, home: 0, away: 0, down: 3, distance: 4, yardline: 72, possession: 'home', event: 'interception', win_prob: 0.35, description: "INTERCEPTED! Mahomes has it!" },
  { t: 75, quarter: 1, clock: 600, home: 0, away: 0, down: 1, distance: 10, yardline: 28, possession: 'away', event: 'big_play', win_prob: 0.32, description: "Kelce breaks free for 25 yards!" },
  { t: 90, quarter: 1, clock: 540, home: 0, away: 7, down: 1, distance: 10, yardline: 0, possession: 'away', event: 'touchdown', win_prob: 0.28, description: "TOUCHDOWN CHIEFS! Mahomes magic!" },
  { t: 105, quarter: 1, clock: 480, home: 0, away: 7, down: 1, distance: 10, yardline: 25, possession: 'home', event: null, win_prob: 0.30, description: "Eagles need to respond" },
  { t: 120, quarter: 1, clock: 420, home: 0, away: 7, down: 3, distance: 8, yardline: 35, possession: 'home', event: 'sack', win_prob: 0.25, description: "Hurts goes down! Huge sack!" },
  { t: 135, quarter: 1, clock: 360, home: 0, away: 7, down: 4, distance: 15, yardline: 28, possession: 'home', event: 'punt', win_prob: 0.24, description: "Eagles forced to punt" },
  
  // Q2 - Chiefs extend lead, Eagles collapse
  { t: 150, quarter: 2, clock: 900, home: 0, away: 7, down: 1, distance: 10, yardline: 40, possession: 'away', event: 'quarter_end', win_prob: 0.24, description: "End of Q1 - Chiefs lead 7-0" },
  { t: 165, quarter: 2, clock: 840, home: 0, away: 7, down: 1, distance: 10, yardline: 55, possession: 'away', event: 'first_down', win_prob: 0.22, description: "Chiefs driving" },
  { t: 180, quarter: 2, clock: 780, home: 0, away: 14, down: 1, distance: 10, yardline: 0, possession: 'away', event: 'touchdown', win_prob: 0.15, description: "TOUCHDOWN! Chiefs up 14!" },
  { t: 195, quarter: 2, clock: 720, home: 0, away: 14, down: 2, distance: 8, yardline: 32, possession: 'home', event: 'fumble', win_prob: 0.10, description: "FUMBLE! Chiefs recover!" },
  { t: 210, quarter: 2, clock: 660, home: 0, away: 17, down: 1, distance: 10, yardline: 0, possession: 'away', event: 'field_goal', win_prob: 0.08, description: "Field goal good! Chiefs 17-0" },
  { t: 225, quarter: 2, clock: 600, home: 0, away: 17, down: 1, distance: 10, yardline: 25, possession: 'home', event: null, win_prob: 0.09, description: "Eagles facing a mountain" },
  { t: 240, quarter: 2, clock: 540, home: 0, away: 17, down: 1, distance: 10, yardline: 45, possession: 'home', event: 'big_play', win_prob: 0.12, description: "A.J. Brown! 35-yard catch!" },
  { t: 255, quarter: 2, clock: 480, home: 7, away: 17, down: 1, distance: 10, yardline: 0, possession: 'home', event: 'touchdown', win_prob: 0.22, description: "TOUCHDOWN EAGLES! Back in it!" },
  { t: 270, quarter: 2, clock: 420, home: 7, away: 17, down: 1, distance: 10, yardline: 35, possession: 'away', event: null, win_prob: 0.20, description: "Chiefs looking to extend" },
  { t: 285, quarter: 2, clock: 300, home: 7, away: 17, down: 1, distance: 10, yardline: 50, possession: 'away', event: 'two_minute_warning', win_prob: 0.19, description: "Two-minute warning!" },
  { t: 300, quarter: 2, clock: 0, home: 7, away: 17, down: 1, distance: 10, yardline: 25, possession: 'away', event: 'halftime', win_prob: 0.18, description: "HALFTIME - Chiefs lead 17-7" },
  
  // Q3 - Eagles rally begins
  { t: 315, quarter: 3, clock: 900, home: 7, away: 17, down: 1, distance: 10, yardline: 25, possession: 'home', event: null, win_prob: 0.20, description: "Second half underway!" },
  { t: 330, quarter: 3, clock: 840, home: 7, away: 17, down: 1, distance: 10, yardline: 50, possession: 'home', event: 'big_play', win_prob: 0.25, description: "DeVonta Smith! 25 yards!" },
  { t: 345, quarter: 3, clock: 780, home: 14, away: 17, down: 1, distance: 10, yardline: 0, possession: 'home', event: 'touchdown', win_prob: 0.38, description: "TOUCHDOWN! Eagles within 3!" },
  { t: 360, quarter: 3, clock: 720, home: 14, away: 17, down: 2, distance: 7, yardline: 33, possession: 'away', event: 'sack', win_prob: 0.42, description: "Hurts sacks Mahomes!" },
  { t: 375, quarter: 3, clock: 660, home: 14, away: 17, down: 4, distance: 12, yardline: 28, possession: 'away', event: 'turnover_on_downs', win_prob: 0.48, description: "TURNOVER ON DOWNS! Eagles ball!" },
  { t: 390, quarter: 3, clock: 600, home: 14, away: 17, down: 1, distance: 10, yardline: 72, possession: 'home', event: 'first_down', win_prob: 0.50, description: "Eagles in business" },
  { t: 405, quarter: 3, clock: 540, home: 17, away: 17, down: 1, distance: 10, yardline: 0, possession: 'home', event: 'field_goal', win_prob: 0.52, description: "FIELD GOAL! IT'S TIED!" },
  { t: 420, quarter: 3, clock: 480, home: 17, away: 17, down: 3, distance: 6, yardline: 42, possession: 'away', event: 'interception', win_prob: 0.62, description: "PICKED OFF! Bradberry has it!" },
  { t: 435, quarter: 3, clock: 420, home: 21, away: 17, down: 1, distance: 10, yardline: 0, possession: 'home', event: 'touchdown', win_prob: 0.72, description: "TOUCHDOWN! EAGLES LEAD!" },
  
  // Q4 - The dramatic finish
  { t: 450, quarter: 4, clock: 900, home: 21, away: 17, down: 1, distance: 10, yardline: 25, possession: 'away', event: 'quarter_end', win_prob: 0.70, description: "Fourth quarter - Eagles lead 21-17" },
  { t: 465, quarter: 4, clock: 840, home: 21, away: 17, down: 1, distance: 10, yardline: 45, possession: 'away', event: 'big_play', win_prob: 0.62, description: "Kelce finds space! 20 yards!" },
  { t: 480, quarter: 4, clock: 780, home: 21, away: 24, down: 1, distance: 10, yardline: 0, possession: 'away', event: 'touchdown', win_prob: 0.45, description: "TOUCHDOWN CHIEFS! They retake the lead!" },
  { t: 495, quarter: 4, clock: 720, home: 21, away: 24, down: 1, distance: 10, yardline: 25, possession: 'home', event: null, win_prob: 0.42, description: "Eagles need to answer" },
  { t: 510, quarter: 4, clock: 660, home: 21, away: 24, down: 3, distance: 12, yardline: 38, possession: 'home', event: 'big_play', win_prob: 0.48, description: "Hurts scrambles! First down!" },
  { t: 525, quarter: 4, clock: 540, home: 24, away: 24, down: 1, distance: 10, yardline: 0, possession: 'home', event: 'field_goal', win_prob: 0.52, description: "FIELD GOAL! WE'RE TIED AT 24!" },
  { t: 540, quarter: 4, clock: 420, home: 24, away: 24, down: 2, distance: 5, yardline: 55, possession: 'away', event: 'fumble', win_prob: 0.65, description: "FUMBLE! EAGLES RECOVER!" },
  { t: 555, quarter: 4, clock: 300, home: 24, away: 24, down: 1, distance: 10, yardline: 42, possession: 'home', event: 'two_minute_warning', win_prob: 0.68, description: "Two-minute warning! Eagles in control!" },
  { t: 570, quarter: 4, clock: 180, home: 24, away: 24, down: 1, distance: 10, yardline: 22, possession: 'home', event: 'first_down', win_prob: 0.75, description: "Eagles in field goal range!" },
  { t: 585, quarter: 4, clock: 60, home: 24, away: 24, down: 1, distance: 10, yardline: 15, possession: 'home', event: null, win_prob: 0.82, description: "Clock running down..." },
  { t: 600, quarter: 4, clock: 0, home: 27, away: 24, down: 1, distance: 10, yardline: 0, possession: 'home', event: 'game_end', win_prob: 1.00, description: "FIELD GOAL! EAGLES WIN THE SUPER BOWL!" },
];

// Team info
export const TEAMS = {
  home: {
    name: 'Eagles',
    city: 'Philadelphia',
    abbreviation: 'PHI',
    color: 'team-home',
  },
  away: {
    name: 'Chiefs',
    city: 'Kansas City',
    abbreviation: 'KC',
    color: 'team-away',
  },
} as const;

export const FRAME_INTERVAL = 15; // seconds between frames
export const TOTAL_DURATION = 600; // 10 minutes in seconds
