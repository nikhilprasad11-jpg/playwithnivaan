import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { generateQuizQuestions, QuizQuestion } from '../utils/quizGenerator';
import './DinosaurQuiz.css';

const DinosaurQuiz: React.FC = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameState, setGameState] = useState<'start' | 'playing' | 'finished'>('start');
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [imageError, setImageError] = useState(false);

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

  const startQuiz = () => {
    const newQuestions = generateQuizQuestions(10);
    setQuestions(newQuestions);
    setGameState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(30);
    setSelectedAnswer(null);
    setShowResult(false);
    setImageError(false);
  };

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer) return; // Prevent multiple selections
    
    setSelectedAnswer(answer);
    const correct = answer === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 1);
    }
    
    setShowResult(true);
    
    setTimeout(() => {
      nextQuestion();
    }, 4000);
  };

  const handleTimeUp = () => {
    setSelectedAnswer('timeout');
    setShowResult(true);
    setIsCorrect(false);
    
    setTimeout(() => {
      nextQuestion();
    }, 4000);
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(30);
    } else {
      setGameState('finished');
    }
  };

  const restartQuiz = () => {
    setGameState('start');
  };

  const getProgressPercentage = () => {
    return ((currentQuestion + 1) / questions.length) * 100;
  };

  const getTimeColor = () => {
    if (timeLeft > 20) return '#4CAF50';
    if (timeLeft > 10) return '#FF9800';
    return '#F44336';
  };

  if (gameState === 'start') {
    return (
      <div className="quiz-container">
        <div className="quiz-start">
          <h1>🦕 Dinosaur Quiz! 🦖</h1>
          <div className="quiz-info">
            <h2>Ready to test your dinosaur knowledge?</h2>
            <ul>
              <li>🎯 10 exciting questions</li>
              <li>⏰ 30 seconds per question</li>
              <li>🖼️ Beautiful dinosaur images</li>
              <li>🏆 Track your score</li>
            </ul>
          </div>
          <button className="start-button" onClick={startQuiz}>
            🚀 Start Quiz!
          </button>
          <Link to="/" className="back-button">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (gameState === 'finished') {
    const percentage = (score / questions.length) * 100;
    let message = '';
    let emoji = '';
    
    if (percentage >= 90) {
      message = 'Amazing! You\'re a dinosaur expert!';
      emoji = '🏆';
    } else if (percentage >= 70) {
      message = 'Great job! You know your dinosaurs well!';
      emoji = '🎉';
    } else if (percentage >= 50) {
      message = 'Good effort! Keep learning about dinosaurs!';
      emoji = '👍';
    } else {
      message = 'Keep practicing! You\'ll get better!';
      emoji = '💪';
    }

    return (
      <div className="quiz-container">
        <div className="quiz-results">
          <h1>{emoji} Quiz Complete! {emoji}</h1>
          <div className="score-display">
            <h2>Your Score: {score}/{questions.length}</h2>
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

  const question = questions[currentQuestion];
  
  // Don't render if no questions are loaded yet
  if (gameState === 'playing' && questions.length === 0) {
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
            Question {currentQuestion + 1} of {questions.length}
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
         <div className="dinosaur-image">
           <img 
             src={question.image} 
             alt={`Dinosaur: ${question.correctAnswer}`}
             onError={(e) => {
               console.error(`Failed to load image: ${question.image}`);
               setImageError(true);
             }}
             onLoad={() => setImageError(false)}
           />
           {imageError && (
             <div className="image-error">
               <p>🦕 Image not available</p>
               <p>Can you guess this dinosaur?</p>
             </div>
           )}
         </div>
        
        <h2 className="question-text">
          What dinosaur is this?
        </h2>
        
                 <div className="options-grid">
           {question.options.map((option, index) => (
             <button
               key={index}
               className={`option-button ${
                 selectedAnswer === option
                   ? option === question.correctAnswer
                     ? 'correct'
                     : 'incorrect'
                   : selectedAnswer && option === question.correctAnswer
                   ? 'correct'
                   : ''
               } ${selectedAnswer ? 'disabled' : ''}`}
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
                <span>Correct! Well done!</span>
              </>
            ) : selectedAnswer === 'timeout' ? (
              <>
                <span className="result-icon">⏰</span>
                <span>Time's up! The correct answer was: {question.correctAnswer}</span>
              </>
            ) : (
              <>
                <span className="result-icon">❌</span>
                <span>Wrong! The correct answer was: {question.correctAnswer}</span>
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

export default DinosaurQuiz;
