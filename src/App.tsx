import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DinosaurQuiz from './components/DinosaurQuiz';
import DinosaurImageQuiz from './components/DinosaurImageQuiz';
import DinosaurJigsawPuzzle from './components/DinosaurJigsawPuzzle';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <h1 className="nav-title">🎮 Nivaan's Interactive Games 🎮</h1>
            <div className="nav-links">
              <Link to="/" className="nav-link">🏠 Home</Link>
              <Link to="/dinosaur-quiz" className="nav-link">🦕 Dinosaur Quiz</Link>
              <Link to="/dinosaur-image-quiz" className="nav-link">🖼️ Image Quiz</Link>
              <Link to="/dinosaur-jigsaw" className="nav-link">🧩 Jigsaw Puzzle</Link>
            </div>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dinosaur-quiz" element={<DinosaurQuiz />} />
            <Route path="/dinosaur-image-quiz" element={<DinosaurImageQuiz />} />
            <Route path="/dinosaur-jigsaw" element={<DinosaurJigsawPuzzle />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="home">
      <div className="home-content">
        <h1>Welcome to Nivaan's Interactive Games! 🎉</h1>
        <p>Choose a game to play with your kid:</p>
        
        <div className="game-cards">
          <Link to="/dinosaur-quiz" className="game-card">
            <div className="game-card-content">
              <h2>🦕 Dinosaur Quiz</h2>
              <p>Test your knowledge about dinosaurs! Guess the names of these prehistoric creatures.</p>
              <ul>
                <li>10 exciting questions</li>
                <li>30 seconds per question</li>
                <li>Beautiful dinosaur images</li>
                <li>Track your score</li>
              </ul>
            </div>
          </Link>
          
          <Link to="/dinosaur-image-quiz" className="game-card">
            <div className="game-card-content">
              <h2>🖼️ Dinosaur Image Quiz</h2>
              <p>Reverse challenge! Choose the correct dinosaur image from the name.</p>
              <ul>
                <li>10 exciting questions</li>
                <li>30 seconds per question</li>
                <li>4 image options to choose from</li>
                <li>Track your score</li>
              </ul>
            </div>
          </Link>
          
                     <Link to="/dinosaur-jigsaw" className="game-card">
             <div className="game-card-content">
               <h2>🧩 Jigsaw Puzzle</h2>
               <p>Arrange the image pieces in the correct order!</p>
               <ul>
                 <li>3x3 grid puzzle</li>
                 <li>Drag and drop pieces</li>
                 <li>Track time and moves</li>
                 <li>Complete the image</li>
               </ul>
             </div>
           </Link>
          
          <div className="game-card coming-soon">
            <div className="game-card-content">
              <h2>🎨 Story Creator</h2>
              <p>Create amazing stories together! (Coming Soon)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
