import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { seaAnimals } from '../data/seaAnimalImages';
import './DinosaurQuiz.css';

interface SeaAnimalFact {
  name: string;
  fact: string;
  habitat: string;
  diet: string;
  funFact: string;
}

const seaAnimalFacts: SeaAnimalFact[] = [
  {
    name: "Dory",
    fact: "Dory is a blue tang fish known for its vibrant blue color and yellow tail.",
    habitat: "Coral reefs in the Pacific and Indian Oceans",
    diet: "Algae and small invertebrates",
    funFact: "Blue tangs can change color based on their mood and environment!"
  },
  {
    name: "Arowana",
    fact: "Arowanas are ancient fish known as 'dragon fish' due to their large scales and whisker-like barbels.",
    habitat: "Freshwater rivers and lakes in South America, Asia, and Australia",
    diet: "Small fish, insects, and crustaceans",
    funFact: "Arowanas can jump up to 6 feet out of the water to catch prey!"
  },
  {
    name: "Koi Carp",
    fact: "Koi are colorful varieties of carp that are popular in ornamental ponds and gardens.",
    habitat: "Freshwater ponds and lakes worldwide",
    diet: "Plants, algae, and small invertebrates",
    funFact: "Koi can live for over 200 years! The oldest recorded koi lived to be 226 years old."
  },
  {
    name: "Rainbowfish",
    fact: "Rainbowfish are small, colorful fish known for their iridescent scales that shimmer like rainbows.",
    habitat: "Freshwater streams and rivers in Australia and New Guinea",
    diet: "Small insects, larvae, and algae",
    funFact: "Male rainbowfish change colors during breeding season to attract females!"
  },
  {
    name: "Oscar Fish",
    fact: "Oscars are large, intelligent cichlids known for their personality and ability to recognize their owners.",
    habitat: "Freshwater rivers and lakes in South America",
    diet: "Small fish, insects, and crustaceans",
    funFact: "Oscars can learn tricks and even play with toys like ping pong balls!"
  },
  {
    name: "Discus Fish",
    fact: "Discus fish are known for their round, disc-like shape and beautiful color patterns.",
    habitat: "Freshwater rivers in the Amazon basin",
    diet: "Small invertebrates and plant matter",
    funFact: "Discus parents feed their babies with a special skin secretion called 'discus milk'!"
  },
  {
    name: "Angelfish",
    fact: "Angelfish are graceful fish with long, flowing fins that resemble angel wings.",
    habitat: "Freshwater rivers and lakes in South America",
    diet: "Small fish, insects, and plant matter",
    funFact: "Angelfish form monogamous pairs and both parents care for their eggs!"
  },
  {
    name: "Platy Fish",
    fact: "Platies are small, peaceful fish that come in many bright colors and patterns.",
    habitat: "Freshwater streams and rivers in Central America",
    diet: "Algae, small insects, and plant matter",
    funFact: "Platies can give birth to live young instead of laying eggs!"
  },
  {
    name: "Molly Fish",
    fact: "Mollies are hardy fish that can live in both freshwater and saltwater environments.",
    habitat: "Freshwater and brackish waters in the Americas",
    diet: "Algae, small insects, and plant matter",
    funFact: "Mollies can change their gender from female to male when needed!"
  },
  {
    name: "Zebra Danio",
    fact: "Zebra danios are small, striped fish that are popular in aquariums for their active behavior.",
    habitat: "Freshwater streams and rivers in South Asia",
    diet: "Small insects, larvae, and algae",
    funFact: "Zebra danios are often used in scientific research because they're easy to breed and study!"
  },
  {
    name: "Neon Tetra",
    fact: "Neon tetras are small, colorful fish with bright blue and red stripes that glow under light.",
    habitat: "Freshwater streams in the Amazon basin",
    diet: "Small insects, larvae, and algae",
    funFact: "Neon tetras can see ultraviolet light, which helps them find food and mates!"
  },
  {
    name: "Guppy",
    fact: "Guppies are small, colorful fish that are one of the most popular aquarium fish in the world.",
    habitat: "Freshwater streams and rivers in South America",
    diet: "Small insects, algae, and plant matter",
    funFact: "Guppies can have up to 200 babies at once, and they're born fully formed!"
  },
  {
    name: "Betta",
    fact: "Bettas, also called Siamese fighting fish, are known for their beautiful fins and territorial behavior.",
    habitat: "Freshwater rice paddies and slow-moving streams in Southeast Asia",
    diet: "Small insects, larvae, and plant matter",
    funFact: "Male bettas build bubble nests to protect their eggs and babies!"
  },
  {
    name: "Oarfish",
    fact: "Oarfish are the longest bony fish in the world, reaching lengths of up to 36 feet!",
    habitat: "Deep ocean waters worldwide",
    diet: "Small fish, squid, and crustaceans",
    funFact: "Oarfish are rarely seen alive and are thought to be the source of sea serpent legends!"
  },
  {
    name: "Sailfish",
    fact: "Sailfish are the fastest fish in the ocean, reaching speeds of up to 68 mph!",
    habitat: "Open ocean waters in tropical and subtropical regions",
    diet: "Small fish and squid",
    funFact: "Sailfish can change colors rapidly to communicate with each other!"
  },
  {
    name: "Nudibranch",
    fact: "Nudibranchs are colorful sea slugs that come in amazing shapes and patterns.",
    habitat: "Ocean floors worldwide, from shallow reefs to deep waters",
    diet: "Sponges, anemones, and other marine animals",
    funFact: "Nudibranchs can steal the stinging cells from jellyfish and use them for their own defense!"
  },
  {
    name: "Horseshoe Crab",
    fact: "Horseshoe crabs are ancient creatures that have been around for over 450 million years!",
    habitat: "Shallow coastal waters and beaches",
    diet: "Worms, small mollusks, and algae",
    funFact: "Horseshoe crab blood is bright blue and is used in medical research to detect bacteria!"
  },
  {
    name: "Hermit Crab",
    fact: "Hermit crabs use empty seashells as mobile homes to protect their soft abdomens.",
    habitat: "Coastal areas and ocean floors worldwide",
    diet: "Algae, small animals, and dead organic matter",
    funFact: "Hermit crabs will fight each other for the best shells and even line up to trade shells!"
  },
  {
    name: "Flying Fish",
    fact: "Flying fish can glide through the air for distances of up to 650 feet to escape predators!",
    habitat: "Open ocean waters worldwide",
    diet: "Small fish, plankton, and crustaceans",
    funFact: "Flying fish can reach speeds of 35 mph in the air and stay airborne for up to 45 seconds!"
  },
  {
    name: "Swordtail Fish",
    fact: "Swordtail fish are named for the long, sword-like extension on the male's tail fin.",
    habitat: "Freshwater streams and rivers in Central America",
    diet: "Small insects, algae, and plant matter",
    funFact: "Swordtail fish can change from female to male if there are no males in the group!"
  },
  {
    name: "Halibut",
    fact: "Halibut are flatfish that lie on their sides and have both eyes on one side of their head.",
    habitat: "Cold ocean floors in the North Atlantic and North Pacific",
    diet: "Fish, squid, and crustaceans",
    funFact: "Halibut can grow to be over 8 feet long and weigh up to 500 pounds!"
  },
  {
    name: "Flounder",
    fact: "Flounders are flatfish that start life with eyes on both sides but end up with both eyes on one side.",
    habitat: "Ocean floors in coastal waters worldwide",
    diet: "Small fish, worms, and crustaceans",
    funFact: "Flounders can change their color and pattern to match the ocean floor perfectly!"
  },
  {
    name: "Snapper",
    fact: "Snappers are popular food fish known for their sharp teeth and strong jaws.",
    habitat: "Tropical and subtropical ocean waters worldwide",
    diet: "Fish, crustaceans, and mollusks",
    funFact: "Some snappers can make loud clicking sounds by grinding their teeth together!"
  },
  {
    name: "Grouper",
    fact: "Groupers are large, powerful fish that can change their gender from female to male.",
    habitat: "Tropical and subtropical ocean waters worldwide",
    diet: "Fish, crustaceans, and octopuses",
    funFact: "Some groupers can grow to be over 8 feet long and weigh more than 800 pounds!"
  },
  {
    name: "Cuttlefish",
    fact: "Cuttlefish are intelligent cephalopods that can change color and texture instantly.",
    habitat: "Ocean floors in coastal waters worldwide",
    diet: "Fish, crustaceans, and mollusks",
    funFact: "Cuttlefish have three hearts and blue-green blood!"
  },
  {
    name: "Electric Eel",
    fact: "Electric eels can generate powerful electric shocks of up to 860 volts to stun prey!",
    habitat: "Freshwater rivers and streams in South America",
    diet: "Fish, small mammals, and birds",
    funFact: "Electric eels are not actually eels - they're more closely related to catfish!"
  },
  {
    name: "Krill",
    fact: "Krill are tiny crustaceans that are a vital food source for many ocean animals.",
    habitat: "All oceans worldwide, especially in cold waters",
    diet: "Phytoplankton and algae",
    funFact: "Krill can glow in the dark using special light-producing organs!"
  },
  {
    name: "Plankton",
    fact: "Plankton are tiny organisms that drift in the ocean and form the base of the marine food web.",
    habitat: "All ocean waters worldwide",
    diet: "Algae and other tiny organisms",
    funFact: "The word 'plankton' comes from the Greek word for 'wanderer' or 'drifter'!"
  },
  {
    name: "Coral",
    fact: "Coral are tiny animals that build massive underwater structures called coral reefs.",
    habitat: "Shallow tropical ocean waters worldwide",
    diet: "Algae and tiny plankton",
    funFact: "Coral reefs are the largest living structures on Earth and can be seen from space!"
  },
  {
    name: "Albatross",
    fact: "Albatrosses are large seabirds with the longest wingspan of any bird, up to 11 feet!",
    habitat: "Open ocean waters worldwide",
    diet: "Fish, squid, and crustaceans",
    funFact: "Albatrosses can fly for months without landing and sleep while flying!"
  },
  {
    name: "Sea Otter",
    fact: "Sea otters are the smallest marine mammals and use tools like rocks to crack open shellfish.",
    habitat: "Coastal waters in the North Pacific",
    diet: "Sea urchins, clams, mussels, and other shellfish",
    funFact: "Sea otters hold hands while sleeping to keep from drifting apart!"
  },
  {
    name: "Seal",
    fact: "Seals are marine mammals that can hold their breath for up to 2 hours underwater.",
    habitat: "Coastal waters and ice floes worldwide",
    diet: "Fish, squid, and crustaceans",
    funFact: "Seals can sleep underwater! They can rest while floating at the surface."
  },
  {
    name: "Walrus",
    fact: "Walruses are large marine mammals with long tusks and thick blubber for insulation.",
    habitat: "Arctic coastal waters and ice floes",
    diet: "Clams, mussels, and other shellfish",
    funFact: "Walruses use their sensitive whiskers to find food in the dark ocean floor!"
  },
  {
    name: "Dugong",
    fact: "Dugongs are gentle marine mammals related to manatees, often called 'sea cows'.",
    habitat: "Coastal waters in the Indian and Pacific Oceans",
    diet: "Seagrass and other marine plants",
    funFact: "Dugongs can stay underwater for up to 6 minutes and can swim up to 10 mph!"
  },
  {
    name: "Manatee",
    fact: "Manatees are large, gentle marine mammals that are closely related to elephants!",
    habitat: "Coastal waters, rivers, and estuaries in the Americas and West Africa",
    diet: "Seagrass, algae, and other aquatic plants",
    funFact: "Manatees can hold their breath for up to 20 minutes and can swim upside down!"
  },
  {
    name: "Orca",
    fact: "Orcas, also known as killer whales, are actually the largest species of dolphin.",
    habitat: "All oceans, from Arctic to Antarctic",
    diet: "Fish, seals, sea lions, and even other whales",
    funFact: "Orcas are highly intelligent and have complex social structures with their own 'languages'!"
  },
  {
    name: "Beluga Whale",
    fact: "Beluga whales are known as 'sea canaries' because of their high-pitched vocalizations.",
    habitat: "Arctic and sub-Arctic ocean waters",
    diet: "Fish, squid, and crustaceans",
    funFact: "Belugas can change the shape of their forehead to make different sounds!"
  },
  {
    name: "Barracuda",
    fact: "Barracudas are fast, predatory fish with sharp teeth and sleek bodies built for speed.",
    habitat: "Tropical and subtropical ocean waters worldwide",
    diet: "Fish, squid, and crustaceans",
    funFact: "Barracudas can swim at speeds of up to 27 mph and can grow to be 6 feet long!"
  },
  {
    name: "Lionfish",
    fact: "Lionfish are beautiful but venomous fish with long, flowing fins and spines.",
    habitat: "Coral reefs in the Indo-Pacific and Caribbean",
    diet: "Small fish and crustaceans",
    funFact: "Lionfish can eat prey up to half their own size and can survive for months without food!"
  },
  {
    name: "Pufferfish",
    fact: "Pufferfish can inflate their bodies to twice their normal size to scare away predators.",
    habitat: "Tropical and subtropical ocean waters worldwide",
    diet: "Algae, small invertebrates, and shellfish",
    funFact: "Pufferfish are the second most poisonous vertebrate in the world!"
  },
  {
    name: "Salmon",
    fact: "Salmon are famous for their incredible journey from ocean to freshwater to spawn.",
    habitat: "Ocean waters and freshwater rivers in the Northern Hemisphere",
    diet: "Small fish, squid, and crustaceans",
    funFact: "Salmon can smell their home river from hundreds of miles away!"
  },
  {
    name: "Tuna",
    fact: "Tuna are fast-swimming fish that can reach speeds of up to 75 km/h.",
    habitat: "Open oceans worldwide",
    diet: "Small fish, squid, and crustaceans",
    funFact: "Tuna are warm-blooded fish, which is very rare! This helps them swim in cold waters."
  },
  {
    name: "Swordfish",
    fact: "Swordfish have long, sword-like bills that they use to slash at prey and defend themselves.",
    habitat: "Open ocean waters worldwide",
    diet: "Fish, squid, and crustaceans",
    funFact: "Swordfish can swim at speeds of up to 60 mph and can dive to depths of 2,000 feet!"
  },
  {
    name: "Anglerfish",
    fact: "Anglerfish have a glowing lure on their head to attract prey in the dark deep sea.",
    habitat: "Deep ocean waters worldwide",
    diet: "Fish and crustaceans",
    funFact: "Male anglerfish are tiny and permanently attach themselves to females!"
  },
  {
    name: "Moray Eel",
    fact: "Moray eels are long, snake-like fish that hide in crevices and ambush their prey.",
    habitat: "Coral reefs and rocky ocean floors worldwide",
    diet: "Fish, octopuses, and crustaceans",
    funFact: "Moray eels have a second set of jaws in their throat that help them swallow prey!"
  },
  {
    name: "Sea Cucumber",
    fact: "Sea cucumbers are soft-bodied animals that clean the ocean floor by eating sand and debris.",
    habitat: "Ocean floors worldwide",
    diet: "Organic matter, algae, and tiny organisms",
    funFact: "Sea cucumbers can eject their internal organs as a defense mechanism and grow them back!"
  },
  {
    name: "Shrimp",
    fact: "Shrimp are small crustaceans that are important food sources for many ocean animals.",
    habitat: "Ocean floors and coral reefs worldwide",
    diet: "Algae, small animals, and dead organic matter",
    funFact: "Some shrimp can make loud snapping sounds by closing their claws very quickly!"
  },
  {
    name: "Lobster",
    fact: "Lobsters are large crustaceans with powerful claws and long antennae.",
    habitat: "Ocean floors in coastal waters worldwide",
    diet: "Fish, mollusks, and other crustaceans",
    funFact: "Lobsters can live for over 100 years and never stop growing!"
  },
  {
    name: "Crab",
    fact: "Crabs are crustaceans with a hard exoskeleton and ten legs.",
    habitat: "Oceans, freshwater, and land",
    diet: "Omnivores - eat plants, algae, mollusks, and small fish",
    funFact: "Some crabs can walk sideways! They have specialized legs for this movement."
  },
  {
    name: "Manta Ray",
    fact: "Manta rays are gentle giants with wingspans up to 29 feet wide.",
    habitat: "Tropical and subtropical oceans",
    diet: "Plankton, small fish, and crustaceans",
    funFact: "Manta rays are the only fish that can jump completely out of the water!"
  },
  {
    name: "Stingray",
    fact: "Stingrays are flat fish with long, whip-like tails that can deliver painful stings.",
    habitat: "Ocean floors in coastal waters worldwide",
    diet: "Fish, crustaceans, and mollusks",
    funFact: "Stingrays can sense the electrical signals given off by their prey!"
  },
  {
    name: "Seahorse",
    fact: "Seahorses are unique fish with horse-like heads and prehensile tails.",
    habitat: "Coral reefs and seagrass beds worldwide",
    diet: "Small crustaceans and plankton",
    funFact: "Male seahorses carry and give birth to the babies!"
  },
  {
    name: "Clownfish",
    fact: "Clownfish live in a symbiotic relationship with sea anemones for protection.",
    habitat: "Coral reefs in warm waters",
    diet: "Small invertebrates and algae",
    funFact: "All clownfish are born male! The largest one becomes female and can change back if needed."
  },
  {
    name: "Sea Turtle",
    fact: "Sea turtles have been swimming in our oceans for over 100 million years.",
    habitat: "Tropical and subtropical oceans",
    diet: "Jellyfish, seaweed, and small marine animals",
    funFact: "Sea turtles can navigate thousands of miles using Earth's magnetic field!"
  },
  {
    name: "Jellyfish",
    fact: "Jellyfish have been around for over 500 million years - they're older than dinosaurs!",
    habitat: "All ocean depths",
    diet: "Small fish, plankton, and other jellyfish",
    funFact: "Some jellyfish are immortal! The Turritopsis dohrnii can revert to its juvenile form."
  },
  {
    name: "Squid",
    fact: "Squid are cephalopods with eight arms and two longer tentacles.",
    habitat: "Deep ocean waters",
    diet: "Fish, crustaceans, and other squid",
    funFact: "Squid can change color instantly using special cells called chromatophores!"
  },
  {
    name: "Octopus",
    fact: "Octopuses are incredibly intelligent invertebrates with eight arms and three hearts.",
    habitat: "Ocean floors and coral reefs",
    diet: "Crabs, fish, and other marine animals",
    funFact: "Octopuses can solve puzzles, use tools, and even escape from aquariums!"
  },
  {
    name: "Great White Shark",
    fact: "Great white sharks are apex predators with powerful jaws and excellent senses.",
    habitat: "Coastal and open ocean waters",
    diet: "Seals, sea lions, fish, and other marine mammals",
    funFact: "Great whites can detect a single drop of blood in 100 liters of water!"
  },
  {
    name: "Humpback Whale",
    fact: "Humpback whales are known for their beautiful songs and acrobatic breaching behavior.",
    habitat: "All oceans worldwide",
    diet: "Krill, small fish, and plankton",
    funFact: "Humpback whale songs can travel for thousands of miles and last for hours!"
  },
  {
    name: "Dolphin",
    fact: "Dolphins are highly intelligent marine mammals known for their playful behavior.",
    habitat: "Oceans and some rivers worldwide",
    diet: "Fish, squid, and crustaceans",
    funFact: "Dolphins can recognize themselves in mirrors, showing self-awareness!"
  }
];

const SeaAnimalsCards: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const currentAnimal = seaAnimals[currentIndex];
  const currentFact = seaAnimalFacts.find(fact => 
    fact.name.toLowerCase() === currentAnimal.name.toLowerCase()
  ) || seaAnimalFacts[0];

  const nextAnimal = () => {
    setCurrentIndex((prev) => (prev + 1) % seaAnimals.length);
    setImageError(false);
  };

  const previousAnimal = () => {
    setCurrentIndex((prev) => (prev - 1 + seaAnimals.length) % seaAnimals.length);
    setImageError(false);
  };

  const goToAnimal = (index: number) => {
    setCurrentIndex(index);
    setImageError(false);
  };

  return (
    <div className="quiz-container">
      <div className="question-container">
        <div className="dinosaur-image">
          <img 
            src={currentAnimal.image} 
            alt={`Sea Animal: ${currentAnimal.name}`}
            onError={(e) => {
              console.error(`Failed to load image: ${currentAnimal.image}`);
              setImageError(true);
            }}
            onLoad={() => setImageError(false)}
          />
          {imageError && (
            <div className="image-error">
              <p>🐠 Image not available</p>
              <p>Learning about: {currentAnimal.name}</p>
            </div>
          )}
        </div>
        
        <h2 className="question-text">
          {currentAnimal.name}
        </h2>

        <div className="options-grid" style={{ gridTemplateColumns: '1fr', gap: '1rem' }}>
          <div className="option-button" style={{ textAlign: 'left', flexDirection: 'column', alignItems: 'flex-start' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#667eea' }}>📖 About</h3>
            <p style={{ margin: '0 0 1rem 0', lineHeight: '1.6' }}>{currentFact.fact}</p>
            
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#667eea' }}>🏠 Habitat</h3>
            <p style={{ margin: '0 0 1rem 0', lineHeight: '1.6' }}>{currentFact.habitat}</p>
            
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#667eea' }}>🍽️ Diet</h3>
            <p style={{ margin: '0 0 1rem 0', lineHeight: '1.6' }}>{currentFact.diet}</p>
            
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#667eea' }}>🎯 Fun Fact</h3>
            <p style={{ margin: '0', lineHeight: '1.6', fontStyle: 'italic' }}>{currentFact.funFact}</p>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button 
            className="start-button" 
            onClick={previousAnimal}
            style={{ fontSize: '1rem', padding: '0.8rem 1.5rem' }}
          >
            ← Previous
          </button>
          
          <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#666' }}>
            {currentIndex + 1} of {seaAnimals.length}
          </span>
          
          <button 
            className="start-button" 
            onClick={nextAnimal}
            style={{ fontSize: '1rem', padding: '0.8rem 1.5rem' }}
          >
            Next →
          </button>
        </div>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <h3 style={{ marginBottom: '1rem', color: '#333' }}>Quick Navigation</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
            {seaAnimals.map((animal, index) => (
              <button
                key={index}
                onClick={() => goToAnimal(index)}
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
                {animal.name}
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

export default SeaAnimalsCards;
