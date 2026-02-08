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

// Team info with ESPN logo URLs
export const TEAMS = {
  home: {
    name: 'Seahawks',
    city: 'Seattle',
    abbreviation: 'SEA',
    color: 'team-home',
    logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/sea.png',
  },
  away: {
    name: 'Patriots',
    city: 'New England',
    abbreviation: 'NE',
    color: 'team-away',
    logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/ne.png',
  },
} as const;

// ESPN Player ID for headshot URLs: https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/{id}.png
export const getPlayerHeadshotUrl = (espnId?: string) => 
  espnId ? `https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/${espnId}.png&w=96&h=70&cb=1` : null;

// Complete rosters from official team websites with ESPN IDs for key players
/*export const FULL_ROSTERS = {
  home: [
    // Quarterbacks
    { name: 'Sam Darnold', position: 'QB', number: '14', espnId: '3912547' },
    { name: 'Drew Lock', position: 'QB', number: '2', espnId: '3918639' },
    { name: 'Jalen Milroe', position: 'QB', number: '6', espnId: '4878261' },
    // Running Backs
    { name: 'Kenneth Walker III', position: 'RB', number: '9', espnId: '4362887' },
    { name: 'George Holani', position: 'RB', number: '36' },
    { name: 'Zach Charbonnet', position: 'RB', number: '26', espnId: '4241478' },
    { name: 'Kenny McIntosh', position: 'RB', number: '25', espnId: '4426354' },
    { name: 'Cam Akers', position: 'RB', number: '30', espnId: '4241389' },
    // Fullbacks
    { name: 'Brady Russell', position: 'FB', number: '38' },
    { name: 'Robbie Ouzts', position: 'FB', number: '40' },
    // Wide Receivers
    { name: 'Jaxon Smith-Njigba', position: 'WR', number: '11', espnId: '4426388' },
    { name: 'Cooper Kupp', position: 'WR', number: '10', espnId: '3046779' },
    { name: 'Rashid Shaheed', position: 'WR', number: '22', espnId: '4570645' },
    { name: 'Jake Bobo', position: 'WR', number: '19', espnId: '4244734' },
    { name: 'Dareke Young', position: 'WR', number: '83', espnId: '4361441' },
    { name: 'Tory Horton', position: 'WR', number: '15' },
    { name: 'Cody White', position: 'WR', number: '82' },
    // Tight Ends
    { name: 'AJ Barner', position: 'TE', number: '88', espnId: '4430027' },
    { name: 'Elijah Arroyo', position: 'TE', number: '18' },
    { name: 'Eric Saubert', position: 'TE', number: '81' },
    { name: 'Nick Kallerup', position: 'TE', number: '89' },
    // Offensive Line
    { name: 'Charles Cross', position: 'T', number: '67', espnId: '4361411' },
    { name: 'Abraham Lucas', position: 'T', number: '72', espnId: '4259566' },
    { name: 'Anthony Bradford', position: 'G', number: '75', espnId: '4430807' },
    { name: 'Christian Haynes', position: 'G', number: '64' },
    { name: 'Josh Jones', position: 'G/T', number: '74' },
    { name: 'Grey Zabel', position: 'G', number: '76' },
    { name: 'Olu Oluwatimi', position: 'C', number: '55', espnId: '4240390' },
    { name: 'Jalen Sundell', position: 'C', number: '61' },
    { name: 'Mason Richman', position: 'T/G', number: '78' },
    { name: 'Logan Brown', position: 'T', number: '73' },
    { name: 'Bryce Cabeldue', position: 'G', number: '77' },
    { name: 'Amari Kight', position: 'T', number: '79' },
    // Defensive Line
    { name: 'Leonard Williams', position: 'DT', number: '99', espnId: '2976560' },
    { name: 'Byron Murphy II', position: 'DT', number: '91', espnId: '4697815' },
    { name: 'Jarran Reed', position: 'NT', number: '90', espnId: '2977667' },
    { name: 'Brandon Pili', position: 'NT', number: '95' },
    { name: 'Rylie Mills', position: 'DE', number: '98' },
    { name: 'Mike Morris', position: 'DE', number: '94' },
    // Linebackers
    { name: 'Boye Mafe', position: 'LB', number: '53', espnId: '4361579' },
    { name: 'Uchenna Nwosu', position: 'LB', number: '7', espnId: '3128451' },
    { name: 'Ernest Jones IV', position: 'LB', number: '13', espnId: '4241204' },
    { name: 'Derick Hall', position: 'LB', number: '58', espnId: '4361741' },
    { name: 'DeMarcus Lawrence', position: 'LB', number: '0', espnId: '16718' },
    { name: 'Tyrice Knight', position: 'LB', number: '48' },
    { name: 'Jared Ivey', position: 'LB', number: '51' },
    { name: "Patrick O'Connell", position: 'LB', number: '52' },
    { name: "Connor O'Toole", position: 'LB', number: '57' },
    { name: 'Chazz Surratt', position: 'LB', number: '44' },
    { name: 'Drake Thomas', position: 'LB', number: '42' },
    // Cornerbacks
    { name: 'Devon Witherspoon', position: 'CB', number: '21', espnId: '4362081' },
    { name: 'Riq Woolen', position: 'CB', number: '27', espnId: '4372099' },
    { name: 'Josh Jobe', position: 'CB', number: '29' },
    { name: 'Nehemiah Pritchett', position: 'CB', number: '28' },
    // Safeties
    { name: 'Julian Love', position: 'S', number: '20', espnId: '3916387' },
    { name: 'Coby Bryant', position: 'S', number: '8', espnId: '4242509' },
    { name: 'Nick Emmanwori', position: 'S', number: '3' },
    { name: 'Ty Okada', position: 'S', number: '39' },
    { name: 'Quandre Diggs', position: 'S', number: '37', espnId: '2576399' },
    { name: 'AJ Finley', position: 'S', number: '30' },
    // Special Teams
    { name: 'Jason Myers', position: 'K', number: '5', espnId: '16917' },
    { name: 'Michael Dickson', position: 'P', number: '4', espnId: '3052101' },
    { name: 'Chris Stoll', position: 'LS', number: '41' },
  ],
  away: [
    // Quarterbacks
    { name: 'Drake Maye', position: 'QB', number: '10', espnId: '4700219' },
    { name: 'Tommy DeVito', position: 'QB', number: '16', espnId: '4036134' },
    { name: 'Joshua Dobbs', position: 'QB', number: '11', espnId: '3052896' },
    // Running Backs
    { name: 'Rhamondre Stevenson', position: 'RB', number: '38', espnId: '4360939' },
    { name: 'TreVeyon Henderson', position: 'RB', number: '32', espnId: '4878055' },
    { name: 'Antonio Gibson', position: 'RB', number: '4', espnId: '4035671' },
    { name: 'Terrell Jennings', position: 'RB', number: '26' },
    { name: 'Lan Larison', position: 'RB', number: '34' },
    // Fullbacks
    { name: 'Jack Westover', position: 'FB', number: '37' },
    { name: 'Brock Lampe', position: 'FB', number: '46' },
    // Wide Receivers
    { name: 'Stefon Diggs', position: 'WR', number: '8', espnId: '2976212' },
    { name: 'DeMario Douglas', position: 'WR', number: '3', espnId: '4428964' },
    { name: 'Kayshon Boutte', position: 'WR', number: '9', espnId: '4432709' },
    { name: 'Mack Hollins', position: 'WR', number: '13', espnId: '3040570' },
    { name: 'Kyle Williams', position: 'WR', number: '18' },
    { name: 'Efton Chism III', position: 'WR', number: '86' },
    // Tight Ends
    { name: 'Hunter Henry', position: 'TE', number: '85', espnId: '2976316' },
    { name: 'Austin Hooper', position: 'TE', number: '81', espnId: '2982818' },
    { name: 'CJ Dippre', position: 'TE', number: '82' },
    // Offensive Line
    { name: 'Mike Onwenu', position: 'OL', number: '71', espnId: '4035050' },
    { name: 'Morgan Moses', position: 'OT', number: '76', espnId: '16790' },
    { name: 'Vederian Lowe', position: 'OT', number: '59' },
    { name: 'Will Campbell', position: 'OT', number: '66' },
    { name: 'Marcus Bryant', position: 'OT', number: '52' },
    { name: 'Caedan Wallace', position: 'OT', number: '70' },
    { name: 'Thayer Munford Jr.', position: 'OT', number: '74' },
    { name: 'Garrett Bradbury', position: 'C', number: '65', espnId: '3122928' },
    { name: 'Ben Brown', position: 'C', number: '77' },
    { name: 'Jared Wilson', position: 'OL', number: '58' },
    { name: 'Yasir Durant', position: 'T', number: '72' },
    // Defensive Line
    { name: 'Christian Barmore', position: 'DT', number: '90', espnId: '4361050' },
    { name: 'Milton Williams', position: 'DT', number: '97', espnId: '4241983' },
    { name: 'Khyiris Tonga', position: 'DL', number: '95' },
    { name: 'Cory Durden', position: 'DL', number: '94' },
    { name: 'Joshua Farmer', position: 'DT', number: '92' },
    { name: 'Eric Gregory', position: 'DT', number: '55' },
    { name: 'Isaiah Iton', position: 'DT', number: '68' },
    // Linebackers
    { name: 'Harold Landry III', position: 'LB', number: '2', espnId: '3052035' },
    { name: 'Robert Spillane', position: 'LB', number: '14', espnId: '3126343' },
    { name: 'Marte Mapu', position: 'LB', number: '15', espnId: '4426362' },
    { name: 'Jahlani Tavai', position: 'LB', number: '48', espnId: '3122987' },
    { name: "K'Lavon Chaisson", position: 'LB', number: '44', espnId: '4241982' },
    { name: 'Anfernee Jennings', position: 'LB', number: '33', espnId: '3911854' },
    { name: 'Christian Elliss', position: 'LB', number: '53' },
    { name: 'Jack Gibbens', position: 'LB', number: '51' },
    { name: 'Chad Muma', position: 'LB', number: '49' },
    { name: 'Bradyn Swinson', position: 'LB', number: '43' },
    { name: 'Elijah Ponder', position: 'LB', number: '91' },
    // Cornerbacks
    { name: 'Christian Gonzalez', position: 'CB', number: '0', espnId: '4426354' },
    { name: 'Carlton Davis III', position: 'CB', number: '7', espnId: '3123048' },
    { name: 'Marcus Jones', position: 'CB', number: '25', espnId: '4369861' },
    { name: 'Alex Austin', position: 'CB', number: '28' },
    { name: 'Charles Woods', position: 'CB', number: '22' },
    { name: 'Marcellas Dial Jr.', position: 'DB', number: '27' },
    { name: 'Kobee Minor', position: 'DB', number: '19' },
    // Safeties
    { name: 'Jaylinn Hawkins', position: 'S', number: '21', espnId: '4035793' },
    { name: 'Brenden Schooler', position: 'S', number: '41' },
    { name: 'Dell Pettus', position: 'S', number: '24' },
    { name: 'Craig Woodson', position: 'S', number: '31' },
    // Special Teams
    { name: 'Andy Borregales', position: 'K', number: '36' },
    { name: 'Bryce Baringer', position: 'P', number: '17', espnId: '4259173' },
    { name: 'Julian Ashby', position: 'LS', number: '47' },
  ],*/

export const FULL_ROSTERS = [
  {
    name: 'Patrick Mahomes',
    espn_id: '3139477',
    position: 'QB',
    jerseyNumber: '15',
  },
  {
    name: 'Xavier Worthy',
    espn_id: '4686413',
    position: 'WR',
    jerseyNumber: '1',
  },
  {
    name: 'Travis Kelce',
    espn_id: '15847',
    position: 'TE',
    jerseyNumber: '87',
  },
  {
    name: 'DeAndre Hopkins',
    espn_id: '15795',
    position: 'WR',
    jerseyNumber: '10',
  },
  {
    name: 'JuJu Smith-Schuster',
    espn_id: '3116385',
    position: 'WR',
    jerseyNumber: '9',
  },
  {
    name: 'Jalen Hurts',
    espn_id: '4040715',
    position: 'QB',
    jerseyNumber: '1',
  },
  {
    name: 'Saquon Barkley',
    espn_id: '3929630',
    position: 'RB',
    jerseyNumber: '26',
  },
  {
    name: 'DeVonta Smith',
    espn_id: '4241479',
    position: 'WR',
    jerseyNumber: '6',
  },
  {
    name: 'AJ Brown',
    espn_id: '4047646',
    position: 'WR',
    jerseyNumber: '11',
  },
  {
    name: 'Cooper DeJean',
    espn_id: '4697810',
    position: 'CB',
    jerseyNumber: '33',
  },
];

export const FRAME_INTERVAL = 15; // seconds between frames
export const TOTAL_DURATION = 600; // 10 minutes in seconds
