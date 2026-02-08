import { useState } from 'react';
import { Player, Team } from '@/types/game';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TEAMS, FULL_ROSTERS, getPlayerHeadshotUrl } from '@/data/demoGame';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Plus, Trash2, Wine, Beer, Cylinder, User, Sparkles, ChevronDown } from 'lucide-react';

interface PlayerPanelProps {
  players: Player[];
  onAddPlayer: (name: string, team: Team, mode: 'casual' | 'savage' | 'dd') => void;
  onRemovePlayer: (playerId: string) => void;
  disabled?: boolean;
}

// Helper to find player headshot by name
const findPlayerHeadshot = (name: string): string | null => {
  const allPlayers = [...FULL_ROSTERS.home, ...FULL_ROSTERS.away];
  const player = allPlayers.find(p => p.name.toLowerCase() === name.toLowerCase());
  if (player && 'espnId' in player && player.espnId) {
    return getPlayerHeadshotUrl(player.espnId);
  }
  return null;
};

// Player avatar with headshot support
function PlayerAvatar({ name, team }: { name: string; team: Team }) {
  const headshotUrl = findPlayerHeadshot(name);
  
  return (
    <Avatar className="w-10 h-10">
      {headshotUrl && <AvatarImage src={headshotUrl} alt={name} />}
      <AvatarFallback className={cn(
        "text-sm font-bold",
        team === 'home' 
          ? "bg-team-home-muted text-team-home" 
          : "bg-team-away-muted text-team-away"
      )}>
        {name.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}

export function PlayerPanel({ players, onAddPlayer, onRemovePlayer, disabled }: PlayerPanelProps) {
  const [newName, setNewName] = useState('');
  const [newTeam, setNewTeam] = useState<Team>('home');
  const [newMode, setNewMode] = useState<'casual' | 'savage' | 'dd'>('casual');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [rosterFilter, setRosterFilter] = useState<'all' | 'home' | 'away'>('all');

  const handleAdd = () => {
    if (newName.trim()) {
      onAddPlayer(newName.trim(), newTeam, newMode);
      setNewName('');
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !disabled) {
      handleAdd();
    }
  };

  const handleSuggestionClick = (name: string, team: Team) => {
    setNewName(name);
    setNewTeam(team);
    setShowSuggestions(false);
  };

  // Get all players from selected rosters
  const getAllSuggestions = () => {
    const homePlayers = FULL_ROSTERS.home.map(p => ({ ...p, team: 'home' as Team }));
    const awayPlayers = FULL_ROSTERS.away.map(p => ({ ...p, team: 'away' as Team }));
    
    if (rosterFilter === 'home') return homePlayers;
    if (rosterFilter === 'away') return awayPlayers;
    return [...homePlayers, ...awayPlayers];
  };

  const allSuggestions = getAllSuggestions();
  const filteredSuggestions = allSuggestions.filter(
    p => p.name.toLowerCase().includes(newName.toLowerCase()) &&
    !players.some(player => player.name.toLowerCase() === p.name.toLowerCase())
  );

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="p-4 border-b border-border bg-muted/30">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-2">
          <User className="w-4 h-4" />
          Players ({players.length})
        </h3>
      </div>

      {/* Add player form */}
      {!disabled && (
        <div className="p-4 border-b border-border space-y-3">
          {/* Roster filter tabs */}
          <div className="flex gap-1 p-1 bg-muted rounded-lg">
            <button
              onClick={() => {
                setRosterFilter('all');
                setShowSuggestions(true);
              }}
              className={cn(
                "flex-1 py-1.5 px-2 rounded text-xs font-medium transition-all",
                rosterFilter === 'all'
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              All Players
            </button>
            <button
              onClick={() => {
                setRosterFilter('home');
                setShowSuggestions(true);
              }}
              className={cn(
                "flex-1 py-1.5 px-2 rounded text-xs font-medium transition-all",
                rosterFilter === 'home'
                  ? "bg-team-home text-white"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {TEAMS.home.abbreviation}
            </button>
            <button
              onClick={() => {
                setRosterFilter('away');
                setShowSuggestions(true);
              }}
              className={cn(
                "flex-1 py-1.5 px-2 rounded text-xs font-medium transition-all",
                rosterFilter === 'away'
                  ? "bg-team-away text-white"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {TEAMS.away.abbreviation}
            </button>
          </div>

          <div className="relative">
            <Input
              placeholder="Search player or type custom name..."
              value={newName}
              onChange={e => {
                setNewName(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyPress={handleKeyPress}
              className="bg-muted border-border pr-8"
            />
            <ChevronDown 
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground cursor-pointer"
              onClick={() => setShowSuggestions(!showSuggestions)}
            />
            
            {/* Suggestions dropdown */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute z-50 mt-1 w-full bg-card border border-border rounded-lg shadow-xl max-h-64 overflow-y-auto">
                <div className="sticky top-0 p-2 border-b border-border bg-muted">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {rosterFilter === 'all' 
                      ? 'All Players' 
                      : rosterFilter === 'home' 
                        ? `${TEAMS.home.name} Roster` 
                        : `${TEAMS.away.name} Roster`
                    } ({filteredSuggestions.length})
                  </p>
                </div>
                {filteredSuggestions.slice(0, 20).map((player) => {
                  const headshotUrl = 'espnId' in player ? getPlayerHeadshotUrl(player.espnId) : null;
                  return (
                    <button
                      key={`${player.team}-${player.name}`}
                      onClick={() => handleSuggestionClick(player.name, player.team)}
                      className="w-full px-3 py-2 text-left hover:bg-muted transition-colors flex items-center justify-between border-b border-border/50 last:border-0"
                    >
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          {headshotUrl && <AvatarImage src={headshotUrl} alt={player.name} />}
                          <AvatarFallback className={cn(
                            "text-xs font-bold",
                            player.team === 'home' 
                              ? "bg-team-home/20 text-team-home" 
                              : "bg-team-away/20 text-team-away"
                          )}>
                            {player.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className={cn(
                          "text-xs font-bold px-1.5 py-0.5 rounded",
                          player.team === 'home' 
                            ? "bg-team-home/20 text-team-home" 
                            : "bg-team-away/20 text-team-away"
                        )}>
                          #{player.number}
                        </span>
                        <span className="font-medium text-sm">{player.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{player.position}</span>
                        <span className={cn(
                          "text-xs",
                          player.team === 'home' ? 'text-team-home' : 'text-team-away'
                        )}>
                          {player.team === 'home' ? TEAMS.home.abbreviation : TEAMS.away.abbreviation}
                        </span>
                      </div>
                    </button>
                  );
                })}
                {filteredSuggestions.length > 20 && (
                  <div className="p-2 text-center text-xs text-muted-foreground bg-muted/50">
                    +{filteredSuggestions.length - 20} more players...
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setNewTeam('home')}
              className={cn(
                "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all",
                newTeam === 'home'
                  ? "bg-team-home text-white glow-team-home"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {TEAMS.home.name}
            </button>
            <button
              onClick={() => setNewTeam('away')}
              className={cn(
                "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all",
                newTeam === 'away'
                  ? "bg-team-away text-white glow-team-away"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {TEAMS.away.name}
            </button>
          </div>

          <div className="flex gap-2">
            {(['casual', 'savage', 'dd'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setNewMode(mode)}
                className={cn(
                  "flex-1 py-2 px-2 rounded-lg text-xs font-medium transition-all uppercase",
                  newMode === mode
                    ? mode === 'dd' 
                      ? "bg-muted-foreground text-background"
                      : mode === 'savage'
                        ? "bg-destructive text-destructive-foreground"
                        : "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {mode === 'dd' ? 'DD' : mode}
              </button>
            ))}
          </div>

          <Button onClick={handleAdd} className="w-full" disabled={!newName.trim()}>
            <Plus className="w-4 h-4 mr-2" />
            Add Player
          </Button>
        </div>
      )}

      {/* Player list */}
      <div className="divide-y divide-border max-h-80 overflow-y-auto">
        {players.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <User className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No players yet</p>
            <p className="text-xs mt-1">Add players to start</p>
          </div>
        ) : (
          players.map(player => (
            <div 
              key={player.id} 
              className={cn(
                "p-3 flex items-center gap-3",
                player.team === 'home' ? 'bg-team-home/5' : 'bg-team-away/5'
              )}
            >
              {/* Avatar */}
              <PlayerAvatar name={player.name} team={player.team} />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{player.name}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className={cn(
                    player.team === 'home' ? 'text-team-home' : 'text-team-away'
                  )}>
                    {TEAMS[player.team].name}
                  </span>
                  <span>•</span>
                  <span className={cn(
                    player.mode === 'savage' && 'text-destructive',
                    player.mode === 'dd' && 'text-muted-foreground'
                  )}>
                    {player.mode.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Drink counts */}
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1 text-accent">
                  <Wine className="w-3 h-3" />
                  <span className="font-mono">{player.sips}</span>
                </div>
                <div className="flex items-center gap-1 text-primary">
                  <Beer className="w-3 h-3" />
                  <span className="font-mono">{player.shots}</span>
                </div>
                <div className="flex items-center gap-1 text-[hsl(25,100%,55%)]">
                  <Cylinder className="w-3 h-3" />
                  <span className="font-mono">{player.shotguns}</span>
                </div>
              </div>

              {/* Remove button */}
              {!disabled && (
                <button
                  onClick={() => onRemovePlayer(player.id)}
                  className="p-2 rounded-lg hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
