'use client';

import { Player, GameStatus as GameStatusType } from '@/types/game';
import { cn } from '@/lib/utils';

interface GameStatusProps {
  currentPlayer: 'X' | 'O';
  winner: Player;
  status: GameStatusType;
  isComputerThinking: boolean;
  className?: string;
}

export function GameStatus({ 
  currentPlayer, 
  winner, 
  status, 
  isComputerThinking,
  className 
}: GameStatusProps) {
  const getStatusMessage = () => {
    if (status === 'won' && winner) {
      if (winner === 'X') {
        return {
          message: "🎉 You Win!",
          subMessage: "Congratulations on your victory!",
          className: "text-green-600 animate-bounce"
        };
      } else {
        return {
          message: "😔 Computer Wins!",
          subMessage: "Better luck next time!",
          className: "text-red-600"
        };
      }
    }
    
    if (status === 'tie') {
      return {
        message: "🤝 It's a Tie!",
        subMessage: "Great game, well played!",
        className: "text-yellow-600"
      };
    }
    
    if (isComputerThinking && currentPlayer === 'O') {
      return {
        message: "🤖 Computer is thinking...",
        subMessage: "Please wait for the computer's move",
        className: "text-blue-600 animate-pulse"
      };
    }
    
    // Game is still playing
    if (currentPlayer === 'X') {
      return {
        message: "🎮 Your Turn",
        subMessage: "Click on any empty square to make your move",
        className: "text-blue-600"
      };
    } else {
      return {
        message: "⏳ Computer's Turn",
        subMessage: "The computer is making its move",
        className: "text-orange-600"
      };
    }
  };
  
  const { message, subMessage, className: statusClassName } = getStatusMessage();
  
  return (
    <div className={cn("text-center space-y-2", className)}>
      <div className={cn("text-2xl font-bold transition-all duration-300", statusClassName)}>
        {message}
      </div>
      
      <div className="text-sm text-slate-600 font-medium">
        {subMessage}
      </div>
      
      {/* Current player indicator when game is playing */}
      {status === 'playing' && (
        <div className="flex items-center justify-center gap-4 mt-4 p-3 bg-slate-100 rounded-lg">
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg",
              currentPlayer === 'X' 
                ? "bg-blue-100 text-blue-600 ring-2 ring-blue-300" 
                : "bg-slate-200 text-slate-500"
            )}>
              X
            </div>
            <span className={cn(
              "text-sm font-medium",
              currentPlayer === 'X' ? "text-blue-600" : "text-slate-500"
            )}>
              You
            </span>
          </div>
          
          <div className="text-slate-400">vs</div>
          
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg",
              currentPlayer === 'O' 
                ? "bg-red-100 text-red-600 ring-2 ring-red-300" 
                : "bg-slate-200 text-slate-500"
            )}>
              O
            </div>
            <span className={cn(
              "text-sm font-medium",
              currentPlayer === 'O' ? "text-red-600" : "text-slate-500"
            )}>
              Computer
              {isComputerThinking && currentPlayer === 'O' && (
                <span className="inline-block ml-1 animate-spin">⚙️</span>
              )}
            </span>
          </div>
        </div>
      )}
      
      {/* Game over animation */}
      {status !== 'playing' && (
        <div className="animate-in fade-in-0 zoom-in-95 duration-500">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md border">
            <span className="text-2xl">
              {status === 'won' && winner === 'X' && "🏆"}
              {status === 'won' && winner === 'O' && "🤖"}
              {status === 'tie' && "🤝"}
            </span>
            <span className="font-medium text-slate-700">
              Game Over
            </span>
          </div>
        </div>
      )}
    </div>
  );
}