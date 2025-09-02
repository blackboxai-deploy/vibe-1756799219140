'use client';

import { GameBoard as GameBoardType } from '@/types/game';
import { GameSquare } from './GameSquare';
import { cn } from '@/lib/utils';

interface GameBoardProps {
  board: GameBoardType;
  onSquareClick: (index: number) => void;
  disabled: boolean;
  winningLine: number[] | null;
  className?: string;
}

export function GameBoard({ 
  board, 
  onSquareClick, 
  disabled, 
  winningLine,
  className 
}: GameBoardProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-3 gap-0 w-full max-w-md mx-auto",
        "bg-slate-200 p-4 rounded-xl shadow-lg",
        "transition-all duration-300 ease-in-out",
        disabled && "opacity-75",
        className
      )}
    >
      {board.map((square, index) => (
        <GameSquare
          key={index}
          value={square}
          onClick={() => onSquareClick(index)}
          disabled={disabled}
          isWinning={winningLine?.includes(index) || false}
          index={index}
        />
      ))}
      
      {/* Winning line animation overlay */}
      {winningLine && (
        <div className="absolute inset-0 pointer-events-none">
          <WinningLineOverlay winningLine={winningLine} />
        </div>
      )}
    </div>
  );
}

interface WinningLineOverlayProps {
  winningLine: number[];
}

function WinningLineOverlay({ winningLine }: WinningLineOverlayProps) {
  // Map winning patterns to line styles
  const getLineStyle = (pattern: number[]) => {
    const [first, , third] = pattern;
    
    // Horizontal lines
    if (pattern[0] === 0 && pattern[2] === 2) return "top-[12.5%] left-[12.5%] w-3/4 h-1 bg-green-500"; // Top row
    if (pattern[0] === 3 && pattern[2] === 5) return "top-[50%] left-[12.5%] w-3/4 h-1 bg-green-500"; // Middle row
    if (pattern[0] === 6 && pattern[2] === 8) return "top-[87.5%] left-[12.5%] w-3/4 h-1 bg-green-500"; // Bottom row
    
    // Vertical lines  
    if (pattern[0] === 0 && pattern[2] === 6) return "left-[12.5%] top-[12.5%] w-1 h-3/4 bg-green-500"; // Left column
    if (pattern[0] === 1 && pattern[2] === 7) return "left-[50%] top-[12.5%] w-1 h-3/4 bg-green-500"; // Middle column
    if (pattern[0] === 2 && pattern[2] === 8) return "left-[87.5%] top-[12.5%] w-1 h-3/4 bg-green-500"; // Right column
    
    // Diagonal lines
    if (first === 0 && third === 8) return "top-[12.5%] left-[12.5%] w-3/4 h-1 bg-green-500 origin-left rotate-45 scale-x-[1.414]"; // Top-left to bottom-right
    if (first === 2 && third === 6) return "top-[12.5%] right-[12.5%] w-3/4 h-1 bg-green-500 origin-right -rotate-45 scale-x-[1.414]"; // Top-right to bottom-left
    
    return "";
  };
  
  return (
    <div className="relative w-full h-full">
      <div
        className={cn(
          "absolute rounded-full animate-in fade-in-0 duration-500",
          getLineStyle(winningLine)
        )}
      />
    </div>
  );
}