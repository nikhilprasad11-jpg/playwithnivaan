import { dinosaurs, Dinosaur } from '../data/dinosaurImages';

export interface QuizQuestion {
  id: number;
  image: string;
  correctAnswer: string;
  options: string[];
}

// List of additional dinosaur names for wrong options
const additionalDinosaurNames = [
  'T-Rex', 'Stegosaurus', 'Pterodactyl', 'Carnotaurus',
  'Deinonychus', 'Kentrosaurus', 'Huayangosaurus', 'Tuojiangosaurus',
  'Pteranodon', 'Quetzalcoatlus', 'Rhamphorhynchus', 'Euoplocephalus', 'Nodosaurus',
  'Sauropelta', 'Suchomimus', 'Irritator', 'Ceratosaurus', 'Acrocanthosaurus',
  'Corythosaurus', 'Lambeosaurus', 'Edmontosaurus', 'Camarasaurus'
];

// Function to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Function to get random wrong options
function getRandomWrongOptions(correctAnswer: string, count: number = 3): string[] {
  const allNames = [...dinosaurs.map(d => d.name), ...additionalDinosaurNames];
  const wrongOptions = allNames.filter(name => name !== correctAnswer);
  return shuffleArray(wrongOptions).slice(0, count);
}

// Function to generate random quiz questions
export function generateQuizQuestions(questionCount: number = 10): QuizQuestion[] {
  // Shuffle the dinosaurs array
  const shuffledDinosaurs = shuffleArray(dinosaurs);
  
  // Take the first 'questionCount' dinosaurs
  const selectedDinosaurs = shuffledDinosaurs.slice(0, questionCount);
  
  // Generate questions
  const questions: QuizQuestion[] = selectedDinosaurs.map((dinosaur, index) => {
    const wrongOptions = getRandomWrongOptions(dinosaur.name);
    const allOptions = shuffleArray([dinosaur.name, ...wrongOptions]);
    
    return {
      id: index + 1,
      image: dinosaur.image,
      correctAnswer: dinosaur.name,
      options: allOptions
    };
  });
  
  return questions;
}

// Function to get all available dinosaur names (for future use)
export function getAllDinosaurNames(): string[] {
  return dinosaurs.map(d => d.name);
}

// Function to get a random dinosaur
export function getRandomDinosaur(): Dinosaur {
  return dinosaurs[Math.floor(Math.random() * dinosaurs.length)];
}
