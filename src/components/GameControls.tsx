'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AIDifficulty } from '@/lib/aiPlayer';
import { cn } from '@/lib/utils';

interface GameControlsProps {
  onNewGame: () => void;
  onResetScore: () => void;
  difficulty: AIDifficulty;
  onDifficultyChange: (difficulty: AIDifficulty) => void;
  isGameInProgress: boolean;
  className?: string;
}

export function GameControls({ 
  onNewGame, 
  onResetScore, 
  difficulty, 
  onDifficultyChange, 
  isGameInProgress,
  className 
}: GameControlsProps) {
  const difficulties: { value: AIDifficulty; label: string; description: string; emoji: string }[] = [
    { 
      value: 'easy', 
      label: 'Easy', 
      description: 'Computer makes random moves', 
      emoji: '😊' 
    },
    { 
      value: 'medium', 
      label: 'Medium', 
      description: 'Computer uses basic strategy', 
      emoji: '🤔' 
    },
    { 
      value: 'hard', 
      label: 'Hard', 
      description: 'Computer plays optimally', 
      emoji: '🤖' 
    },
  ];
  
  return (
    <Card className={cn("w-full max-w-md mx-auto", className)}>
      <CardContent className="p-4 space-y-4">
        {/* Game Controls */}
        <div className="space-y-3">
          <h3 className="font-semibold text-slate-800 text-center">
            Game Controls
          </h3>
          
          <div className="flex gap-2">
            <Button
              onClick={onNewGame}
              variant="default"
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {isGameInProgress ? '🔄 New Game' : '🎮 Start Game'}
            </Button>
            
            <Button
              onClick={onResetScore}
              variant="outline"
              className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
            >
              🗑️ Reset Score
            </Button>
          </div>
        </div>
        
        {/* Difficulty Selection */}
        <div className="space-y-3">
          <h3 className="font-semibold text-slate-800 text-center">
            Difficulty Level
          </h3>
          
          <div className="grid grid-cols-1 gap-2">
            {difficulties.map(({ value, label, description, emoji }) => (
              <button
                key={value}
                onClick={() => onDifficultyChange(value)}
                disabled={isGameInProgress}
                className={cn(
                  "p-3 rounded-lg border transition-all duration-200 text-left",
                  "hover:shadow-md hover:scale-[1.02]",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "disabled:hover:scale-100 disabled:hover:shadow-none",
                  difficulty === value
                    ? "bg-blue-50 border-blue-300 ring-2 ring-blue-200 shadow-sm"
                    : "bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{emoji}</span>
                    <div>
                      <div className={cn(
                        "font-medium text-sm",
                        difficulty === value ? "text-blue-700" : "text-slate-700"
                      )}>
                        {label}
                      </div>
                      <div className={cn(
                        "text-xs",
                        difficulty === value ? "text-blue-600" : "text-slate-500"
                      )}>
                        {description}
                      </div>
                    </div>
                  </div>
                  
                  {difficulty === value && (
                    <div className="text-blue-600">
                      ✓
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
          
          {isGameInProgress && (
            <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded-md text-center">
              ⚠️ Start a new game to change difficulty
            </div>
          )}
        </div>
        
        {/* Game Tips */}
        <div className="pt-3 border-t border-slate-200">
          <h4 className="font-medium text-slate-700 text-sm mb-2">
            💡 Pro Tips:
          </h4>
          <ul className="text-xs text-slate-600 space-y-1">
            <li>• Try to get the center square first</li>
            <li>• Block your opponent when they have two in a row</li>
            <li>• Corners are better than edges</li>
            <li>• Look for opportunities to create multiple winning threats</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}