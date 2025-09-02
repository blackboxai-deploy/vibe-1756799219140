'use client';

import { GameScore } from '@/types/game';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ScoreBoardProps {
  score: GameScore;
  className?: string;
}

export function ScoreBoard({ score, className }: ScoreBoardProps) {
  const totalGames = score.playerWins + score.computerWins + score.ties;
  
  const getWinRate = () => {
    if (totalGames === 0) return 0;
    return Math.round((score.playerWins / totalGames) * 100);
  };
  
  return (
    <Card className={cn("w-full max-w-md mx-auto", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-center text-lg font-bold text-slate-800">
          Score Board
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Score Grid */}
        <div className="grid grid-cols-3 gap-3">
          {/* Player Wins */}
          <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-600">
              {score.playerWins}
            </div>
            <div className="text-xs font-medium text-green-700 mt-1">
              Your Wins
            </div>
            <div className="text-lg mt-1">🏆</div>
          </div>
          
          {/* Ties */}
          <div className="text-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="text-2xl font-bold text-yellow-600">
              {score.ties}
            </div>
            <div className="text-xs font-medium text-yellow-700 mt-1">
              Ties
            </div>
            <div className="text-lg mt-1">🤝</div>
          </div>
          
          {/* Computer Wins */}
          <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
            <div className="text-2xl font-bold text-red-600">
              {score.computerWins}
            </div>
            <div className="text-xs font-medium text-red-700 mt-1">
              Computer Wins
            </div>
            <div className="text-lg mt-1">🤖</div>
          </div>
        </div>
        
        {/* Statistics */}
        {totalGames > 0 && (
          <div className="pt-3 border-t border-slate-200 space-y-3">
            {/* Total Games */}
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">
                Total Games
              </span>
              <span className="text-sm font-bold text-slate-800">
                {totalGames}
              </span>
            </div>
            
            {/* Win Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">
                  Your Win Rate
                </span>
                <span className="text-sm font-bold text-slate-800">
                  {getWinRate()}%
                </span>
              </div>
              
              {/* Win Rate Progress Bar */}
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className={cn(
                    "h-2 rounded-full transition-all duration-500",
                    getWinRate() >= 70 ? "bg-green-500" :
                    getWinRate() >= 40 ? "bg-yellow-500" :
                    "bg-red-500"
                  )}
                  style={{ width: `${getWinRate()}%` }}
                />
              </div>
            </div>
            
            {/* Performance Message */}
            <div className="text-center p-2 rounded-md bg-slate-50">
              <div className="text-xs font-medium text-slate-600">
                {getWinRate() >= 70 && "🌟 Excellent performance!"}
                {getWinRate() >= 50 && getWinRate() < 70 && "👍 Good job!"}
                {getWinRate() >= 30 && getWinRate() < 50 && "💪 Keep practicing!"}
                {getWinRate() < 30 && totalGames >= 3 && "🎯 Try different strategies!"}
                {getWinRate() < 30 && totalGames < 3 && "🚀 Just getting started!"}
              </div>
            </div>
          </div>
        )}
        
        {/* No games played message */}
        {totalGames === 0 && (
          <div className="text-center p-4 bg-slate-50 rounded-lg">
            <div className="text-2xl mb-2">🎮</div>
            <div className="text-sm font-medium text-slate-600">
              Start playing to see your statistics!
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}