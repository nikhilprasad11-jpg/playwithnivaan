import React, { useState, useEffect } from 'react';
import { generateImageQuizQuestions, ImageQuizQuestion } from '../utils/imageQuizGenerator';
import './DinosaurImageQuiz.css';

const DinosaurImageQuiz: React.FC = () => {
  const [questions, setQuestions] = useState<ImageQuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameState, setGameState] = useState<'start' | 'playing' | 'finished'>('start');
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (gameState === 'playing' && timeLeft === 0) {
      handleTimeUp();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, gameState]);

  const startQuiz = () => {
    const newQuestions = generateImageQuizQuestions(10);
    setQuestions(newQuestions);
    setGameState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(30);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleImageSelect = (selectedImage: string) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections

    const question = questions[currentQuestion];
    const correct = selectedImage === question.correctImage;
    
    setSelectedAnswer(selectedImage);
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setTimeLeft(30);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setGameState('finished');
      }
    }, 4000);
  };

  const handleTimeUp = () => {
    setSelectedAnswer('timeout');
    setShowResult(true);
    setIsCorrect(false);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setTimeLeft(30);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setGameState('finished');
      }
    }, 4000);
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

  // Don't render if no questions are loaded yet
  if (gameState === 'playing' && questions.length === 0) {
    return <div>Loading...</div>;
  }

  if (gameState === 'start') {
    return (
      <div className="quiz-container">
        <div className="start-screen">
          <h1>🦕 Dinosaur Image Quiz 🦖</h1>
          <p>Can you identify the correct dinosaur image?</p>
          <div className="quiz-info">
            <div className="info-item">
              <span className="info-icon">📝</span>
              <span>10 Questions</span>
            </div>
            <div className="info-item">
              <span className="info-icon">⏱️</span>
              <span>30 seconds per question</span>
            </div>
            <div className="info-item">
              <span className="info-icon">🎯</span>
              <span>Choose the correct image</span>
            </div>
          </div>
          <button className="start-button" onClick={startQuiz}>
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'finished') {
    const percentage = (score / questions.length) * 100;
    let message = '';
    let emoji = '';

    if (percentage === 100) {
      message = 'Perfect! You know your dinosaurs!';
      emoji = '🏆';
    } else if (percentage >= 80) {
      message = 'Excellent! Great dinosaur knowledge!';
      emoji = '🌟';
    } else if (percentage >= 60) {
      message = 'Good job! You know quite a bit!';
      emoji = '👍';
    } else if (percentage >= 40) {
      message = 'Not bad! Keep learning!';
      emoji = '📚';
    } else {
      message = 'Keep practicing! You\'ll get better!';
      emoji = '💪';
    }

    return (
      <div className="quiz-container">
        <div className="finished-screen">
          <h1>Quiz Complete! {emoji}</h1>
          <div className="score-display">
            <h2>Your Score: {score}/{questions.length}</h2>
            <div className="percentage">{percentage}%</div>
          </div>
          <p className="message">{message}</p>
          <button className="restart-button" onClick={restartQuiz}>
            Play Again
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="progress-info">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
        </div>
        <div className="score-info">
          <span>Score: {score}</span>
        </div>
        <div className="timer" style={{ color: getTimeColor() }}>
          ⏱️ {timeLeft}s
        </div>
      </div>

      <div className="question-container">
        <div className="dinosaur-name">
          <h2>Which image shows a {question.correctAnswer}?</h2>
        </div>
        
        <div className="image-options">
          {question.options.map((image, index) => (
            <div
              key={index}
              className={`image-option ${
                selectedAnswer === image ? 'selected' : ''
              } ${
                showResult && image === question.correctImage ? 'correct' : ''
              } ${
                showResult && selectedAnswer === image && image !== question.correctImage ? 'incorrect' : ''
              }`}
              onClick={() => handleImageSelect(image)}
            >
              <div className="image-option-number">{index + 1}</div>
              <img
                src={image}
                alt={`Option ${index + 1}`}
                className="option-image"
              />
            </div>
          ))}
        </div>

        {showResult && (
          <div className={`result-message ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? (
              <>
                <span className="result-icon">✅</span>
                <span>Correct! That's a {question.correctAnswer}!</span>
              </>
            ) : selectedAnswer === 'timeout' ? (
              <>
                <span className="result-icon">⏰</span>
                <span>Time's up! The correct answer was {question.correctAnswer}.</span>
              </>
            ) : (
              <>
                <span className="result-icon">❌</span>
                <span>Wrong! The correct answer was {question.correctAnswer}.</span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DinosaurImageQuiz;
