import { useGameEngine } from '@/hooks/useGameEngine';
import { HeaderBar } from '@/components/game/HeaderBar';
import { WinProbCard } from '@/components/game/WinProbCard';
import { AlertOverlay } from '@/components/game/AlertOverlay';
import { PlayerPanel } from '@/components/game/PlayerPanel';
import { Leaderboard } from '@/components/game/Leaderboard';
import { ControlPanel } from '@/components/game/ControlPanel';
import { PlayFeed } from '@/components/game/PlayFeed';
import { TEAMS, TOTAL_DURATION } from '@/data/demoGame';
import { AlertTriangle } from 'lucide-react';

const Index = () => {
  const {
    gameState,
    currentFrameData,
    winProbDelta,
    isLoading,
    addPlayer,
    removePlayer,
    startGame,
    pauseGame,
    resumeGame,
    resetGame,
    skipFrame,
    confirmCurrentAlert,
  } = useGameEngine();

  const isGameOver = gameState.currentFrame >= gameState.frames.length - 1 && !gameState.isPlaying;

  // Show loading state while fetching data
  if (isLoading || !currentFrameData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-xl font-display text-foreground">Loading Super Bowl 2025 Data...</h2>
          <p className="text-muted-foreground mt-2">Fetching real-time play data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Alert Overlay */}
      <AlertOverlay 
        alert={gameState.currentAlert} 
        onConfirm={confirmCurrentAlert}
        queueCount={gameState.alertQueue.length}
      />

      {/* Header */}
      <HeaderBar 
        elapsedTime={gameState.elapsedTime}
        totalDuration={TOTAL_DURATION}
        isPlaying={gameState.isPlaying}
      />

      {/* Main Content */}
      <main className="container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Main Game Info */}
          <div className="lg:col-span-8 space-y-6">
            {/* Win Probability */}
            <WinProbCard
              winProb={currentFrameData.win_prob}
              delta={winProbDelta}
              homeScore={currentFrameData.home}
              awayScore={currentFrameData.away}
              quarter={currentFrameData.quarter}
              clock={currentFrameData.clock}
              homeName={TEAMS.home.name}
              awayName={TEAMS.away.name}
            />

            {/* Play Feed */}
            <PlayFeed 
              currentFrame={currentFrameData}
              description={currentFrameData.description}
            />

            {/* Controls */}
            <ControlPanel
              isPlaying={gameState.isPlaying}
              isPaused={gameState.isPaused}
              canStart={gameState.players.length > 0}
              onStart={startGame}
              onPause={pauseGame}
              onResume={resumeGame}
              onReset={resetGame}
              onSkip={skipFrame}
            />

            {/* Game Over Summary */}
            {isGameOver && (
              <div className="rounded-xl border-2 border-primary bg-primary/10 p-6 text-center glow-primary">
                <h2 className="text-3xl font-display text-primary mb-2">
                  GAME OVER!
                </h2>
                <p className="text-xl font-bold text-foreground mb-1">
                  {TEAMS.home.name} {currentFrameData.home} - {currentFrameData.away} {TEAMS.away.name}
                </p>
                <p className="text-muted-foreground">
                  {currentFrameData.home > currentFrameData.away 
                    ? `${TEAMS.home.city} ${TEAMS.home.name} win!`
                    : `${TEAMS.away.city} ${TEAMS.away.name} win!`
                  }
                </p>
              </div>
            )}
          </div>

          {/* Right Column - Players & Leaderboard */}
          <div className="lg:col-span-4 space-y-6">
            {/* Player Panel */}
            <PlayerPanel
              players={gameState.players}
              onAddPlayer={addPlayer}
              onRemovePlayer={removePlayer}
              disabled={gameState.isPlaying}
            />

            {/* Leaderboard */}
            <Leaderboard 
              players={gameState.players}
              isGameOver={isGameOver}
            />
          </div>
        </div>

        {/* Footer Disclaimer */}
        <footer className="mt-12 py-6 border-t border-border">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <AlertTriangle className="w-4 h-4" />
            <span>Drink responsibly. Non-alcoholic options supported. 21+ only.</span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
