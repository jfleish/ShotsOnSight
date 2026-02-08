import { Player } from '@/types/game';
import { cn } from '@/lib/utils';
import { Trophy, Wine, Beer, Cylinder, Medal } from 'lucide-react';
import { TEAMS } from '@/data/demoGame';

interface LeaderboardProps {
  players: Player[];
  isGameOver: boolean;
}

export function Leaderboard({ players, isGameOver }: LeaderboardProps) {
  // Calculate total drinks with weights
  const getScore = (player: Player) => {
    return player.sips + (player.shots * 2) + (player.shotguns * 5);
  };

  // Sort by total drinks (descending)
  const sortedPlayers = [...players].sort((a, b) => getScore(b) - getScore(a));

  // Get medal icon
  const getMedal = (index: number) => {
    if (!isGameOver) return null;
    switch (index) {
      case 0:
        return <Trophy className="w-5 h-5 text-drink-shotgun" />;
      case 1:
        return <Medal className="w-5 h-5 text-secondary-foreground" />;
      case 2:
        return <Medal className="w-5 h-5 text-amber-700" />;
      default:
        return null;
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-2">
          <Trophy className="w-4 h-4" />
          Leaderboard
        </h3>
        {isGameOver && (
          <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full font-medium">
            FINAL
          </span>
        )}
      </div>

      <div className="divide-y divide-border">
        {sortedPlayers.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <Trophy className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No scores yet</p>
          </div>
        ) : (
          sortedPlayers.map((player, index) => (
            <div 
              key={player.id} 
              className={cn(
                "p-3 flex items-center gap-3 transition-all",
                index === 0 && isGameOver && "bg-drink-shotgun/10",
                player.team === 'home' ? 'hover:bg-team-home/5' : 'hover:bg-team-away/5'
              )}
            >
              {/* Rank */}
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                index === 0 && "bg-drink-shotgun/20 text-drink-shotgun",
                index === 1 && "bg-muted text-muted-foreground",
                index === 2 && "bg-accent/20 text-accent",
                index > 2 && "bg-muted/50 text-muted-foreground"
              )}>
                {getMedal(index) || `#${index + 1}`}
              </div>

              {/* Player info */}
              <div className="flex-1 min-w-0">
                <p className={cn(
                  "font-medium truncate",
                  index === 0 && isGameOver && "text-drink-shotgun"
                )}>
                  {player.name}
                </p>
                <p className={cn(
                  "text-xs",
                  player.team === 'home' ? 'text-team-home' : 'text-team-away'
                )}>
                  {TEAMS[player.team].name}
                </p>
              </div>

              {/* Drink breakdown */}
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-3 text-xs">
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

                {/* Total score */}
                <div className={cn(
                  "text-right min-w-[60px]",
                  index === 0 && isGameOver && "text-drink-shotgun"
                )}>
                  <p className="text-lg font-bold font-mono">{getScore(player)}</p>
                  <p className="text-xs text-muted-foreground">pts</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Legend */}
      {sortedPlayers.length > 0 && (
        <div className="p-3 border-t border-border bg-muted/20">
          <p className="text-xs text-muted-foreground text-center">
            <span className="text-drink-sip">Sip = 1pt</span>
            {' • '}
            <span className="text-drink-shot">Shot = 2pts</span>
            {' • '}
            <span className="text-drink-shotgun">Shotgun = 5pts</span>
          </p>
        </div>
      )}
    </div>
  );
}
