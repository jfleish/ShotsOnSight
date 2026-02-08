import { GameFrame } from '@/types/game';

// NFLverse API base URL for play-by-play data
const NFLVERSE_PBP_URL = 'https://raw.githubusercontent.com/nflverse/nflverse-data/releases/pbp/play_by_play_';

// Team mapping from NFL abbreviations to our format
const TEAM_MAPPING: Record<string, 'home' | 'away'> = {
  'KC': 'home',  // Chiefs
  'PHI': 'away', // Eagles
  // Add more as needed
};

// Team colors and logos
const TEAM_INFO = {
  KC: {
    name: 'Chiefs',
    city: 'Kansas City',
    abbreviation: 'KC',
    logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/kc.png',
  },
  PHI: {
    name: 'Eagles',
    city: 'Philadelphia',
    abbreviation: 'PHI',
    logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/phi.png',
  },
};

// Fetch Super Bowl 2025 play-by-play data
export async function fetchSuperBowl2025Data(): Promise<GameFrame[]> {
  try {
    // Since Super Bowl 2025 hasn't been played yet (Feb 2025), 
    // we'll fetch the most recent available data and filter for Chiefs/Eagles games
    // or return empty to use demo data
    
    // Try to fetch 2024 season data
    const response = await fetch(`${NFLVERSE_PBP_URL}2024.csv`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    
    const csvText = await response.text();
    const plays = parseCSV(csvText);
    
    // Look for Chiefs vs Eagles games in 2024 season (including preseason/regular season)
    const chiefsEaglesGames = plays.filter(play => 
      ((play.home_team === 'KC' && play.away_team === 'PHI') ||
       (play.home_team === 'PHI' && play.away_team === 'KC'))
    );
    
    if (chiefsEaglesGames.length === 0) {
      console.warn('No Chiefs vs Eagles games found in 2024 data');
      return [];
    }
    
    console.log(`Found ${chiefsEaglesGames.length} plays from Chiefs vs Eagles games`);
    
    // Transform plays to GameFrame format
    return transformPlaysToGameFrames(chiefsEaglesGames);
  } catch (error) {
    console.error('Error fetching NFL data:', error);
    return [];
  }
}

// Parse CSV data
function parseCSV(csvText: string): any[] {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1)
    .filter(line => line.trim())
    .map(line => {
      const values = line.split(',');
      const obj: any = {};
      headers.forEach((header, index) => {
        obj[header] = values[index]?.replace(/"/g, '') || '';
      });
      return obj;
    });
}

// Transform NFLverse plays to our GameFrame format
function transformPlaysToGameFrames(plays: any[]): GameFrame[] {
  if (!plays || plays.length === 0) {
    return [];
  }
  
  const frames: GameFrame[] = [];
  let currentTime = 0;
  let homeScore = 0;
  let awayScore = 0;
  
  // Determine which team is home/away
  const firstPlay = plays[0];
  const homeTeam = firstPlay.home_team;
  const awayTeam = firstPlay.away_team;
  
  plays.forEach((play, index) => {
    // Skip plays with missing essential data
    if (!play.quarter && !play.game_seconds_remaining) {
      return;
    }
    
    // Update scores
    if (play.posteam === homeTeam && play.touchdown === '1') {
      homeScore += 6;
    } else if (play.posteam === awayTeam && play.touchdown === '1') {
      awayScore += 6;
    }
    
    // Add field goals
    if (play.field_goal_result === 'made') {
      if (play.posteam === homeTeam) {
        homeScore += 3;
      } else if (play.posteam === awayTeam) {
        awayScore += 3;
      }
    }
    
    // Determine possession
    let possession: 'home' | 'away';
    if (play.posteam === homeTeam) {
      possession = 'home';
    } else if (play.posteam === awayTeam) {
      possession = 'away';
    } else {
      possession = frames[frames.length - 1]?.possession || 'home';
    }
    
    // Determine event type
    const event = determineEventType(play);
    
    // Calculate win probability (simplified - would need model for real WP)
    const winProb = calculateWinProbability(homeScore, awayScore, possession, play);
    
    // Create frame every 15 seconds of game time or on events
    if (index % 5 === 0 || event) { // Sample every 5 plays or on events
      frames.push({
        t: currentTime,
        quarter: parseInt(play.quarter) || 1,
        clock: parseInt(play.game_seconds_remaining) || 900,
        home: homeScore,
        away: awayScore,
        down: parseInt(play.down) || 1,
        distance: parseInt(play.ydstogo) || 10,
        yardline: parseInt(play.yardline_100) || 25,
        possession,
        event,
        win_prob: winProb,
        description: generatePlayDescription(play),
      });
      
      currentTime += 15; // 15 seconds per frame
    }
  });
  
  // Ensure we have at least some frames
  if (frames.length === 0) {
    // Create a default frame
    frames.push({
      t: 0,
      quarter: 1,
      clock: 900,
      home: 0,
      away: 0,
      down: 1,
      distance: 10,
      yardline: 25,
      possession: 'home',
      event: 'game_start',
      win_prob: 0.50,
      description: "Game start",
    });
  }
  
  return frames;
}

// Determine the event type from play data
function determineEventType(play: any): GameFrame['event'] {
  if (play.touchdown === '1' || play.touchdown === 1) return 'touchdown';
  if (play.field_goal_result === 'made') return 'field_goal';
  if (play.field_goal_result === 'missed') return 'missed_fg';
  if (play.interception === '1' || play.interception === 1) return 'interception';
  if (play.fumble === '1' || play.fumble === 1) return 'fumble';
  if (play.safety === '1' || play.safety === 1) return 'safety';
  if (play.punt_result === 'blocked') return 'turnover';
  if (play.play_type === 'punt') return 'punt';
  if (play.sack === '1' || play.sack === 1) return 'sack';
  if (play.two_point_conv_result === 'success') return 'touchdown';
  if (play.play_type === 'kickoff') return 'kickoff';
  if (play.qtr_end === '1' || play.qtr_end === 1) return 'quarter_end';
  if (play.half_seconds_remaining === '0' || play.half_seconds_remaining === 0) return 'halftime';
  if (play.two_minute_warning === '1' || play.two_minute_warning === 1) return 'two_minute_warning';
  if (parseInt(play.yards_gained) >= 20) return 'big_play';
  if (play.first_down === '1' || play.first_down === 1) return 'first_down';
  if (play.turnover === '1' || play.turnover === 1) return 'turnover';
  
  return null;
}

// Simple win probability calculation (placeholder - would use actual model)
function calculateWinProbability(
  homeScore: number, 
  awayScore: number, 
  possession: 'home' | 'away',
  play: any
): number {
  const scoreDiff = homeScore - awayScore;
  const timeRemaining = parseInt(play.game_seconds_remaining) || 0;
  const quarter = parseInt(play.quarter) || 1;
  
  // Base probability from score difference
  let wp = 0.5 + (scoreDiff * 0.1);
  
  // Adjust for possession
  if (possession === 'home') wp += 0.05;
  else wp -= 0.05;
  
  // Adjust for time remaining
  if (timeRemaining < 300 && scoreDiff !== 0) { // Last 5 minutes
    wp += (scoreDiff > 0 && possession === 'home') ? 0.1 : -0.1;
    wp += (scoreDiff < 0 && possession === 'away') ? -0.1 : 0.1;
  }
  
  // Clamp between 0 and 1
  return Math.max(0, Math.min(1, wp));
}

// Generate play description
function generatePlayDescription(play: any): string {
  const desc = play.desc;
  if (!desc) return '';
  
  // Clean up description
  return desc
    .replace(/\(\d+\)/g, '') // Remove play numbers
    .replace(/\s+/g, ' ') // Normalize spaces
    .trim();
}

// Export team info for use in components
export { TEAM_INFO, TEAM_MAPPING };
