import { GameBoard, Player, WINNING_PATTERNS, WinPattern } from '@/types/game';

/**
 * Check if there's a winner on the current board
 * @param board - Current game board state
 * @returns Object with winner and winning line info
 */
export function checkWinner(board: GameBoard): { 
  winner: Player; 
  winningLine: number[] | null;
  winPattern: WinPattern | null;
} {
  for (const pattern of WINNING_PATTERNS) {
    const [a, b, c] = pattern.pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return {
        winner: board[a],
        winningLine: pattern.pattern,
        winPattern: pattern
      };
    }
  }
  return { winner: null, winningLine: null, winPattern: null };
}

/**
 * Check if the board is full (tie game)
 * @param board - Current game board state
 * @returns boolean indicating if board is full
 */
export function isBoardFull(board: GameBoard): boolean {
  return board.every(square => square !== null);
}

/**
 * Get all empty squares on the board
 * @param board - Current game board state
 * @returns Array of indices where squares are empty
 */
export function getEmptySquares(board: GameBoard): number[] {
  return board
    .map((square, index) => square === null ? index : -1)
    .filter(index => index !== -1);
}

/**
 * Check if a move would result in a win
 * @param board - Current game board state
 * @param position - Position to check
 * @param player - Player making the move
 * @returns boolean indicating if this move wins
 */
export function isWinningMove(board: GameBoard, position: number, player: Player): boolean {
  if (board[position] !== null || !player) return false;
  
  // Create a copy of the board with the hypothetical move
  const testBoard = [...board];
  testBoard[position] = player;
  
  const { winner } = checkWinner(testBoard);
  return winner === player;
}

/**
 * Get all winning moves for a player
 * @param board - Current game board state
 * @param player - Player to check winning moves for
 * @returns Array of positions that would result in a win
 */
export function getWinningMoves(board: GameBoard, player: Player): number[] {
  if (!player) return [];
  
  return getEmptySquares(board).filter(position => 
    isWinningMove(board, position, player)
  );
}

/**
 * Get all blocking moves (moves that prevent opponent from winning)
 * @param board - Current game board state
 * @param player - Current player
 * @returns Array of positions that would block opponent's win
 */
export function getBlockingMoves(board: GameBoard, player: Player): number[] {
  if (!player) return [];
  
  const opponent: Player = player === 'X' ? 'O' : 'X';
  return getWinningMoves(board, opponent);
}

/**
 * Make a move on the board
 * @param board - Current game board state
 * @param position - Position to make the move
 * @param player - Player making the move
 * @returns New board state with the move made
 */
export function makeMove(board: GameBoard, position: number, player: Player): GameBoard {
  if (board[position] !== null || !player) {
    return board; // Invalid move, return original board
  }
  
  const newBoard = [...board];
  newBoard[position] = player;
  return newBoard;
}

/**
 * Reset the game board to initial state
 * @returns Empty game board
 */
export function resetBoard(): GameBoard {
  return Array(9).fill(null);
}

/**
 * Get the current game status
 * @param board - Current game board state
 * @returns Object with game status information
 */
export function getGameStatus(board: GameBoard) {
  const { winner, winningLine, winPattern } = checkWinner(board);
  
  if (winner) {
    return {
      status: 'won' as const,
      winner,
      winningLine,
      winPattern,
      isGameOver: true
    };
  }
  
  if (isBoardFull(board)) {
    return {
      status: 'tie' as const,
      winner: null,
      winningLine: null,
      winPattern: null,
      isGameOver: true
    };
  }
  
  return {
    status: 'playing' as const,
    winner: null,
    winningLine: null,
    winPattern: null,
    isGameOver: false
  };
}