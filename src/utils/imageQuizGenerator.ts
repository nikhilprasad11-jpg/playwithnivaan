import { dinosaurs, Dinosaur } from '../data/dinosaurImages';

export interface ImageQuizQuestion {
  id: number;
  correctAnswer: string;
  correctImage: string;
  options: string[];
}

// Function to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Function to get random wrong image options
function getRandomWrongImages(correctImage: string, count: number = 3): string[] {
  const allImages = dinosaurs.map(d => d.image);
  const wrongImages = allImages.filter(image => image !== correctImage);
  return shuffleArray(wrongImages).slice(0, count);
}

// Function to generate random image quiz questions
export function generateImageQuizQuestions(questionCount: number = 10): ImageQuizQuestion[] {
  // Shuffle the dinosaurs array
  const shuffledDinosaurs = shuffleArray(dinosaurs);
  
  // Take the first 'questionCount' dinosaurs
  const selectedDinosaurs = shuffledDinosaurs.slice(0, questionCount);
  
  // Generate questions
  const questions: ImageQuizQuestion[] = selectedDinosaurs.map((dinosaur, index) => {
    const wrongImages = getRandomWrongImages(dinosaur.image);
    const allImages = shuffleArray([dinosaur.image, ...wrongImages]);
    
    return {
      id: index + 1,
      correctAnswer: dinosaur.name,
      correctImage: dinosaur.image,
      options: allImages
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
