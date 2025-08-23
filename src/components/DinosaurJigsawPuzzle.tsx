import React, { useState, useEffect } from 'react';
import './DinosaurJigsawPuzzle.css';
import jigsawImage from '../assets/images/jigsaw/1.jpeg';

const DinosaurJigsawPuzzle: React.FC = () => {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'finished'>('start');
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [puzzleSlots, setPuzzleSlots] = useState<number[]>([0, 1, 2, 3]); // Start with pieces in correct order

  // Simple 2x2 grid positions
  const positions = [0, 1, 2, 3]; // top-left, top-right, bottom-left, bottom-right

  const initializePuzzle = () => {
    setMoves(0);
    setTime(0);
    setIsTimerRunning(true);
    setGameState('playing');
    // Shuffle the puzzle pieces
    const shuffled = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
    setPuzzleSlots(shuffled);
    setSelectedSlot(null);
    
    // Debug: Check if image is loading
    console.log('Jigsaw image path:', jigsawImage);
  };

  const getPieceStyle = (position: number) => {
    // Calculate which part of the image this piece should show
    const row = Math.floor(position / 2); // 0 or 1
    const col = position % 2; // 0 or 1
    
    const style = {
      backgroundImage: `url(${jigsawImage})`,
      backgroundSize: '200% 200%', // Make image 2x larger
      backgroundPosition: `${-col * 100}% ${-row * 100}%`, // Position the background with negative values
      backgroundRepeat: 'no-repeat'
    };
    
    console.log(`Piece ${position}:`, style);
    return style;
  };

  const handleSlotClick = (slotIndex: number) => {
    if (selectedSlot === null) {
      // First click - select this slot
      setSelectedSlot(slotIndex);
    } else if (selectedSlot === slotIndex) {
      // Click same slot - deselect
      setSelectedSlot(null);
    } else {
      // Second click - swap pieces
      const newSlots = [...puzzleSlots];
      const temp = newSlots[selectedSlot];
      newSlots[selectedSlot] = newSlots[slotIndex];
      newSlots[slotIndex] = temp;
      
      setPuzzleSlots(newSlots);
      setMoves(moves + 1);
      setSelectedSlot(null);
      
      // Check if puzzle is solved
      if (newSlots.every((slot, index) => slot === index)) {
        setIsTimerRunning(false);
        setGameState('finished');
        setScore(score + 1);
      }
    }
  };

  const restartGame = () => {
    setGameState('start');
    setScore(0);
  };

  const nextPuzzle = () => {
    initializePuzzle();
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (gameState === 'start') {
    return (
      <div className="jigsaw-container">
        <div className="start-screen">
          <h1>🧩 Jigsaw Puzzle 🧩</h1>
          <p>Arrange the image pieces in the correct order!</p>
          
          <div className="game-info">
            <div className="info-item">
              <span className="info-icon">🧩</span>
              <span>2x2 Grid Puzzle</span>
            </div>
            <div className="info-item">
              <span className="info-icon">⏱️</span>
              <span>Beat the Clock</span>
            </div>
            <div className="info-item">
              <span className="info-icon">🎯</span>
              <span>Perfect Arrangement</span>
            </div>
          </div>
          
          <button className="start-button" onClick={initializePuzzle}>
            Start Puzzle
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'finished') {
    return (
      <div className="jigsaw-container">
        <div className="finished-screen">
          <h1>🎉 Puzzle Complete! 🎉</h1>
          <div className="stats">
            <div className="stat-item">
              <span className="stat-label">Time:</span>
              <span className="stat-value">{formatTime(time)}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Moves:</span>
              <span className="stat-value">{moves}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Score:</span>
              <span className="stat-value">{score}</span>
            </div>
          </div>
          
          <div className="button-group">
            <button className="next-button" onClick={nextPuzzle}>
              Next Puzzle
            </button>
            <button className="restart-button" onClick={restartGame}>
              Restart Game
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="jigsaw-container">
      <div className="game-header">
        <div className="game-info">
          <div className="info-display">
            <span className="info-label">Time:</span>
            <span className="info-value">{formatTime(time)}</span>
          </div>
          <div className="info-display">
            <span className="info-label">Moves:</span>
            <span className="info-value">{moves}</span>
          </div>
          <div className="info-display">
            <span className="info-label">Score:</span>
            <span className="info-value">{score}</span>
          </div>
        </div>
        
        <button className="restart-button" onClick={restartGame}>
          Restart
        </button>
      </div>

      <div className="puzzle-container">
        <h3>Reference Image (2x2 Division)</h3>
        <div className="puzzle-grid">
          {positions.map((position) => (
            <div
              key={position}
              className="puzzle-piece"
              style={getPieceStyle(position)}
            />
          ))}
        </div>
      </div>

      <div className="puzzle-container">
        <h3>Click & Swap Puzzle</h3>
        <div className="puzzle-slots-container">
          <h4>Click two pieces to swap them</h4>
          <div className="puzzle-grid">
            {positions.map((slotIndex) => (
              <div
                key={`slot-${slotIndex}`}
                className={`puzzle-slot ${selectedSlot === slotIndex ? 'selected' : ''}`}
                onClick={() => handleSlotClick(slotIndex)}
              >
                <div
                  className="puzzle-piece"
                  style={getPieceStyle(puzzleSlots[slotIndex])}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="instructions">
        <p>Click two pieces to swap their positions. Arrange the pieces to match the reference image above!</p>
      </div>
    </div>
  );
};

export default DinosaurJigsawPuzzle;
