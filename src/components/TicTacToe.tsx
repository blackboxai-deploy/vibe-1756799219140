'use client';

import { useState, useEffect, useCallback } from 'react';
import { GameState, GameScore, INITIAL_BOARD, INITIAL_SCORE } from '@/types/game';
import { makeMove, getGameStatus, resetBoard } from '@/lib/gameLogic';
import { getAIMoveWithDelay, AIDifficulty } from '@/lib/aiPlayer';
import { GameBoard } from './GameBoard';
import { GameStatus } from './GameStatus';
import { ScoreBoard } from './ScoreBoard';
import { GameControls } from './GameControls';

export function TicTacToe() {
  const [gameState, setGameState] = useState<GameState>({
    board: INITIAL_BOARD,
    currentPlayer: 'X',
    winner: null,
    status: 'playing',
    winningLine: null,
  });
  
  const [score, setScore] = useState<GameScore>(INITIAL_SCORE);
  const [difficulty, setDifficulty] = useState<AIDifficulty>('hard');
  const [isComputerThinking, setIsComputerThinking] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  
  // Update game status when board changes
  useEffect(() => {
    const status = getGameStatus(gameState.board);
    setGameState(prev => ({
      ...prev,
      status: status.status,
      winner: status.winner,
      winningLine: status.winningLine,
    }));
    
    // Update score when game ends
    if (status.isGameOver && gameStarted) {
      setScore(prev => {
        if (status.winner === 'X') {
          return { ...prev, playerWins: prev.playerWins + 1 };
        } else if (status.winner === 'O') {
          return { ...prev, computerWins: prev.computerWins + 1 };
        } else {
          return { ...prev, ties: prev.ties + 1 };
        }
      });
    }
  }, [gameState.board, gameStarted]);
  
  // Handle computer move
  useEffect(() => {
    const makeComputerMove = async () => {
      if (
        gameState.currentPlayer === 'O' && 
        gameState.status === 'playing' &&
        !isComputerThinking &&
        gameStarted
      ) {
        setIsComputerThinking(true);
        
        try {
          const computerMove = await getAIMoveWithDelay(
            gameState.board, 
            difficulty, 
            Math.random() * 500 + 500 // Random delay between 500-1000ms for realism
          );
          
          if (computerMove !== -1) {
            const newBoard = makeMove(gameState.board, computerMove, 'O');
            setGameState(prev => ({
              ...prev,
              board: newBoard,
              currentPlayer: 'X',
            }));
          }
        } catch (error) {
          console.error('Error making computer move:', error);
        } finally {
          setIsComputerThinking(false);
        }
      }
    };
    
    makeComputerMove();
  }, [gameState.currentPlayer, gameState.status, gameState.board, difficulty, isComputerThinking, gameStarted]);
  
  // Handle player move
  const handleSquareClick = useCallback((index: number) => {
    if (
      gameState.board[index] !== null || 
      gameState.status !== 'playing' || 
      gameState.currentPlayer !== 'X' ||
      isComputerThinking
    ) {
      return;
    }
    
    if (!gameStarted) {
      setGameStarted(true);
    }
    
    const newBoard = makeMove(gameState.board, index, 'X');
    setGameState(prev => ({
      ...prev,
      board: newBoard,
      currentPlayer: 'O',
    }));
  }, [gameState.board, gameState.status, gameState.currentPlayer, isComputerThinking, gameStarted]);
  
  // Start new game
  const handleNewGame = useCallback(() => {
    setGameState({
      board: resetBoard(),
      currentPlayer: 'X',
      winner: null,
      status: 'playing',
      winningLine: null,
    });
    setIsComputerThinking(false);
    setGameStarted(false);
  }, []);
  
  // Reset score
  const handleResetScore = useCallback(() => {
    setScore(INITIAL_SCORE);
  }, []);
  
  // Change difficulty
  const handleDifficultyChange = useCallback((newDifficulty: AIDifficulty) => {
    if (gameState.status === 'playing' && gameStarted) {
      return; // Don't allow difficulty change during active game
    }
    setDifficulty(newDifficulty);
  }, [gameState.status, gameStarted]);
  
  const isGameInProgress = gameState.status === 'playing' && gameStarted;
  const isBoardDisabled = gameState.status !== 'playing' || 
    gameState.currentPlayer !== 'X' || 
    isComputerThinking;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            🎮 Tic-Tac-Toe
          </h1>
          <p className="text-slate-600">
            Challenge the computer and test your strategy skills!
          </p>
        </div>
        
        {/* Game Layout */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Score Board */}
          <div className="order-2 lg:order-1">
            <ScoreBoard score={score} />
          </div>
          
          {/* Main Game Area */}
          <div className="order-1 lg:order-2 space-y-6">
            {/* Game Status */}
            <GameStatus
              currentPlayer={gameState.currentPlayer}
              winner={gameState.winner}
              status={gameState.status}
              isComputerThinking={isComputerThinking}
            />
            
            {/* Game Board */}
            <GameBoard
              board={gameState.board}
              onSquareClick={handleSquareClick}
              disabled={isBoardDisabled}
              winningLine={gameState.winningLine}
            />
          </div>
          
          {/* Game Controls */}
          <div className="order-3">
            <GameControls
              onNewGame={handleNewGame}
              onResetScore={handleResetScore}
              difficulty={difficulty}
              onDifficultyChange={handleDifficultyChange}
              isGameInProgress={isGameInProgress}
            />
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center mt-12 text-sm text-slate-500">
          <p>Built with React, TypeScript, and Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
}