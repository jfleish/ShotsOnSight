import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, SkipForward, Flame } from 'lucide-react';

interface ControlPanelProps {
  isPlaying: boolean;
  isPaused: boolean;
  canStart: boolean;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
  onSkip: () => void;
}

export function ControlPanel({
  isPlaying,
  isPaused,
  canStart,
  onStart,
  onPause,
  onResume,
  onReset,
  onSkip,
}: ControlPanelProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-center gap-3">
        {!isPlaying ? (
          <Button
            size="lg"
            onClick={onStart}
            disabled={!canStart}
            className={cn(
              "min-w-[160px] text-lg font-bold gap-2",
              "bg-primary hover:bg-primary/90 text-primary-foreground",
              "glow-primary transition-all",
              !canStart && "opacity-50"
            )}
          >
            <Flame className="w-5 h-5" />
            START GAME
          </Button>
        ) : isPaused ? (
          <Button
            size="lg"
            onClick={onResume}
            className="min-w-[140px] text-lg font-bold bg-primary hover:bg-primary/90"
          >
            <Play className="w-5 h-5 mr-2" />
            RESUME
          </Button>
        ) : (
          <Button
            size="lg"
            variant="secondary"
            onClick={onPause}
            className="min-w-[140px] text-lg font-bold"
          >
            <Pause className="w-5 h-5 mr-2" />
            PAUSE
          </Button>
        )}

        <Button
          size="lg"
          variant="outline"
          onClick={onReset}
          className="border-border hover:bg-muted"
        >
          <RotateCcw className="w-5 h-5" />
        </Button>

        {isPlaying && !isPaused && (
          <Button
            size="lg"
            variant="outline"
            onClick={onSkip}
            className="border-border hover:bg-muted"
          >
            <SkipForward className="w-5 h-5" />
          </Button>
        )}
      </div>

      {!canStart && !isPlaying && (
        <p className="text-center text-sm text-muted-foreground mt-3">
          Add at least one player to start
        </p>
      )}
    </div>
  );
}
