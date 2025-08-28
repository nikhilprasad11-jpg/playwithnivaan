import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { dinosaurs } from '../data/dinosaurImages';
import './DinosaurQuiz.css';

interface DinosaurFact {
  name: string;
  fact: string;
  period: string;
  diet: string;
  funFact: string;
}

const dinosaurFacts: DinosaurFact[] = [
  {
    name: "Allosaurus",
    fact: "Allosaurus was a large carnivorous dinosaur that lived during the Late Jurassic period.",
    period: "Late Jurassic (155-145 million years ago)",
    diet: "Carnivore - hunted other dinosaurs and scavenged",
    funFact: "Allosaurus had sharp, serrated teeth that could slice through flesh like steak knives!"
  },
  {
    name: "Ankylosaurus",
    fact: "Ankylosaurus was a heavily armored dinosaur with a club-like tail for defense.",
    period: "Late Cretaceous (68-66 million years ago)",
    diet: "Herbivore - ate low-growing plants and ferns",
    funFact: "Ankylosaurus had armor plates so thick that even T-Rex couldn't bite through them!"
  },
  {
    name: "Apatosaurus",
    fact: "Apatosaurus was a massive long-necked dinosaur, one of the largest land animals ever.",
    period: "Late Jurassic (154-150 million years ago)",
    diet: "Herbivore - ate leaves from tall trees",
    funFact: "Apatosaurus could grow as long as three school buses and weighed as much as 25 elephants!"
  },
  {
    name: "Archaeopteryx",
    fact: "Archaeopteryx was a small dinosaur with feathers, considered a link between dinosaurs and birds.",
    period: "Late Jurassic (150 million years ago)",
    diet: "Carnivore - ate small animals and insects",
    funFact: "Archaeopteryx had both dinosaur teeth and bird-like feathers - a true evolutionary bridge!"
  },
  {
    name: "Argentinosaurus",
    fact: "Argentinosaurus was one of the largest dinosaurs ever discovered, a true giant of the prehistoric world.",
    period: "Late Cretaceous (97-94 million years ago)",
    diet: "Herbivore - ate massive amounts of vegetation",
    funFact: "Argentinosaurus was so huge that its footsteps could create small earthquakes!"
  },
  {
    name: "Baryonyx",
    fact: "Baryonyx was a fish-eating dinosaur with a long, narrow snout and large claws.",
    period: "Early Cretaceous (130-125 million years ago)",
    diet: "Piscivore - primarily ate fish",
    funFact: "Baryonyx had crocodile-like jaws and could catch fish with its huge thumb claws!"
  },
  {
    name: "Brachiosaurus",
    fact: "Brachiosaurus was a massive sauropod with front legs longer than its back legs.",
    period: "Late Jurassic (154-150 million years ago)",
    diet: "Herbivore - ate leaves from the tallest trees",
    funFact: "Brachiosaurus could reach leaves 40 feet high - higher than a four-story building!"
  },
  {
    name: "Compsognathus",
    fact: "Compsognathus was one of the smallest dinosaurs, about the size of a chicken.",
    period: "Late Jurassic (150 million years ago)",
    diet: "Carnivore - ate small animals and insects",
    funFact: "Compsognathus was so small it could fit in your backpack - if it was still alive!"
  },
  {
    name: "Dilophosaurus",
    fact: "Dilophosaurus was a medium-sized carnivore with distinctive crests on its head.",
    period: "Early Jurassic (193-188 million years ago)",
    diet: "Carnivore - hunted small dinosaurs and fish",
    funFact: "Dilophosaurus had two thin crests on its head that may have been used for display!"
  },
  {
    name: "Diplodocus",
    fact: "Diplodocus was an extremely long dinosaur with a whip-like tail and long neck.",
    period: "Late Jurassic (154-152 million years ago)",
    diet: "Herbivore - ate low-growing plants",
    funFact: "Diplodocus could use its tail like a whip to defend itself against predators!"
  },
  {
    name: "Gallimimus",
    fact: "Gallimimus was a fast-running dinosaur that resembled a large ostrich.",
    period: "Late Cretaceous (70 million years ago)",
    diet: "Omnivore - ate plants, eggs, and small animals",
    funFact: "Gallimimus could run at speeds of up to 50 mph - faster than most modern animals!"
  },
  {
    name: "Giganotosaurus",
    fact: "Giganotosaurus was one of the largest carnivorous dinosaurs, even bigger than T-Rex!",
    period: "Late Cretaceous (99-97 million years ago)",
    diet: "Carnivore - hunted large sauropods",
    funFact: "Giganotosaurus had teeth the size of bananas and could take down prey twice its size!"
  },
  {
    name: "Iguanodon",
    fact: "Iguanodon was one of the first dinosaurs discovered and had thumb spikes for defense.",
    period: "Early Cretaceous (126-113 million years ago)",
    diet: "Herbivore - ate plants and could reach high branches",
    funFact: "Iguanodon could walk on both two and four legs, and had thumb spikes like daggers!"
  },
  {
    name: "Maiasaura",
    fact: "Maiasaura was a caring parent dinosaur that built nests and looked after its young.",
    period: "Late Cretaceous (76-74 million years ago)",
    diet: "Herbivore - ate plants and vegetation",
    funFact: "Maiasaura means 'good mother lizard' because it took such good care of its babies!"
  },
  {
    name: "Olorotitan",
    fact: "Olorotitan was a duck-billed dinosaur with a distinctive crest on its head.",
    period: "Late Cretaceous (72-66 million years ago)",
    diet: "Herbivore - ate plants and vegetation",
    funFact: "Olorotitan had a hollow crest that may have been used to make loud honking sounds!"
  },
  {
    name: "Oviraptor",
    fact: "Oviraptor was a small, bird-like dinosaur that may have been a caring parent.",
    period: "Late Cretaceous (75 million years ago)",
    diet: "Omnivore - ate eggs, small animals, and plants",
    funFact: "Oviraptor was originally thought to be an egg thief, but it was actually protecting its own eggs!"
  },
  {
    name: "Pachycephalosaurus",
    fact: "Pachycephalosaurus had a thick, dome-shaped skull that it used for head-butting contests.",
    period: "Late Cretaceous (70-66 million years ago)",
    diet: "Herbivore - ate plants and vegetation",
    funFact: "Pachycephalosaurus had a skull up to 10 inches thick - like wearing a football helmet!"
  },
  {
    name: "Parasaurolophus",
    fact: "Parasaurolophus was a duck-billed dinosaur with a long, curved crest on its head.",
    period: "Late Cretaceous (76-73 million years ago)",
    diet: "Herbivore - ate plants and vegetation",
    funFact: "Parasaurolophus could make sounds through its crest like a giant prehistoric trumpet!"
  },
  {
    name: "Pentaceratops",
    fact: "Pentaceratops was a horned dinosaur with five horns on its face and frill.",
    period: "Late Cretaceous (75-73 million years ago)",
    diet: "Herbivore - ate low-growing plants",
    funFact: "Pentaceratops had the largest skull of any land animal - over 10 feet long!"
  },
  {
    name: "Plateosaurus",
    fact: "Plateosaurus was one of the first large dinosaurs and could walk on two or four legs.",
    period: "Late Triassic (214-204 million years ago)",
    diet: "Herbivore - ate plants and vegetation",
    funFact: "Plateosaurus was one of the first dinosaurs to grow really big, paving the way for giants!"
  },
  {
    name: "Spinosaurus",
    fact: "Spinosaurus was the largest carnivorous dinosaur and spent much of its time in water.",
    period: "Late Cretaceous (99-93 million years ago)",
    diet: "Carnivore - primarily ate fish and other aquatic animals",
    funFact: "Spinosaurus had a sail on its back that could be 6 feet tall and may have helped it swim!"
  },
  {
    name: "Stegosaurus",
    fact: "Stegosaurus was a heavily armored dinosaur with plates on its back and spikes on its tail.",
    period: "Late Jurassic (155-150 million years ago)",
    diet: "Herbivore - ate low-growing plants",
    funFact: "Stegosaurus had a brain the size of a walnut, but could still defend itself with its spiked tail!"
  },
  {
    name: "Triceratops",
    fact: "Triceratops was a large horned dinosaur with three horns and a bony frill.",
    period: "Late Cretaceous (68-66 million years ago)",
    diet: "Herbivore - ate plants and vegetation",
    funFact: "Triceratops could charge like a rhino and its horns were strong enough to pierce T-Rex's skin!"
  },
  {
    name: "Troodon",
    fact: "Troodon was one of the smartest dinosaurs, with a large brain relative to its body size.",
    period: "Late Cretaceous (77-74 million years ago)",
    diet: "Omnivore - ate small animals, eggs, and plants",
    funFact: "Troodon had the largest brain relative to body size of any dinosaur - it was a genius!"
  },
  {
    name: "Tyrannosaurus Rex",
    fact: "T-Rex was one of the most fearsome predators ever, with massive jaws and tiny arms.",
    period: "Late Cretaceous (68-66 million years ago)",
    diet: "Carnivore - hunted large dinosaurs and scavenged",
    funFact: "T-Rex had the strongest bite force of any land animal - it could crush a car with its jaws!"
  },
  {
    name: "Utahraptor",
    fact: "Utahraptor was a large raptor dinosaur with deadly sickle-shaped claws on its feet.",
    period: "Early Cretaceous (135-130 million years ago)",
    diet: "Carnivore - hunted large prey",
    funFact: "Utahraptor had foot claws up to 9 inches long - like carrying around steak knives on your feet!"
  },
  {
    name: "Velociraptor",
    fact: "Velociraptor was a small but deadly predator with sharp claws and intelligence.",
    period: "Late Cretaceous (75-71 million years ago)",
    diet: "Carnivore - hunted small animals and may have hunted in packs",
    funFact: "Velociraptor was actually the size of a turkey, not the giant monsters shown in movies!"
  },
  {
    name: "Carnotaurus",
    fact: "Carnotaurus was a fast-running carnivore with distinctive horns above its eyes.",
    period: "Late Cretaceous (72-69 million years ago)",
    diet: "Carnivore - hunted smaller dinosaurs",
    funFact: "Carnotaurus had tiny arms even smaller than T-Rex's, and horns that looked like bull horns!"
  },
  {
    name: "Mamenchisaurus",
    fact: "Mamenchisaurus was a massive sauropod with an extremely long neck.",
    period: "Late Jurassic (160-145 million years ago)",
    diet: "Herbivore - ate leaves from very tall trees",
    funFact: "Mamenchisaurus had the longest neck of any dinosaur - up to 46 feet long!"
  },
  {
    name: "Dreadnoughtus",
    fact: "Dreadnoughtus was one of the largest dinosaurs ever, a true titan of the prehistoric world.",
    period: "Late Cretaceous (84-66 million years ago)",
    diet: "Herbivore - ate massive amounts of vegetation",
    funFact: "Dreadnoughtus was so huge it weighed as much as 12 elephants combined!"
  },
  {
    name: "Indoraptor",
    fact: "Indoraptor was a fictional hybrid dinosaur created in a laboratory.",
    period: "Modern (fictional)",
    diet: "Carnivore - designed to be a perfect predator",
    funFact: "Indoraptor was created by combining Indominus Rex and Velociraptor DNA!"
  },
  {
    name: "Stygimoloch",
    fact: "Stygimoloch was a dome-headed dinosaur with spikes around its skull.",
    period: "Late Cretaceous (66 million years ago)",
    diet: "Herbivore - ate plants and vegetation",
    funFact: "Stygimoloch had the most elaborate headgear of any dinosaur with spikes and knobs!"
  },
  {
    name: "Sinoceratops",
    fact: "Sinoceratops was a horned dinosaur with a large frill and single horn.",
    period: "Late Cretaceous (72-66 million years ago)",
    diet: "Herbivore - ate low-growing plants",
    funFact: "Sinoceratops was the first ceratopsian dinosaur discovered in China!"
  },
  {
    name: "Indominus Rex",
    fact: "Indominus Rex was a fictional hybrid dinosaur created by combining multiple species.",
    period: "Modern (fictional)",
    diet: "Carnivore - designed to be the ultimate predator",
    funFact: "Indominus Rex was created by mixing T-Rex, Velociraptor, and other dinosaur DNA!"
  },
  {
    name: "Ceratosaurus",
    fact: "Ceratosaurus was a medium-sized carnivore with a distinctive horn on its nose.",
    period: "Late Jurassic (156-145 million years ago)",
    diet: "Carnivore - hunted smaller dinosaurs and fish",
    funFact: "Ceratosaurus had a horn on its nose and smaller horns above its eyes!"
  },
  {
    name: "Pteranodon",
    fact: "Pteranodon was a flying reptile, not a dinosaur, with a large crest on its head.",
    period: "Late Cretaceous (86-84 million years ago)",
    diet: "Piscivore - primarily ate fish",
    funFact: "Pteranodon could fly for hours without flapping its wings, gliding on ocean breezes!"
  },
  {
    name: "Kentrosaurus",
    fact: "Kentrosaurus was a spiked dinosaur related to Stegosaurus with plates and spikes.",
    period: "Late Jurassic (155-150 million years ago)",
    diet: "Herbivore - ate low-growing plants",
    funFact: "Kentrosaurus had spikes on its shoulders and tail that could be used for defense!"
  },
  {
    name: "Edmontosaurus",
    fact: "Edmontosaurus was a large duck-billed dinosaur with hundreds of teeth.",
    period: "Late Cretaceous (73-66 million years ago)",
    diet: "Herbivore - ate plants and vegetation",
    funFact: "Edmontosaurus had up to 1,000 teeth in its mouth for grinding tough plants!"
  },
  {
    name: "Therizinosaurus",
    fact: "Therizinosaurus was a strange dinosaur with huge claws and a pot belly.",
    period: "Late Cretaceous (70-66 million years ago)",
    diet: "Herbivore - ate plants and leaves",
    funFact: "Therizinosaurus had the longest claws of any dinosaur - up to 3 feet long!"
  },
  {
    name: "Mononykus",
    fact: "Mononykus was a small, bird-like dinosaur with tiny arms and one large claw.",
    period: "Late Cretaceous (70-66 million years ago)",
    diet: "Insectivore - ate insects and small animals",
    funFact: "Mononykus had only one large claw on each arm, which it used to dig for insects!"
  },
  {
    name: "Corythosaurus",
    fact: "Corythosaurus was a duck-billed dinosaur with a helmet-like crest on its head.",
    period: "Late Cretaceous (77-75 million years ago)",
    diet: "Herbivore - ate plants and vegetation",
    funFact: "Corythosaurus could make loud honking sounds through its hollow crest!"
  },
  {
    name: "Mosasaurus",
    fact: "Mosasaurus was a giant marine reptile, not a dinosaur, that ruled the ancient seas.",
    period: "Late Cretaceous (82-66 million years ago)",
    diet: "Carnivore - ate fish, sharks, and other marine animals",
    funFact: "Mosasaurus was so powerful it could eat sharks whole and was the top predator of the ancient oceans!"
  },
  {
    name: "Dimorphodon",
    fact: "Dimorphodon was a flying reptile with two different types of teeth in its jaw.",
    period: "Early Jurassic (195-190 million years ago)",
    diet: "Carnivore - ate fish and small animals",
    funFact: "Dimorphodon had two different types of teeth - long ones in front and short ones in back!"
  },
  {
    name: "Minmi",
    fact: "Minmi was a small armored dinosaur from Australia with bony plates on its back.",
    period: "Early Cretaceous (120-100 million years ago)",
    diet: "Herbivore - ate low-growing plants",
    funFact: "Minmi was the first armored dinosaur discovered in Australia!"
  },
  {
    name: "Euoplocephalus",
    fact: "Euoplocephalus was a heavily armored dinosaur with a club-like tail.",
    period: "Late Cretaceous (76-66 million years ago)",
    diet: "Herbivore - ate low-growing plants",
    funFact: "Euoplocephalus had armor so thick that even T-Rex couldn't bite through it!"
  },
  {
    name: "Styracosaurus",
    fact: "Styracosaurus was a horned dinosaur with spikes around its frill.",
    period: "Late Cretaceous (75-74 million years ago)",
    diet: "Herbivore - ate low-growing plants",
    funFact: "Styracosaurus had up to 6 long spikes around its frill that made it look like a prehistoric crown!"
  }
];

const DinosaurCards: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const currentDinosaur = dinosaurs[currentIndex];
  const currentFact = dinosaurFacts.find(fact => 
    fact.name.toLowerCase() === currentDinosaur.name.toLowerCase()
  ) || dinosaurFacts[0];

  const nextDinosaur = () => {
    setCurrentIndex((prev) => (prev + 1) % dinosaurs.length);
    setImageError(false);
  };

  const previousDinosaur = () => {
    setCurrentIndex((prev) => (prev - 1 + dinosaurs.length) % dinosaurs.length);
    setImageError(false);
  };

  const goToDinosaur = (index: number) => {
    setCurrentIndex(index);
    setImageError(false);
  };

  return (
    <div className="quiz-container">
      <div className="question-container">
        <div className="dinosaur-image">
          <img 
            src={currentDinosaur.image} 
            alt={`Dinosaur: ${currentDinosaur.name}`}
            onError={(e) => {
              console.error(`Failed to load image: ${currentDinosaur.image}`);
              setImageError(true);
            }}
            onLoad={() => setImageError(false)}
          />
          {imageError && (
            <div className="image-error">
              <p>🦕 Image not available</p>
              <p>Learning about: {currentDinosaur.name}</p>
            </div>
          )}
        </div>
        
        <h2 className="question-text">
          {currentDinosaur.name}
        </h2>

        <div className="options-grid" style={{ gridTemplateColumns: '1fr', gap: '1rem' }}>
          <div className="option-button" style={{ textAlign: 'left', flexDirection: 'column', alignItems: 'flex-start' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#667eea' }}>📖 About</h3>
            <p style={{ margin: '0 0 1rem 0', lineHeight: '1.6' }}>{currentFact.fact}</p>
            
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#667eea' }}>⏰ Time Period</h3>
            <p style={{ margin: '0 0 1rem 0', lineHeight: '1.6' }}>{currentFact.period}</p>
            
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#667eea' }}>🍽️ Diet</h3>
            <p style={{ margin: '0 0 1rem 0', lineHeight: '1.6' }}>{currentFact.diet}</p>
            
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#667eea' }}>🎯 Fun Fact</h3>
            <p style={{ margin: '0', lineHeight: '1.6', fontStyle: 'italic' }}>{currentFact.funFact}</p>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button 
            className="start-button" 
            onClick={previousDinosaur}
            style={{ fontSize: '1rem', padding: '0.8rem 1.5rem' }}
          >
            ← Previous
          </button>
          
          <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#666' }}>
            {currentIndex + 1} of {dinosaurs.length}
          </span>
          
          <button 
            className="start-button" 
            onClick={nextDinosaur}
            style={{ fontSize: '1rem', padding: '0.8rem 1.5rem' }}
          >
            Next →
          </button>
        </div>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <h3 style={{ marginBottom: '1rem', color: '#333' }}>Quick Navigation</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
            {dinosaurs.map((dinosaur, index) => (
              <button
                key={index}
                onClick={() => goToDinosaur(index)}
                style={{
                  background: currentIndex === index ? '#667eea' : '#f0f0f0',
                  color: currentIndex === index ? 'white' : '#333',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease'
                }}
              >
                {dinosaur.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Link to="/" className="back-link">
        ← Back to Home
      </Link>
    </div>
  );
};

export default DinosaurCards;
