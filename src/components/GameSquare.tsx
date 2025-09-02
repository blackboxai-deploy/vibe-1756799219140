'use client';

import { Player } from '@/types/game';
import { cn } from '@/lib/utils';

interface GameSquareProps {
  value: Player;
  onClick: () => void;
  disabled: boolean;
  isWinning: boolean;
  index: number;
}

export function GameSquare({ 
  value, 
  onClick, 
  disabled, 
  isWinning, 
  index 
}: GameSquareProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || value !== null}
      className={cn(
        // Base styles
        "relative w-full aspect-square border-2 border-slate-300 bg-white",
        "flex items-center justify-center text-4xl font-bold",
        "transition-all duration-200 ease-in-out",
        
        // Hover states
        "hover:bg-slate-50 hover:border-slate-400",
        "hover:shadow-md hover:scale-[1.02]",
        
        // Disabled state
        "disabled:cursor-not-allowed disabled:hover:bg-white",
        "disabled:hover:border-slate-300 disabled:hover:shadow-none",
        "disabled:hover:scale-100",
        
        // Focus states for accessibility
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        
        // Winning square highlight
        isWinning && "bg-green-100 border-green-400 shadow-lg",
        
        // Grid positioning borders
        // Top row
        index === 0 && "rounded-tl-lg border-t-4 border-l-4",
        index === 1 && "border-t-4 border-l-0 border-r-0",
        index === 2 && "rounded-tr-lg border-t-4 border-r-4",
        
        // Middle row
        index === 3 && "border-l-4 border-t-0 border-b-0",
        index === 4 && "border-0",
        index === 5 && "border-r-4 border-t-0 border-b-0",
        
        // Bottom row
        index === 6 && "rounded-bl-lg border-b-4 border-l-4",
        index === 7 && "border-b-4 border-l-0 border-r-0",
        index === 8 && "rounded-br-lg border-b-4 border-r-4",
      )}
    >
      {/* Player symbol with animation */}
      {value && (
        <span
          className={cn(
            "animate-in fade-in-0 zoom-in-50 duration-300",
            value === 'X' 
              ? "text-blue-600 drop-shadow-sm" 
              : "text-red-600 drop-shadow-sm",
            isWinning && "animate-pulse"
          )}
        >
          {value}
        </span>
      )}
      
      {/* Hover preview for empty squares */}
      {!value && !disabled && (
        <span className="absolute inset-0 flex items-center justify-center text-4xl font-bold opacity-0 hover:opacity-20 transition-opacity duration-200 text-blue-600 pointer-events-none">
          X
        </span>
      )}
      
      {/* Winning line overlay */}
      {isWinning && (
        <div className="absolute inset-0 bg-green-200/50 animate-pulse rounded-md pointer-events-none" />
      )}
    </button>
  );
}