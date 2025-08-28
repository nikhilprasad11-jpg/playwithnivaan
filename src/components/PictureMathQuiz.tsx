import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './DinosaurQuiz.css';

interface PictureMathProblem {
  question: string;
  answer: number;
  type: 'addition' | 'subtraction';
  options: number[];
  leftObjects: string[];
  rightObjects: string[];
  operation: string;
  theme: string;
}

const objectThemes: Record<string, string[]> = {
  fruits: ['🍎', '🍌', '🍊', '🍓', '🍇', '🍉', '🍍', '🥭', '🍑', '🍒', '🍐', '🥝', '🥥', '🍅', '🥑', '🥕', '🌽', '🥬', '🥒', '🍆'],
  animals: ['🐶', '🐱', '🐰', '🐼', '🐨', '🐯', '🦁', '🐸', '🐵', '🐷', '🐮', '🐸', '🐙', '🦋', '🐞', '🐜', '🦀', '🐢', '🐬', '🦄'],
  shapes: ['⭐', '🌟', '💫', '✨', '🔶', '🔷', '💎', '💍', '🎈', '🎀', '🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '⚪', '⚫', '🔺', '🔻'],
  food: ['🍕', '🍔', '🍟', '🌭', '🍿', '🍪', '🍩', '🍰', '🧁', '🍦', '🍞', '🥐', '🥖', '🥨', '🥯', '🥞', '🧇', '🥓', '🍳', '🥚'],
  toys: ['🎮', '🎲', '🧸', '🎪', '🎨', '🎭', '🎯', '🎳', '🎸', '🎺', '🎻', '🎹', '🎤', '🎧', '🎬', '🎭', '🎪', '🎨', '🎯', '🎳'],
  vehicles: ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐', '🚚', '🚛', '🚜', '🏍️', '🛵', '🚲', '🚁', '✈️', '🚀', '🚢']
};

const generatePictureMathProblems = (count: number): PictureMathProblem[] => {
  const problems: PictureMathProblem[] = [];
  
  for (let i = 0; i < count; i++) {
    const isAddition = Math.random() > 0.5;
    let num1: number, num2: number, answer: number;
    
    if (isAddition) {
      // Addition problems: numbers 1-8, sum up to 12
      num1 = Math.floor(Math.random() * 8) + 1; // 1-8
      num2 = Math.floor(Math.random() * (9 - num1)) + 1; // Ensures sum <= 12
      answer = num1 + num2;
    } else {
      // Subtraction problems: result is positive, numbers 1-12
      num1 = Math.floor(Math.random() * 12) + 1; // 1-12
      num2 = Math.floor(Math.random() * num1) + 1; // Ensures positive result
      answer = num1 - num2;
    }
    
    // Generate wrong options
    const wrongOptions: number[] = [];
    while (wrongOptions.length < 3) {
      const wrongAnswer = answer + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3 + 1);
      if (wrongAnswer >= 0 && wrongAnswer <= 15 && !wrongOptions.includes(wrongAnswer) && wrongAnswer !== answer) {
        wrongOptions.push(wrongAnswer);
      }
    }
    
    const options = [answer, ...wrongOptions].sort(() => Math.random() - 0.5);
    
    // Select a random theme and use the same object from that theme for all groups
    const themeNames = Object.keys(objectThemes);
    const selectedTheme = themeNames[Math.floor(Math.random() * themeNames.length)];
    const themeObjects = objectThemes[selectedTheme];
    const selectedObject = themeObjects[Math.floor(Math.random() * themeObjects.length)];
    
    // Use the same object repeated for both groups
    const leftObjects = Array(num1).fill(selectedObject);
    const rightObjects = Array(num2).fill(selectedObject);
    
    problems.push({
             question: `${num1} ${isAddition ? '+' : '-'} ${num2} = ?`,
       answer,
       type: isAddition ? 'addition' : 'subtraction',
       options,
       leftObjects,
       rightObjects,
       operation: isAddition ? '+' : '-',
       theme: selectedTheme
    });
  }
  
  return problems;
};

const PictureMathQuiz: React.FC = () => {
  const [problems, setProblems] = useState<PictureMathProblem[]>([]);
  const [currentProblem, setCurrentProblem] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [gameState, setGameState] = useState<'start' | 'playing' | 'finished'>('start');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      handleTimeUp();
    }

    return () => clearTimeout(timer);
  }, [timeLeft, gameState]);

  useEffect(() => {
    if (gameState === 'playing') {
      setSelectedAnswer(null);
      setShowResult(false);
      setIsCorrect(false);
    }
  }, [currentProblem, gameState]);

  const startQuiz = () => {
    const newProblems = generatePictureMathProblems(8);
    setProblems(newProblems);
    setGameState('playing');
    setCurrentProblem(0);
    setScore(0);
    setTimeLeft(45);
    setSelectedAnswer(null);
    setShowResult(false);
    setStreak(0);
  };

  const handleAnswerSelect = (answer: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answer);
    const correct = answer === problems[currentProblem].answer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 1);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
    
    setShowResult(true);
    
    setTimeout(() => {
      nextProblem();
    }, 2500);
  };

  const handleTimeUp = () => {
    setSelectedAnswer(-1);
    setShowResult(true);
    setIsCorrect(false);
    setStreak(0);
    
    setTimeout(() => {
      nextProblem();
    }, 2500);
  };

  const nextProblem = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
    
    if (currentProblem < problems.length - 1) {
      setCurrentProblem(currentProblem + 1);
      setTimeLeft(45);
    } else {
      setGameState('finished');
    }
  };

  const restartQuiz = () => {
    setGameState('start');
  };

  const getProgressPercentage = () => {
    return ((currentProblem + 1) / problems.length) * 100;
  };

  const getTimeColor = () => {
    if (timeLeft > 30) return '#4CAF50';
    if (timeLeft > 15) return '#FF9800';
    return '#F44336';
  };

  const getStreakMessage = () => {
    if (streak >= 4) return '🔥 Amazing! You\'re counting like a pro!';
    if (streak >= 2) return '⭐ Great counting! Keep going!';
    return '';
  };

  const renderObjects = (objects: string[]) => {
    return (
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '0.5rem', 
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60px'
      }}>
        {objects.map((obj, index) => (
          <span key={index} style={{ fontSize: '2rem' }}>{obj}</span>
        ))}
      </div>
    );
  };

  if (gameState === 'start') {
    return (
      <div className="quiz-container">
        <div className="quiz-start">
          <h1>🖼️ Picture Math Quiz! 🧮</h1>
          <div className="quiz-info">
            <h2>Count the objects and solve the math!</h2>
            <ul>
              <li>🍎 Count fruits, animals, and fun objects</li>
              <li>➕ Addition problems (1-8 objects)</li>
              <li>➖ Subtraction problems (1-12 objects)</li>
              <li>⏰ 45 seconds per question</li>
              <li>🎯 8 visual math problems</li>
              <li>🏆 Track your score and streak</li>
            </ul>
          </div>
          <button className="start-button" onClick={startQuiz}>
            🚀 Start Picture Math!
          </button>
          <Link to="/" className="back-button">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (gameState === 'finished') {
    const percentage = (score / problems.length) * 100;
    let message = '';
    let emoji = '';
    
    if (percentage >= 90) {
      message = 'Excellent! You\'re a counting superstar!';
      emoji = '🏆';
    } else if (percentage >= 70) {
      message = 'Great job! You\'re getting really good at counting!';
      emoji = '🎉';
    } else if (percentage >= 50) {
      message = 'Good effort! Keep practicing and you\'ll get better!';
      emoji = '👍';
    } else {
      message = 'Keep practicing! Counting gets easier with practice!';
      emoji = '💪';
    }

    return (
      <div className="quiz-container">
        <div className="quiz-results">
          <h1>{emoji} Picture Math Complete! {emoji}</h1>
          <div className="score-display">
            <h2>Your Score: {score}/{problems.length}</h2>
            <div className="score-percentage">{percentage}%</div>
            <p className="score-message">{message}</p>
          </div>
          <div className="result-buttons">
            <button className="restart-button" onClick={restartQuiz}>
              🔄 Play Again
            </button>
            <Link to="/" className="home-button">
              🏠 Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const problem = problems[currentProblem];
  
  if (gameState === 'playing' && problems.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="quiz-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
          <span className="question-counter">
            Question {currentProblem + 1} of {problems.length}
          </span>
        </div>
        
        <div className="quiz-stats">
          <div className="score">Score: {score}</div>
          <div className="timer" style={{ color: getTimeColor() }}>
            ⏰ {timeLeft}s
          </div>
        </div>
      </div>

      <div className="question-container">
        <div style={{ 
          background: 'linear-gradient(135deg, #667eea, #764ba2)', 
          color: 'white', 
          padding: '1.5rem', 
          borderRadius: '15px', 
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.8rem' }}>
            Count the objects and solve:
          </h2>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <div style={{ 
              background: 'rgba(255,255,255,0.2)', 
              padding: '1rem', 
              borderRadius: '10px',
              minWidth: '120px'
            }}>
              <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>First Group</div>
              {renderObjects(problem.leftObjects)}
            </div>
            
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
              {problem.operation}
            </div>
            
            <div style={{ 
              background: 'rgba(255,255,255,0.2)', 
              padding: '1rem', 
              borderRadius: '10px',
              minWidth: '120px'
            }}>
              <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Second Group</div>
              {renderObjects(problem.rightObjects)}
            </div>
            
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
              =
            </div>
            
            <div style={{ 
              background: 'rgba(255,255,255,0.2)', 
              padding: '1rem', 
              borderRadius: '10px',
              minWidth: '80px',
              height: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>?</span>
            </div>
          </div>
          
                     <p style={{ margin: '1rem 0 0 0', opacity: 0.9 }}>
             {problem.type === 'addition' ? '➕ Addition' : '➖ Subtraction'} • {problem.theme.charAt(0).toUpperCase() + problem.theme.slice(1)}
           </p>
        </div>
        
        {getStreakMessage() && (
          <div style={{ 
            background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)', 
            color: 'white', 
            padding: '0.5rem 1rem', 
            borderRadius: '25px', 
            marginBottom: '1rem',
            textAlign: 'center',
            animation: 'pulse 1s infinite'
          }}>
            {getStreakMessage()}
          </div>
        )}
        
        <div className="options-grid">
          {problem.options.map((option, index) => (
            <button
              key={`${currentProblem}-${index}`}
              className={`option-button ${
                selectedAnswer === option
                  ? option === problem.answer
                    ? 'correct'
                    : 'incorrect'
                  : selectedAnswer !== null && option === problem.answer
                  ? 'correct'
                  : ''
              } ${selectedAnswer !== null ? 'disabled' : ''}`}
              onClick={() => handleAnswerSelect(option)}
              disabled={selectedAnswer !== null}
            >
              <div className="option-number">{index + 1}</div>
              {option}
            </button>
          ))}
        </div>

        {showResult && (
          <div className={`result-message ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? (
              <>
                <span className="result-icon">✅</span>
                <span>Correct! {problem.leftObjects.length} {problem.operation} {problem.rightObjects.length} = {problem.answer}</span>
              </>
            ) : selectedAnswer === -1 ? (
              <>
                <span className="result-icon">⏰</span>
                <span>Time's up! The answer was: {problem.answer}</span>
              </>
            ) : (
              <>
                <span className="result-icon">❌</span>
                <span>Wrong! {problem.leftObjects.length} {problem.operation} {problem.rightObjects.length} = {problem.answer}</span>
              </>
            )}
          </div>
        )}
      </div>

      <Link to="/" className="back-link">
        ← Back to Home
      </Link>
    </div>
  );
};

export default PictureMathQuiz;
