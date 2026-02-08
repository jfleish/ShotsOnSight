import { cn } from '@/lib/utils';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { TEAMS } from '@/data/demoGame';

interface WinProbCardProps {
  winProb: number;
  delta: number;
  homeScore: number;
  awayScore: number;
  quarter: number;
  clock: number;
  homeName: string;
  awayName: string;
}

export function WinProbCard({ 
  winProb, 
  delta, 
  homeScore, 
  awayScore, 
  quarter, 
  clock,
  homeName,
  awayName,
}: WinProbCardProps) {
  const homePercent = Math.round(winProb * 100);
  const awayPercent = 100 - homePercent;
  
  const formatClock = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDeltaInfo = () => {
    if (Math.abs(delta) < 0.01) {
      return { icon: Minus, color: 'text-win-neutral', text: 'STABLE' };
    }
    if (delta > 0) {
      return { icon: ArrowUp, color: 'text-win-positive', text: `+${(delta * 100).toFixed(0)}%` };
    }
    return { icon: ArrowDown, color: 'text-win-negative', text: `${(delta * 100).toFixed(0)}%` };
  };

  const deltaInfo = getDeltaInfo();
  const DeltaIcon = deltaInfo.icon;

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Scoreboard */}
      <div className="bg-muted/50 border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Home Team */}
            <div className="flex items-center gap-3">
              <img 
                src={TEAMS.home.logo} 
                alt={homeName} 
                className="w-14 h-14 object-contain"
              />
              <div className="text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{homeName}</p>
                <p className="text-4xl font-display text-team-home">{homeScore}</p>
              </div>
            </div>
            <div className="text-lg text-muted-foreground font-bold">–</div>
            {/* Away Team */}
            <div className="flex items-center gap-3">
              <div className="text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{awayName}</p>
                <p className="text-4xl font-display text-team-away">{awayScore}</p>
              </div>
              <img 
                src={TEAMS.away.logo} 
                alt={awayName} 
                className="w-14 h-14 object-contain"
              />
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Q{quarter}</p>
            <p className="text-xl font-mono font-bold tabular-nums">{formatClock(clock)}</p>
          </div>
        </div>
      </div>

      {/* Win Probability */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Win Probability
          </h3>
          <div className={cn("flex items-center gap-1 text-sm font-medium", deltaInfo.color)}>
            <DeltaIcon className="w-4 h-4" />
            <span>{deltaInfo.text}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative h-8 rounded-lg overflow-hidden bg-muted flex">
          <div 
            className="h-full bg-team-home transition-all duration-700 ease-out flex items-center justify-end pr-2"
            style={{ width: `${homePercent}%` }}
          >
            {homePercent >= 20 && (
              <span className="text-xs font-bold text-white drop-shadow-md">
                {homePercent}%
              </span>
            )}
          </div>
          <div 
            className="h-full bg-team-away transition-all duration-700 ease-out flex items-center justify-start pl-2"
            style={{ width: `${awayPercent}%` }}
          >
            {awayPercent >= 20 && (
              <span className="text-xs font-bold text-white drop-shadow-md">
                {awayPercent}%
              </span>
            )}
          </div>
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-background/50 -translate-x-1/2" />
        </div>

        {/* Labels */}
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>{homeName}</span>
          <span>{awayName}</span>
        </div>
      </div>
    </div>
  );
}
