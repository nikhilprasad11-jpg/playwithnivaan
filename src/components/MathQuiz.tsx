import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './DinosaurQuiz.css';

interface MathProblem {
  question: string;
  answer: number;
  type: 'addition' | 'subtraction';
  options: number[];
}

const generateMathProblems = (count: number): MathProblem[] => {
  const problems: MathProblem[] = [];
  
  for (let i = 0; i < count; i++) {
    const isAddition = Math.random() > 0.5;
    let num1: number, num2: number, answer: number;
    
    if (isAddition) {
      // Addition problems: numbers 0-10, sum up to 20
      num1 = Math.floor(Math.random() * 11); // 0-10
      num2 = Math.floor(Math.random() * (11 - num1)); // Ensures sum <= 20
      answer = num1 + num2;
    } else {
      // Subtraction problems: result is positive, numbers 0-20
      num1 = Math.floor(Math.random() * 21); // 0-20
      num2 = Math.floor(Math.random() * (num1 + 1)); // Ensures positive result
      answer = num1 - num2;
    }
    
    // Generate wrong options
    const wrongOptions: number[] = [];
    while (wrongOptions.length < 3) {
      const wrongAnswer = answer + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 5 + 1);
      if (wrongAnswer >= 0 && wrongAnswer <= 20 && !wrongOptions.includes(wrongAnswer) && wrongAnswer !== answer) {
        wrongOptions.push(wrongAnswer);
      }
    }
    
    const options = [answer, ...wrongOptions].sort(() => Math.random() - 0.5);
    
    problems.push({
      question: `${num1} ${isAddition ? '+' : '-'} ${num2} = ?`,
      answer,
      type: isAddition ? 'addition' : 'subtraction',
      options
    });
  }
  
  return problems;
};

const MathQuiz: React.FC = () => {
  const [problems, setProblems] = useState<MathProblem[]>([]);
  const [currentProblem, setCurrentProblem] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
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

  // Reset problem state when current problem changes
  useEffect(() => {
    if (gameState === 'playing') {
      setSelectedAnswer(null);
      setShowResult(false);
      setIsCorrect(false);
    }
  }, [currentProblem, gameState]);

  const startQuiz = () => {
    const newProblems = generateMathProblems(10);
    setProblems(newProblems);
    setGameState('playing');
    setCurrentProblem(0);
    setScore(0);
    setTimeLeft(30);
    setSelectedAnswer(null);
    setShowResult(false);
    setStreak(0);
  };

  const handleAnswerSelect = (answer: number) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections
    
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
    }, 2000);
  };

  const handleTimeUp = () => {
    setSelectedAnswer(-1);
    setShowResult(true);
    setIsCorrect(false);
    setStreak(0);
    
    setTimeout(() => {
      nextProblem();
    }, 2000);
  };

  const nextProblem = () => {
    // Reset all problem-related state
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
    
    if (currentProblem < problems.length - 1) {
      setCurrentProblem(currentProblem + 1);
      setTimeLeft(30);
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
    if (timeLeft > 20) return '#4CAF50';
    if (timeLeft > 10) return '#FF9800';
    return '#F44336';
  };

  const getStreakMessage = () => {
    if (streak >= 5) return '🔥 Amazing! You\'re on fire!';
    if (streak >= 3) return '⭐ Great streak! Keep going!';
    if (streak >= 2) return '👍 Nice! Two in a row!';
    return '';
  };

  if (gameState === 'start') {
    return (
      <div className="quiz-container">
        <div className="quiz-start">
          <h1>🧮 Math Quiz for Grade 1! 📚</h1>
          <div className="quiz-info">
            <h2>Ready to practice addition and subtraction?</h2>
            <ul>
              <li>➕ Addition problems (0-10)</li>
              <li>➖ Subtraction problems (0-20)</li>
              <li>⏰ 30 seconds per question</li>
              <li>🎯 10 exciting questions</li>
              <li>🏆 Track your score and streak</li>
            </ul>
          </div>
          <button className="start-button" onClick={startQuiz}>
            🚀 Start Math Quiz!
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
      message = 'Excellent! You\'re a math superstar!';
      emoji = '🏆';
    } else if (percentage >= 70) {
      message = 'Great job! You\'re getting really good at math!';
      emoji = '🎉';
    } else if (percentage >= 50) {
      message = 'Good effort! Keep practicing and you\'ll get better!';
      emoji = '👍';
    } else {
      message = 'Keep practicing! Math gets easier with practice!';
      emoji = '💪';
    }

    return (
      <div className="quiz-container">
        <div className="quiz-results">
          <h1>{emoji} Math Quiz Complete! {emoji}</h1>
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
  
  // Don't render if no problems are loaded yet
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
          padding: '1rem', 
          borderRadius: '15px', 
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <h2 style={{ margin: '0', fontSize: '2rem' }}>{problem.question}</h2>
          <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>
            {problem.type === 'addition' ? '➕ Addition' : '➖ Subtraction'}
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
                <span>Correct! {problem.question.replace('= ?', `= ${problem.answer}`)}</span>
              </>
            ) : selectedAnswer === -1 ? (
              <>
                <span className="result-icon">⏰</span>
                <span>Time's up! The answer was: {problem.answer}</span>
              </>
            ) : (
              <>
                <span className="result-icon">❌</span>
                <span>Wrong! {problem.question.replace('= ?', `= ${problem.answer}`)}</span>
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

export default MathQuiz;
