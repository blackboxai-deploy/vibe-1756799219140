// Game types and interfaces for Tic-tac-toe

export type Player = 'X' | 'O' | null;

export type GameBoard = Player[];

export type GameStatus = 'playing' | 'won' | 'tie';

export interface GameState {
  board: GameBoard;
  currentPlayer: 'X' | 'O';
  winner: Player;
  status: GameStatus;
  winningLine: number[] | null;
}

export interface GameScore {
  playerWins: number;
  computerWins: number;
  ties: number;
}

export interface WinPattern {
  pattern: number[];
  name: string;
}

// Game configuration constants
export const WINNING_PATTERNS: WinPattern[] = [
  // Rows
  { pattern: [0, 1, 2], name: 'top-row' },
  { pattern: [3, 4, 5], name: 'middle-row' },
  { pattern: [6, 7, 8], name: 'bottom-row' },
  // Columns
  { pattern: [0, 3, 6], name: 'left-column' },
  { pattern: [1, 4, 7], name: 'middle-column' },
  { pattern: [2, 5, 8], name: 'right-column' },
  // Diagonals
  { pattern: [0, 4, 8], name: 'diagonal-1' },
  { pattern: [2, 4, 6], name: 'diagonal-2' },
];

export const INITIAL_BOARD: GameBoard = Array(9).fill(null);

export const INITIAL_SCORE: GameScore = {
  playerWins: 0,
  computerWins: 0,
  ties: 0,
};