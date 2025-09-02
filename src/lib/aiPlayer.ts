import { GameBoard, Player } from '@/types/game';
import { getEmptySquares, getWinningMoves, getBlockingMoves } from './gameLogic';

/**
 * AI difficulty levels
 */
export type AIDifficulty = 'easy' | 'medium' | 'hard';

/**
 * Strategic positions on the board (in order of preference)
 */
const STRATEGIC_POSITIONS = {
  center: [4],
  corners: [0, 2, 6, 8],
  edges: [1, 3, 5, 7],
};

/**
 * Get a random move from available positions
 * @param board - Current game board state
 * @returns Random available position or -1 if no moves available
 */
function getRandomMove(board: GameBoard): number {
  const emptySquares = getEmptySquares(board);
  if (emptySquares.length === 0) return -1;
  
  const randomIndex = Math.floor(Math.random() * emptySquares.length);
  return emptySquares[randomIndex];
}

/**
 * Get the best strategic move (center > corners > edges)
 * @param board - Current game board state
 * @returns Best strategic position or -1 if none available
 */
function getStrategicMove(board: GameBoard): number {
  const emptySquares = getEmptySquares(board);
  
  // Prefer center if available
  const centerMove = STRATEGIC_POSITIONS.center.find(pos => 
    emptySquares.includes(pos)
  );
  if (centerMove !== undefined) return centerMove;
  
  // Then corners
  const cornerMove = STRATEGIC_POSITIONS.corners.find(pos => 
    emptySquares.includes(pos)
  );
  if (cornerMove !== undefined) return cornerMove;
  
  // Finally edges
  const edgeMove = STRATEGIC_POSITIONS.edges.find(pos => 
    emptySquares.includes(pos)
  );
  if (edgeMove !== undefined) return edgeMove;
  
  return -1;
}

/**
 * Get the best move for the AI player based on difficulty
 * @param board - Current game board state
 * @param difficulty - AI difficulty level
 * @returns Best move position or -1 if no moves available
 */
export function getAIMove(
  board: GameBoard, 
  difficulty: AIDifficulty = 'hard'
): number {
  const emptySquares = getEmptySquares(board);
  
  // No moves available
  if (emptySquares.length === 0) return -1;
  
  const aiPlayer: Player = 'O';
  
  // Easy difficulty - mostly random with some basic strategy
  if (difficulty === 'easy') {
    // 70% random, 30% strategic
    if (Math.random() < 0.7) {
      return getRandomMove(board);
    }
    return getStrategicMove(board) || getRandomMove(board);
  }
  
  // Medium difficulty - balanced strategy
  if (difficulty === 'medium') {
    // 1. Try to win
    const winningMoves = getWinningMoves(board, aiPlayer);
    if (winningMoves.length > 0) {
      return winningMoves[0];
    }
    
    // 2. Block player from winning (80% chance)
    if (Math.random() < 0.8) {
      const blockingMoves = getBlockingMoves(board, aiPlayer);
      if (blockingMoves.length > 0) {
        return blockingMoves[0];
      }
    }
    
    // 3. Strategic move or random
    return getStrategicMove(board) || getRandomMove(board);
  }
  
  // Hard difficulty - optimal strategy
  // 1. Win if possible
  const winningMoves = getWinningMoves(board, aiPlayer);
  if (winningMoves.length > 0) {
    return winningMoves[0];
  }
  
  // 2. Block human player from winning
  const blockingMoves = getBlockingMoves(board, aiPlayer);
  if (blockingMoves.length > 0) {
    return blockingMoves[0];
  }
  
  // 3. Strategic positioning
  const strategicMove = getStrategicMove(board);
  if (strategicMove !== -1) {
    return strategicMove;
  }
  
  // 4. Fallback to random move
  return getRandomMove(board);
}

/**
 * Get AI move with a slight delay for better UX
 * @param board - Current game board state
 * @param difficulty - AI difficulty level
 * @param delay - Delay in milliseconds (default: 500ms)
 * @returns Promise that resolves to the AI's move
 */
export function getAIMoveWithDelay(
  board: GameBoard, 
  difficulty: AIDifficulty = 'hard',
  delay: number = 500
): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const move = getAIMove(board, difficulty);
      resolve(move);
    }, delay);
  });
}

/**
 * Evaluate the current board position for the AI
 * @param board - Current game board state
 * @param aiPlayer - AI player symbol
 * @returns Evaluation score (positive is good for AI, negative is good for opponent)
 */
export function evaluatePosition(board: GameBoard, aiPlayer: Player): number {
  if (!aiPlayer) return 0;
  
  const opponent: Player = aiPlayer === 'X' ? 'O' : 'X';
  
  // Check for immediate wins/losses
  const aiWinningMoves = getWinningMoves(board, aiPlayer);
  const opponentWinningMoves = getWinningMoves(board, opponent);
  
  if (aiWinningMoves.length > 0) return 10; // AI can win
  if (opponentWinningMoves.length > 0) return -10; // Opponent can win
  
  let score = 0;
  
  // Prefer center
  if (board[4] === aiPlayer) score += 3;
  else if (board[4] === opponent) score -= 3;
  
  // Prefer corners
  STRATEGIC_POSITIONS.corners.forEach(pos => {
    if (board[pos] === aiPlayer) score += 2;
    else if (board[pos] === opponent) score -= 2;
  });
  
  return score;
}