import { useState } from 'react';
import { Player, Team } from '@/types/game';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TEAMS, SUGGESTED_PLAYERS } from '@/data/demoGame';
import { Plus, Trash2, Wine, Beer, Cylinder, User, Sparkles } from 'lucide-react';

interface PlayerPanelProps {
  players: Player[];
  onAddPlayer: (name: string, team: Team, mode: 'casual' | 'savage' | 'dd') => void;
  onRemovePlayer: (playerId: string) => void;
  disabled?: boolean;
}

export function PlayerPanel({ players, onAddPlayer, onRemovePlayer, disabled }: PlayerPanelProps) {
  const [newName, setNewName] = useState('');
  const [newTeam, setNewTeam] = useState<Team>('home');
  const [newMode, setNewMode] = useState<'casual' | 'savage' | 'dd'>('casual');
  const [showSuggestions, setShowSuggestions] = useState(false);

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

  const handleSuggestionClick = (name: string) => {
    setNewName(name);
    setShowSuggestions(false);
  };

  const currentSuggestions = SUGGESTED_PLAYERS[newTeam];
  const filteredSuggestions = currentSuggestions.filter(
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
          <div className="relative">
            <Input
              placeholder="Enter player name or pick from roster"
              value={newName}
              onChange={e => {
                setNewName(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyPress={handleKeyPress}
              className="bg-muted border-border"
            />
            
            {/* Suggestions dropdown */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-popover border border-border rounded-lg shadow-lg max-h-48 overflow-y-auto">
                <div className="p-2 border-b border-border bg-muted/50">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {TEAMS[newTeam].name} Roster
                  </p>
                </div>
                {filteredSuggestions.slice(0, 8).map((player) => (
                  <button
                    key={player.name}
                    onClick={() => handleSuggestionClick(player.name)}
                    className="w-full px-3 py-2 text-left hover:bg-muted transition-colors flex items-center justify-between"
                  >
                    <span className="font-medium text-sm">{player.name}</span>
                    <span className="text-xs text-muted-foreground">{player.position}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => {
                setNewTeam('home');
                setShowSuggestions(true);
              }}
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
              onClick={() => {
                setNewTeam('away');
                setShowSuggestions(true);
              }}
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
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold",
                player.team === 'home' 
                  ? "bg-team-home-muted text-team-home" 
                  : "bg-team-away-muted text-team-away"
              )}>
                {player.name.charAt(0).toUpperCase()}
              </div>

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
                <div className="flex items-center gap-1 text-drink-sip">
                  <Wine className="w-3 h-3" />
                  <span className="font-mono">{player.sips}</span>
                </div>
                <div className="flex items-center gap-1 text-drink-shot">
                  <Beer className="w-3 h-3" />
                  <span className="font-mono">{player.shots}</span>
                </div>
                <div className="flex items-center gap-1 text-drink-shotgun">
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
