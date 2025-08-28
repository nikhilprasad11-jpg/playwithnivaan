import { seaAnimals, SeaAnimal } from '../data/seaAnimalImages';

export interface SeaAnimalQuizQuestion {
  id: number;
  image: string;
  correctAnswer: string;
  options: string[];
}

// List of additional sea animal names for wrong options
const additionalSeaAnimalNames = [
  'Blue Whale', 'Hammerhead Shark', 'Tiger Shark', 'Whale Shark',
  'Mako Shark', 'Bull Shark', 'Nurse Shark', 'Leopard Shark',
  'Bluefin Tuna', 'Yellowfin Tuna', 'Skipjack Tuna', 'Albacore Tuna',
  'Atlantic Cod', 'Pacific Cod', 'Haddock', 'Pollock',
  'Red Snapper', 'Yellowtail Snapper', 'Mangrove Snapper', 'Lane Snapper',
  'Nassau Grouper', 'Red Grouper', 'Black Grouper', 'Gag Grouper',
  'Blue Marlin', 'White Marlin', 'Striped Marlin', 'Black Marlin',
  'Mahi Mahi', 'Wahoo', 'Amberjack', 'Cobia',
  'Red Drum', 'Black Drum', 'Spotted Seatrout', 'Weakfish',
  'Bluefish', 'Spanish Mackerel', 'King Mackerel', 'Cero Mackerel',
  'Atlantic Herring', 'Pacific Herring', 'Sardine', 'Anchovy',
  'Atlantic Salmon', 'Pacific Salmon', 'Pink Salmon', 'Chum Salmon',
  'Rainbow Trout', 'Brown Trout', 'Brook Trout', 'Lake Trout',
  'Bass', 'Striped Bass', 'White Bass', 'Yellow Bass',
  'Catfish', 'Channel Catfish', 'Blue Catfish', 'Flathead Catfish',
  'Perch', 'Yellow Perch', 'White Perch', 'European Perch',
  'Pike', 'Northern Pike', 'Muskellunge', 'Chain Pickerel',
  'Walleye', 'Sauger', 'Saugeye', 'Blue Pike',
  'Crappie', 'Black Crappie', 'White Crappie', 'Calico Bass',
  'Sunfish', 'Bluegill', 'Redear Sunfish', 'Pumpkinseed',
  'Rockfish', 'Yelloweye Rockfish', 'Canary Rockfish', 'Bocaccio',
  'Lingcod', 'Cabezon', 'Greenling', 'Wolf Eel',
  'Wolf Fish', 'Monkfish', 'Goosefish', 'Anglerfish',
  'Sea Bass', 'Black Sea Bass', 'Giant Sea Bass', 'White Sea Bass',
  'Wrasse', 'Hogfish', 'Tautog', 'Cunner',
  'Parrotfish', 'Stoplight Parrotfish', 'Queen Parrotfish', 'Rainbow Parrotfish',
  'Triggerfish', 'Queen Triggerfish', 'Ocean Triggerfish', 'Gray Triggerfish',
  'Filefish', 'Orange Filefish', 'Scrawled Filefish', 'Unicorn Filefish',
  'Boxfish', 'Spotted Boxfish', 'Horned Boxfish', 'Cowfish',
  'Pufferfish', 'Porcupinefish', 'Burrfish', 'Balloonfish',
  'Tetra', 'Cardinal Tetra', 'Ember Tetra', 'Glowlight Tetra',
  'Rasbora', 'Harlequin Rasbora', 'Scissortail Rasbora', 'Clown Rasbora',
  'Barb', 'Tiger Barb', 'Cherry Barb', 'Rosy Barb',
  'Danio', 'Giant Danio', 'Pearl Danio', 'Leopard Danio',
  'Loach', 'Clown Loach', 'Kuhli Loach', 'Weather Loach',
  'Corydoras', 'Bronze Corydoras', 'Panda Corydoras', 'Albino Corydoras',
  'Pleco', 'Bristlenose Pleco', 'Common Pleco', 'Rubber Lip Pleco',
  'Discus', 'Blue Discus', 'Red Discus', 'Green Discus',
  'Angelfish', 'Silver Angelfish', 'Black Angelfish', 'Gold Angelfish',
  'Cichlid', 'Oscar Cichlid', 'Jack Dempsey', 'Convict Cichlid',
  'Molly', 'Black Molly', 'Sailfin Molly', 'Lyretail Molly',
  'Platy', 'Mickey Mouse Platy', 'Sunset Platy', 'Wagtail Platy',
  'Swordtail', 'Red Swordtail', 'Green Swordtail', 'Black Swordtail',
  'Guppy', 'Fancy Guppy', 'Endler Guppy', 'Moscow Guppy',
  'Betta', 'Crowntail Betta', 'Halfmoon Betta', 'Veiltail Betta',
  'Killifish', 'Golden Wonder Killifish', 'Clown Killifish', 'Bluefin Killifish',
  'Ricefish', 'Medaka Ricefish', 'Japanese Ricefish', 'Blue Ricefish',
  'Livebearer', 'Mosquito Fish', 'Least Killifish', 'Heterandria',
  'Cyprinid', 'Goldfish', 'Koi', 'Rosy Red Minnow',
  'Characin', 'Silver Dollar', 'Pacu', 'Piranha',
  'Catfish', 'Corydoras', 'Pleco', 'Synodontis',
  'Loach', 'Clown Loach', 'Kuhli Loach', 'Yo Yo Loach',
  'Gourami', 'Dwarf Gourami', 'Pearl Gourami', 'Blue Gourami',
  'Anabantid', 'Betta', 'Paradise Fish', 'Siamese Fighting Fish',
  'Cichlid', 'African Cichlid', 'South American Cichlid', 'Central American Cichlid',
  'Tetra', 'Neon Tetra', 'Cardinal Tetra', 'Glowlight Tetra',
  'Rasbora', 'Harlequin Rasbora', 'Scissortail Rasbora', 'Clown Rasbora',
  'Barb', 'Tiger Barb', 'Cherry Barb', 'Rosy Barb',
  'Danio', 'Zebra Danio', 'Giant Danio', 'Pearl Danio',
  'Minnow', 'White Cloud Mountain Minnow', 'Rosy Red Minnow', 'Fathead Minnow',
  'Shiner', 'Golden Shiner', 'Common Shiner', 'Emerald Shiner',
  'Dace', 'Longnose Dace', 'Blacknose Dace', 'Pearl Dace',
  'Chub', 'Hornyhead Chub', 'River Chub', 'Creek Chub',
  'Sucker', 'White Sucker', 'Northern Hog Sucker', 'Longnose Sucker',
  'Carp', 'Common Carp', 'Grass Carp', 'Bighead Carp',
  'Goldfish', 'Common Goldfish', 'Comet Goldfish', 'Fantail Goldfish',
  'Koi', 'Kohaku Koi', 'Sanke Koi', 'Showa Koi',
  'Bream', 'Bluegill', 'Redear Sunfish', 'Pumpkinseed',
  'Crappie', 'Black Crappie', 'White Crappie', 'Calico Bass',
  'Bass', 'Largemouth Bass', 'Smallmouth Bass', 'Spotted Bass',
  'Perch', 'Yellow Perch', 'White Perch', 'European Perch',
  'Pike', 'Northern Pike', 'Muskellunge', 'Chain Pickerel',
  'Walleye', 'Sauger', 'Saugeye', 'Blue Pike',
  'Trout', 'Rainbow Trout', 'Brown Trout', 'Brook Trout',
  'Salmon', 'Atlantic Salmon', 'Pacific Salmon', 'Pink Salmon',
  'Char', 'Arctic Char', 'Brook Trout', 'Lake Trout',
  'Whitefish', 'Lake Whitefish', 'Mountain Whitefish', 'Round Whitefish',
  'Cisco', 'Lake Herring', 'Cisco', 'Tullibee',
  'Smelt', 'Rainbow Smelt', 'Eulachon', 'Capelin',
  'Herring', 'Atlantic Herring', 'Pacific Herring', 'Alewife',
  'Sardine', 'Pacific Sardine', 'European Sardine', 'South American Sardine',
  'Anchovy', 'Northern Anchovy', 'European Anchovy', 'Japanese Anchovy',
  'Mackerel', 'Atlantic Mackerel', 'Pacific Mackerel', 'Spanish Mackerel',
  'Tuna', 'Albacore Tuna', 'Yellowfin Tuna', 'Skipjack Tuna',
  'Bonito', 'Atlantic Bonito', 'Pacific Bonito', 'Little Tunny',
  'Marlin', 'Blue Marlin', 'White Marlin', 'Striped Marlin',
  'Sailfish', 'Atlantic Sailfish', 'Indo-Pacific Sailfish', 'Pacific Sailfish',
  'Swordfish', 'Broadbill Swordfish', 'Mediterranean Swordfish', 'Pacific Swordfish',
  'Shark', 'Great White Shark', 'Tiger Shark', 'Hammerhead Shark',
  'Ray', 'Manta Ray', 'Stingray', 'Eagle Ray',
  'Skate', 'Little Skate', 'Winter Skate', 'Thorny Skate',
  'Chimaera', 'Rabbitfish', 'Ratfish', 'Ghost Shark',
  'Lamprey', 'Sea Lamprey', 'River Lamprey', 'Brook Lamprey',
  'Hagfish', 'Pacific Hagfish', 'Atlantic Hagfish', 'Black Hagfish',
  'Lungfish', 'African Lungfish', 'South American Lungfish', 'Australian Lungfish',
  'Coelacanth', 'West Indian Ocean Coelacanth', 'Indonesian Coelacanth', 'Comoro Coelacanth',
  'Sturgeon', 'Atlantic Sturgeon', 'White Sturgeon', 'Lake Sturgeon',
  'Paddlefish', 'American Paddlefish', 'Chinese Paddlefish', 'Mississippi Paddlefish',
  'Gar', 'Alligator Gar', 'Longnose Gar', 'Shortnose Gar',
  'Bowfin', 'Bowfin', 'Dogfish', 'Mudfish',
  'Arowana', 'Silver Arowana', 'Black Arowana', 'Asian Arowana',
  'Arapaima', 'Arapaima', 'Pirarucu', 'Paiche',
  'Osteoglossum', 'Silver Arowana', 'Black Arowana', 'African Arowana',
  'Scleropages', 'Asian Arowana', 'Australian Arowana', 'Green Arowana',
  'Heterotis', 'African Arowana', 'Nile Arowana', 'African Bonytongue',
  'Arapaima', 'Arapaima', 'Pirarucu', 'Paiche',
  'Osteoglossum', 'Silver Arowana', 'Black Arowana', 'African Arowana',
  'Scleropages', 'Asian Arowana', 'Australian Arowana', 'Green Arowana',
  'Heterotis', 'African Arowana', 'Nile Arowana', 'African Bonytongue',
  'Arapaima', 'Arapaima', 'Pirarucu', 'Paiche',
  'Osteoglossum', 'Silver Arowana', 'Black Arowana', 'African Arowana',
  'Scleropages', 'Asian Arowana', 'Australian Arowana', 'Green Arowana',
  'Heterotis', 'African Arowana', 'Nile Arowana', 'African Bonytongue'
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
  const allNames = [...seaAnimals.map(s => s.name), ...additionalSeaAnimalNames];
  const wrongOptions = allNames.filter(name => name !== correctAnswer);
  return shuffleArray(wrongOptions).slice(0, count);
}

// Function to generate random quiz questions
export function generateSeaAnimalQuizQuestions(questionCount: number = 10): SeaAnimalQuizQuestion[] {
  // Shuffle the sea animals array
  const shuffledSeaAnimals = shuffleArray(seaAnimals);
  
  // Take the first 'questionCount' sea animals
  const selectedSeaAnimals = shuffledSeaAnimals.slice(0, questionCount);
  
  // Generate questions
  const questions: SeaAnimalQuizQuestion[] = selectedSeaAnimals.map((seaAnimal, index) => {
    const wrongOptions = getRandomWrongOptions(seaAnimal.name);
    const allOptions = shuffleArray([seaAnimal.name, ...wrongOptions]);
    
    return {
      id: index + 1,
      image: seaAnimal.image,
      correctAnswer: seaAnimal.name,
      options: allOptions
    };
  });
  
  return questions;
}

// Function to get all available sea animal names (for future use)
export function getAllSeaAnimalNames(): string[] {
  return seaAnimals.map(s => s.name);
}

// Function to get a random sea animal
export function getRandomSeaAnimal(): SeaAnimal {
  return seaAnimals[Math.floor(Math.random() * seaAnimals.length)];
}
