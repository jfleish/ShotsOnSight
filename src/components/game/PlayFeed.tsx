import { GameFrame } from '@/types/game';
import { cn } from '@/lib/utils';
import { Activity } from 'lucide-react';

interface PlayFeedProps {
  currentFrame: GameFrame;
  description?: string;
}

export function PlayFeed({ currentFrame, description }: PlayFeedProps) {
  const getEventBadge = (event: string | null) => {
    if (!event) return null;
    
    const badges: Record<string, { color: string; label: string }> = {
      touchdown: { color: 'bg-drink-shot text-white', label: 'TD' },
      field_goal: { color: 'bg-drink-sip text-primary-foreground', label: 'FG' },
      interception: { color: 'bg-destructive text-destructive-foreground', label: 'INT' },
      fumble: { color: 'bg-destructive text-destructive-foreground', label: 'FUM' },
      turnover: { color: 'bg-destructive text-destructive-foreground', label: 'TO' },
      turnover_on_downs: { color: 'bg-destructive text-destructive-foreground', label: 'TOD' },
      sack: { color: 'bg-accent text-accent-foreground', label: 'SACK' },
      big_play: { color: 'bg-primary text-primary-foreground', label: 'BIG PLAY' },
      first_down: { color: 'bg-secondary text-secondary-foreground', label: '1ST' },
      safety: { color: 'bg-destructive text-destructive-foreground', label: 'SAFETY' },
      two_minute_warning: { color: 'bg-accent text-accent-foreground', label: '2MIN' },
      halftime: { color: 'bg-muted text-muted-foreground', label: 'HALF' },
      game_start: { color: 'bg-primary text-primary-foreground', label: 'KICKOFF' },
      game_end: { color: 'bg-drink-shotgun text-accent-foreground', label: 'FINAL' },
      quarter_end: { color: 'bg-muted text-muted-foreground', label: 'END Q' },
    };

    const badge = badges[event];
    if (!badge) return null;

    return (
      <span className={cn(
        "px-2 py-1 rounded text-xs font-bold uppercase",
        badge.color
      )}>
        {badge.label}
      </span>
    );
  };

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="p-4 border-b border-border bg-muted/30">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-2">
          <Activity className="w-4 h-4" />
          Live Play
        </h3>
      </div>

      <div className="p-4">
        {/* Current play description */}
        <div className="flex items-start gap-3 mb-4">
          {currentFrame.event && getEventBadge(currentFrame.event)}
          <p className="text-lg font-medium text-foreground">
            {description || currentFrame.description || 'Game in progress...'}
          </p>
        </div>

        {/* Game situation */}
        <div className="grid grid-cols-3 gap-4 text-center bg-muted/30 rounded-lg p-3">
          <div>
            <p className="text-xs text-muted-foreground uppercase mb-1">Down</p>
            <p className="text-xl font-bold font-mono">
              {currentFrame.down}
              <span className="text-sm text-muted-foreground">
                &{currentFrame.distance}
              </span>
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase mb-1">Yardline</p>
            <p className="text-xl font-bold font-mono">{currentFrame.yardline}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase mb-1">Possession</p>
            <p className={cn(
              "text-xl font-bold",
              currentFrame.possession === 'home' ? 'text-team-home' : 'text-team-away'
            )}>
              {currentFrame.possession === 'home' ? 'PHI' : 'KC'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
