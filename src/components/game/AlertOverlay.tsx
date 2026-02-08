import { DrinkAssignment } from '@/types/game';
import { cn } from '@/lib/utils';
import { Beer, Wine, Cylinder, X } from 'lucide-react';

interface AlertOverlayProps {
  alert: DrinkAssignment | null;
  onDismiss: () => void;
}

export function AlertOverlay({ alert, onDismiss }: AlertOverlayProps) {
  if (!alert) return null;

  const getAlertConfig = () => {
    switch (alert.type) {
      case 'sip':
        return {
          icon: Wine,
          title: 'SIP!',
          gradient: 'from-drink-sip/20 to-drink-sip/5',
          border: 'border-drink-sip',
          iconColor: 'text-drink-sip',
          glow: 'shadow-[0_0_60px_rgba(34,197,94,0.3)]',
        };
      case 'shot':
        return {
          icon: Beer,
          title: 'SHOT!',
          gradient: 'from-drink-shot/30 to-drink-shot/5',
          border: 'border-drink-shot',
          iconColor: 'text-drink-shot',
          glow: 'shadow-[0_0_80px_rgba(239,68,68,0.4)]',
        };
      case 'shotgun':
        return {
          icon: Cylinder,
          title: 'SHOTGUN!',
          gradient: 'from-drink-shotgun/30 to-drink-shotgun/5',
          border: 'border-drink-shotgun',
          iconColor: 'text-drink-shotgun',
          glow: 'shadow-[0_0_100px_rgba(234,179,8,0.5)]',
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      onClick={onDismiss}
    >
      <div 
        className={cn(
          "relative max-w-lg w-full rounded-2xl border-2 p-8 animate-alert-in",
          "bg-gradient-to-b",
          config.gradient,
          config.border,
          config.glow
        )}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          onClick={onDismiss}
          className="absolute top-4 right-4 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className={cn(
            "w-24 h-24 rounded-full flex items-center justify-center",
            "bg-card border-2",
            config.border,
            "animate-pulse-glow"
          )}>
            <Icon className={cn("w-12 h-12", config.iconColor)} />
          </div>
        </div>

        {/* Title */}
        <h2 className={cn(
          "text-5xl md:text-6xl font-display text-center mb-4",
          config.iconColor,
          "text-shadow-glow"
        )}>
          {config.title}
        </h2>

        {/* Player name */}
        <p className="text-3xl md:text-4xl font-bold text-center text-foreground mb-3">
          {alert.playerName}
        </p>

        {/* Reason */}
        <p className="text-lg text-center text-muted-foreground uppercase tracking-wide">
          {alert.reason}
        </p>
      </div>
    </div>
  );
}
