import { DrinkAssignment } from '@/types/game';
import { cn } from '@/lib/utils';
import { Beer, Wine, Cylinder, Flame } from 'lucide-react';
import sosLogo from '@/assets/sos-logo.png';

interface AlertOverlayProps {
  alert: DrinkAssignment | null;
  onConfirm: () => void;
  queueCount: number;
}

export function AlertOverlay({ alert, onConfirm, queueCount }: AlertOverlayProps) {
  if (!alert) return null;

  const getAlertConfig = () => {
    switch (alert.type) {
      case 'sip':
        return {
          icon: Wine,
          title: 'SIP!',
          gradient: 'from-accent/30 via-accent/10 to-transparent',
          border: 'border-accent',
          iconColor: 'text-accent',
          bgColor: 'bg-accent/10',
          glow: 'shadow-[0_0_60px_hsl(42_100%_50%/0.4)]',
        };
      case 'shot':
        return {
          icon: Beer,
          title: 'SHOT!',
          gradient: 'from-primary/40 via-primary/15 to-transparent',
          border: 'border-primary',
          iconColor: 'text-primary',
          bgColor: 'bg-primary/10',
          glow: 'shadow-[0_0_80px_hsl(0_85%_50%/0.5)]',
        };
      case 'shotgun':
        return {
          icon: Cylinder,
          title: 'SHOTGUN!',
          gradient: 'from-[hsl(25,100%,55%)]/40 via-accent/20 to-transparent',
          border: 'border-accent',
          iconColor: 'text-accent',
          bgColor: 'bg-gradient-fire',
          glow: 'shadow-[0_0_100px_hsl(25_100%_55%/0.6)]',
        };
      default:
        return null;
    }
  };

  const config = getAlertConfig();
  if (!config) return null;

  const Icon = config.icon;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
    >
      {/* Fire particles background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      <div 
        className={cn(
          "relative max-w-lg w-full rounded-2xl border-2 p-8 animate-alert-in",
          "bg-gradient-to-b bg-card",
          config.gradient,
          config.border,
          config.glow
        )}
        onClick={e => e.stopPropagation()}
      >
        {/* Queue indicator */}
        {queueCount > 1 && (
          <div className="absolute top-4 left-4 bg-primary/80 text-white px-3 py-1 rounded-full text-xs font-bold">
            {queueCount - 1} more pending
          </div>
        )}

        {/* Mini logo at top */}
        <div className="flex justify-center mb-2">
          <img src={sosLogo} alt="SOS" className="h-12 w-auto opacity-70" />
        </div>

        {/* Icon with fire effect */}
        <div className="flex justify-center mb-4">
          <div className={cn(
            "relative w-28 h-28 rounded-full flex items-center justify-center",
            "bg-card border-4",
            config.border,
            "animate-pulse-glow"
          )}>
            {/* Fire accent for shotgun */}
            {alert.type === 'shotgun' && (
              <Flame className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 text-[hsl(25,100%,55%)] animate-pulse" />
            )}
            <Icon className={cn("w-14 h-14", config.iconColor)} />
          </div>
        </div>

        {/* Title with dramatic styling */}
        <h2 className={cn(
          "text-6xl md:text-7xl font-display text-center mb-4 tracking-tight",
          config.iconColor,
          "drop-shadow-[0_0_20px_currentColor]"
        )}>
          {config.title}
        </h2>

        {/* Player name with emphasis */}
        <div className="bg-muted/50 rounded-xl p-4 mb-3 border border-border">
          <p className="text-3xl md:text-4xl font-bold text-center text-foreground">
            {alert.playerName}
          </p>
        </div>

        {/* Reason */}
        <p className="text-lg text-center text-muted-foreground uppercase tracking-widest font-medium">
          {alert.reason}
        </p>

        {/* Confirm button */}
        <button
          onClick={onConfirm}
          className={cn(
            "mt-6 w-full py-4 rounded-xl text-lg font-bold uppercase tracking-wider transition-all",
            "bg-primary hover:bg-primary/90 text-primary-foreground",
            "shadow-[0_0_30px_hsl(0_85%_50%/0.3)] hover:shadow-[0_0_40px_hsl(0_85%_50%/0.5)]",
            "active:scale-95"
          )}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
