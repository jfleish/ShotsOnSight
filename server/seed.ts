import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './db.js';
import { Game } from './models/Game.js';
import { GameSession } from './models/GameSession.js';
import { DrinkEvent } from './models/DrinkEvent.js';

const DEMO_FRAMES = [
  { t: 0, quarter: 1, clock: 900, home: 0, away: 0, down: 1, distance: 10, yardline: 25, possession: 'home' as const, event: 'game_start', win_prob: 0.50, description: "Kickoff! Super Bowl LIX begins!" },
  { t: 15, quarter: 1, clock: 840, home: 0, away: 0, down: 1, distance: 10, yardline: 30, possession: 'home' as const, event: 'first_down', win_prob: 0.52, description: "Chiefs move the chains" },
  { t: 30, quarter: 1, clock: 780, home: 0, away: 0, down: 2, distance: 6, yardline: 45, possession: 'home' as const, event: 'big_play', win_prob: 0.55, description: "Mahomes to Worthy! 25 yards!" },
  { t: 45, quarter: 1, clock: 720, home: 0, away: 0, down: 1, distance: 10, yardline: 68, possession: 'home' as const, event: null, win_prob: 0.56, description: "Chiefs in Eagles territory" },
  { t: 60, quarter: 1, clock: 660, home: 0, away: 0, down: 3, distance: 4, yardline: 72, possession: 'home' as const, event: 'interception', win_prob: 0.35, description: "INTERCEPTED! Cooper DeJean has it!" },
  { t: 75, quarter: 1, clock: 600, home: 0, away: 0, down: 1, distance: 10, yardline: 28, possession: 'away' as const, event: 'big_play', win_prob: 0.32, description: "Hurts finds AJ Brown! 35 yards!" },
  { t: 90, quarter: 1, clock: 540, home: 0, away: 7, down: 1, distance: 10, yardline: 0, possession: 'away' as const, event: 'touchdown', win_prob: 0.28, description: "TOUCHDOWN EAGLES! Jalen Hurts to DeVonta Smith!" },
  { t: 105, quarter: 1, clock: 480, home: 0, away: 7, down: 1, distance: 10, yardline: 25, possession: 'home' as const, event: null, win_prob: 0.30, description: "Chiefs need to respond" },
  { t: 120, quarter: 1, clock: 420, home: 0, away: 7, down: 3, distance: 8, yardline: 35, possession: 'home' as const, event: 'sack', win_prob: 0.25, description: "Mahomes goes down! Brandon Graham with the sack!" },
  { t: 135, quarter: 1, clock: 360, home: 0, away: 7, down: 4, distance: 15, yardline: 28, possession: 'home' as const, event: 'punt', win_prob: 0.24, description: "Chiefs forced to punt" },
  { t: 150, quarter: 2, clock: 900, home: 0, away: 7, down: 1, distance: 10, yardline: 40, possession: 'away' as const, event: 'quarter_end', win_prob: 0.24, description: "End of Q1 - Eagles lead 7-0" },
  { t: 165, quarter: 2, clock: 840, home: 0, away: 7, down: 1, distance: 10, yardline: 55, possession: 'away' as const, event: 'first_down', win_prob: 0.22, description: "Eagles driving" },
  { t: 180, quarter: 2, clock: 780, home: 0, away: 14, down: 1, distance: 10, yardline: 0, possession: 'away' as const, event: 'touchdown', win_prob: 0.15, description: "TOUCHDOWN! Saquon Barkley punches it in!" },
  { t: 195, quarter: 2, clock: 720, home: 0, away: 14, down: 2, distance: 8, yardline: 32, possession: 'home' as const, event: 'fumble', win_prob: 0.10, description: "FUMBLE! Eagles recover!" },
  { t: 210, quarter: 2, clock: 660, home: 0, away: 17, down: 1, distance: 10, yardline: 0, possession: 'away' as const, event: 'field_goal', win_prob: 0.08, description: "Field goal good! Eagles 17-0" },
  { t: 225, quarter: 2, clock: 600, home: 0, away: 17, down: 1, distance: 10, yardline: 25, possession: 'home' as const, event: null, win_prob: 0.09, description: "Chiefs facing a mountain" },
  { t: 240, quarter: 2, clock: 540, home: 0, away: 17, down: 1, distance: 10, yardline: 45, possession: 'home' as const, event: 'big_play', win_prob: 0.12, description: "Travis Kelce! 35-yard catch!" },
  { t: 255, quarter: 2, clock: 480, home: 7, away: 17, down: 1, distance: 10, yardline: 0, possession: 'home' as const, event: 'touchdown', win_prob: 0.22, description: "TOUCHDOWN CHIEFS! Mahomes to Hopkins!" },
  { t: 270, quarter: 2, clock: 420, home: 7, away: 17, down: 1, distance: 10, yardline: 35, possession: 'away' as const, event: null, win_prob: 0.20, description: "Eagles looking to extend" },
  { t: 285, quarter: 2, clock: 300, home: 7, away: 17, down: 1, distance: 10, yardline: 50, possession: 'away' as const, event: 'two_minute_warning', win_prob: 0.19, description: "Two-minute warning!" },
  { t: 300, quarter: 2, clock: 0, home: 7, away: 17, down: 1, distance: 10, yardline: 25, possession: 'away' as const, event: 'halftime', win_prob: 0.18, description: "HALFTIME - Eagles lead 17-7" },
  { t: 315, quarter: 3, clock: 900, home: 7, away: 17, down: 1, distance: 10, yardline: 25, possession: 'home' as const, event: null, win_prob: 0.20, description: "Second half underway!" },
  { t: 330, quarter: 3, clock: 840, home: 7, away: 17, down: 1, distance: 10, yardline: 50, possession: 'home' as const, event: 'big_play', win_prob: 0.25, description: "Worthy! 25 yards!" },
  { t: 345, quarter: 3, clock: 780, home: 14, away: 17, down: 1, distance: 10, yardline: 0, possession: 'home' as const, event: 'touchdown', win_prob: 0.38, description: "TOUCHDOWN! Chiefs within 3!" },
  { t: 360, quarter: 3, clock: 720, home: 14, away: 17, down: 2, distance: 7, yardline: 33, possession: 'away' as const, event: 'sack', win_prob: 0.42, description: "Chris Jones sacks Hurts!" },
  { t: 375, quarter: 3, clock: 660, home: 14, away: 17, down: 4, distance: 12, yardline: 28, possession: 'away' as const, event: 'turnover_on_downs', win_prob: 0.48, description: "TURNOVER ON DOWNS! Chiefs ball!" },
  { t: 390, quarter: 3, clock: 600, home: 14, away: 17, down: 1, distance: 10, yardline: 72, possession: 'home' as const, event: 'first_down', win_prob: 0.50, description: "Chiefs in business" },
  { t: 405, quarter: 3, clock: 540, home: 17, away: 17, down: 1, distance: 10, yardline: 0, possession: 'home' as const, event: 'field_goal', win_prob: 0.52, description: "FIELD GOAL! IT'S TIED!" },
  { t: 420, quarter: 3, clock: 480, home: 17, away: 17, down: 3, distance: 6, yardline: 42, possession: 'away' as const, event: 'interception', win_prob: 0.62, description: "PICKED OFF! Trent McDuffie has it!" },
  { t: 435, quarter: 3, clock: 420, home: 24, away: 17, down: 1, distance: 10, yardline: 0, possession: 'home' as const, event: 'touchdown', win_prob: 0.72, description: "TOUCHDOWN! CHIEFS LEAD!" },
  { t: 450, quarter: 4, clock: 900, home: 24, away: 17, down: 1, distance: 10, yardline: 25, possession: 'away' as const, event: 'quarter_end', win_prob: 0.70, description: "Fourth quarter - Chiefs lead 24-17" },
  { t: 465, quarter: 4, clock: 840, home: 24, away: 17, down: 1, distance: 10, yardline: 45, possession: 'away' as const, event: 'big_play', win_prob: 0.62, description: "AJ Brown finds space! 20 yards!" },
  { t: 480, quarter: 4, clock: 780, home: 24, away: 24, down: 1, distance: 10, yardline: 0, possession: 'away' as const, event: 'touchdown', win_prob: 0.45, description: "TOUCHDOWN EAGLES! They tie it up!" },
  { t: 495, quarter: 4, clock: 720, home: 24, away: 24, down: 1, distance: 10, yardline: 25, possession: 'home' as const, event: null, win_prob: 0.42, description: "Chiefs need to answer" },
  { t: 510, quarter: 4, clock: 660, home: 24, away: 24, down: 3, distance: 12, yardline: 38, possession: 'home' as const, event: 'big_play', win_prob: 0.48, description: "Mahomes scrambles! First down!" },
  { t: 525, quarter: 4, clock: 540, home: 27, away: 24, down: 1, distance: 10, yardline: 0, possession: 'home' as const, event: 'field_goal', win_prob: 0.52, description: "FIELD GOAL! CHIEFS LEAD 27-24!" },
  { t: 540, quarter: 4, clock: 420, home: 27, away: 24, down: 2, distance: 5, yardline: 55, possession: 'away' as const, event: 'fumble', win_prob: 0.65, description: "FUMBLE! Chiefs force it, THEY RECOVER!" },
  { t: 555, quarter: 4, clock: 300, home: 27, away: 24, down: 1, distance: 10, yardline: 42, possession: 'home' as const, event: 'two_minute_warning', win_prob: 0.68, description: "Two-minute warning! Chiefs in control!" },
  { t: 570, quarter: 4, clock: 180, home: 27, away: 24, down: 1, distance: 10, yardline: 22, possession: 'home' as const, event: 'first_down', win_prob: 0.75, description: "Chiefs in field goal range!" },
  { t: 585, quarter: 4, clock: 60, home: 27, away: 24, down: 1, distance: 10, yardline: 15, possession: 'home' as const, event: null, win_prob: 0.82, description: "Clock running down..." },
  { t: 600, quarter: 4, clock: 0, home: 30, away: 24, down: 1, distance: 10, yardline: 0, possession: 'home' as const, event: 'game_end', win_prob: 1.00, description: "FIELD GOAL! CHIEFS WIN SUPER BOWL LIX!" },
];

const HOME_TEAM = {
  name: 'Chiefs',
  city: 'Kansas City',
  abbreviation: 'KC',
  color: 'team-home',
  logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/kc.png',
};

const AWAY_TEAM = {
  name: 'Eagles',
  city: 'Philadelphia',
  abbreviation: 'PHI',
  color: 'team-away',
  logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/phi.png',
};

const HOME_ROSTER = [
  { name: 'Patrick Mahomes', position: 'QB', number: '15', espnId: '3139477' },
  { name: 'Travis Kelce', position: 'TE', number: '87', espnId: '15847' },
  { name: 'Xavier Worthy', position: 'WR', number: '1', espnId: '4686413' },
];

const AWAY_ROSTER = [
  { name: 'Jalen Hurts', position: 'QB', number: '1', espnId: '4040715' },
  { name: 'Saquon Barkley', position: 'RB', number: '26', espnId: '3929630' },
  { name: 'AJ Brown', position: 'WR', number: '11', espnId: '4047646' },
];

async function seed() {
  await connectDB();
  console.log('Seeding database...');

  // Clear existing data
  await Game.deleteMany({});
  await GameSession.deleteMany({});
  await DrinkEvent.deleteMany({});
  console.log('Cleared existing data');

  // Create the demo game
  const game = await Game.create({
    title: 'Super Bowl LIX - Chiefs vs Eagles',
    homeTeam: HOME_TEAM,
    awayTeam: AWAY_TEAM,
    homeRoster: HOME_ROSTER,
    awayRoster: AWAY_ROSTER,
    frames: DEMO_FRAMES,
    frameInterval: 15,
    totalDuration: 600,
    status: 'upcoming',
  });

  console.log(`Created game: ${game.title} (ID: ${game._id})`);
  console.log(`  ${game.frames.length} frames loaded`);
  console.log(`  Home: ${game.homeTeam.city} ${game.homeTeam.name}`);
  console.log(`  Away: ${game.awayTeam.city} ${game.awayTeam.name}`);
  console.log('Seed complete!');

  process.exit(0);
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
