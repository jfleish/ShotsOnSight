import { TEAMS } from '@/data/demoGame';
import { Zap } from 'lucide-react';

interface HeaderBarProps {
  elapsedTime: number;
  totalDuration: number;
  isPlaying: boolean;
}

export function HeaderBar({ elapsedTime, totalDuration, isPlaying }: HeaderBarProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (elapsedTime / totalDuration) * 100;

  return (
    <header className="relative overflow-hidden border-b border-border bg-card">
      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-30 scanlines" />
      
      <div className="container py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-lg bg-destructive flex items-center justify-center glow-destructive">
                <Zap className="w-7 h-7 text-destructive-foreground" />
              </div>
              {isPlaying && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-display tracking-tight text-foreground">
                SOS
              </h1>
              <p className="text-xs text-muted-foreground tracking-widest uppercase">
                Shot On Sight
              </p>
            </div>
          </div>

          {/* Teams */}
          <div className="hidden md:flex items-center gap-6">
            <div className="text-right">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">{TEAMS.home.city}</p>
              <p className="text-lg font-bold text-team-home">{TEAMS.home.name}</p>
            </div>
            <div className="text-2xl font-display text-muted-foreground">VS</div>
            <div className="text-left">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">{TEAMS.away.city}</p>
              <p className="text-lg font-bold text-team-away">{TEAMS.away.name}</p>
            </div>
          </div>

          {/* Timer */}
          <div className="text-right">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Demo Time</p>
            <p className="text-2xl font-mono font-bold tabular-nums text-foreground">
              {formatTime(elapsedTime)} <span className="text-muted-foreground">/ {formatTime(totalDuration)}</span>
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-1 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-team-home to-team-away transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </header>
  );
}
