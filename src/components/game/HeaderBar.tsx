import { TEAMS } from '@/data/demoGame';
import sosLogo from '@/assets/sos-logo.png';

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
    <header className="relative overflow-hidden border-b border-border bg-gradient-hero">
      {/* Subtle fire glow background */}
      <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-primary/20 via-transparent to-accent/20" />
      
      <div className="container py-3 relative">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src={sosLogo} 
                alt="SOS: Shot On Sight" 
                className="h-16 w-auto object-contain drop-shadow-lg"
              />
              {isPlaying && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse glow-accent" />
              )}
            </div>
          </div>

          {/* Teams - Mobile hidden */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-3">
              <img 
                src={TEAMS.home.logo} 
                alt={TEAMS.home.name} 
                className="w-12 h-12 object-contain"
              />
              <div className="text-right">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">{TEAMS.home.city}</p>
                <p className="text-lg font-bold text-team-home">{TEAMS.home.name}</p>
              </div>
            </div>
            <div className="px-4 py-2 bg-primary/20 rounded-lg border border-primary/30">
              <span className="text-xl font-display text-primary">VS</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-left">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">{TEAMS.away.city}</p>
                <p className="text-lg font-bold text-team-away">{TEAMS.away.name}</p>
              </div>
              <img 
                src={TEAMS.away.logo} 
                alt={TEAMS.away.name} 
                className="w-12 h-12 object-contain"
              />
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

        {/* Progress bar with fire gradient */}
        <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-fire transition-all duration-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </header>
  );
}
