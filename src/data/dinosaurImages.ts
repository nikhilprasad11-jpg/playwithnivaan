// Import all dinosaur images
import AnkylosaurusImg from '../assets/images/ankylosaurus.jpg';
import ApatosaurusImg from '../assets/images/apatosaurus.jpg';
import ArchaeopteryxImg from '../assets/images/Archaeopteryx.jpg';
import ArgentinosaurusImg from '../assets/images/Argentinosaurus.jpg';
import BaryonyxImg from '../assets/images/Baryonyx.jpg';
import BrachiosaurusImg from '../assets/images/Brachiosaurus.jpg';
import CompsognathusImg from '../assets/images/Compsognathus.jpg';
import DilophosaurusImg from '../assets/images/Dilophosaurus.jpg';
import DiplodocusImg from '../assets/images/Diplodocus.jpg';
import GallimimusImg from '../assets/images/Gallimimus.jpg';
import GiganotosaurusImg from '../assets/images/Giganotosaurus.jpg';
import IguanodonImg from '../assets/images/Iguanodon.jpg';

// New WebP images
import MaiasauraImg from '../assets/images/MAIASAURA.webp';
import OlorotitanImg from '../assets/images/Olorotitan.webp';
import BaryonyxWebpImg from '../assets/images/BARYONYX.webp';
import TriceratopsImg from '../assets/images/TRICERATOPS.webp';
import PentaceratopsImg from '../assets/images/PENTACERATOPS.webp';
import ParasaurolophusImg from '../assets/images/PARASAUROLOPHUS.webp';
import DilophosaurusWebpImg from '../assets/images/Dilophosaurus.webp';

// New JPEG images
import VelociraptorImg from '../assets/images/velociraptor.jpeg';
import ArchaeopteryxJpegImg from '../assets/images/ARCHAEOPTERYX.jpeg';
import SpinosaurusImg from '../assets/images/SPINOSAURUS.jpeg';
import UtahraptorImg from '../assets/images/Utahraptor.jpeg';
import TroodonImg from '../assets/images/Troodon.jpeg';
import OviraptorImg from '../assets/images/Oviraptor.jpeg';
import PachycephalosaurusImg from '../assets/images/Pachycephalosaurus.jpeg';
import AllosaurusImg from '../assets/images/Allosaurus.jpeg';
import ApatosaurusJpegImg from '../assets/images/Apatosaurus.jpeg';
import DiplodocusJpegImg from '../assets/images/Diplodocus.jpeg';

// New JPG images
import PlateosaurusImg from '../assets/images/Plateosaurus.jpg';

// New PNG images
import IguanodonPngImg from '../assets/images/IGUANODON.png';

export interface Dinosaur {
  name: string;
  image: string;
}

export const dinosaurs: Dinosaur[] = [
  {
    name: "Ankylosaurus",
    image: AnkylosaurusImg
  },
  {
    name: "Apatosaurus",
    image: ApatosaurusImg
  },
  {
    name: "Archaeopteryx",
    image: ArchaeopteryxImg
  },
  {
    name: "Argentinosaurus",
    image: ArgentinosaurusImg
  },
  {
    name: "Baryonyx",
    image: BaryonyxImg
  },
  {
    name: "Brachiosaurus",
    image: BrachiosaurusImg
  },
  {
    name: "Compsognathus",
    image: CompsognathusImg
  },
  {
    name: "Dilophosaurus",
    image: DilophosaurusImg
  },
  {
    name: "Diplodocus",
    image: DiplodocusImg
  },
  {
    name: "Gallimimus",
    image: GallimimusImg
  },
  {
    name: "Giganotosaurus",
    image: GiganotosaurusImg
  },
  {
    name: "Iguanodon",
    image: IguanodonImg
  },
  // New WebP dinosaurs
  {
    name: "Maiasaura",
    image: MaiasauraImg
  },
  {
    name: "Olorotitan",
    image: OlorotitanImg
  },
  {
    name: "Triceratops",
    image: TriceratopsImg
  },
  {
    name: "Pentaceratops",
    image: PentaceratopsImg
  },
  {
    name: "Parasaurolophus",
    image: ParasaurolophusImg
  },
  // New JPEG dinosaurs
  {
    name: "Velociraptor",
    image: VelociraptorImg
  },
  {
    name: "Spinosaurus",
    image: SpinosaurusImg
  },
  {
    name: "Utahraptor",
    image: UtahraptorImg
  },
  {
    name: "Troodon",
    image: TroodonImg
  },
  {
    name: "Oviraptor",
    image: OviraptorImg
  },
  {
    name: "Pachycephalosaurus",
    image: PachycephalosaurusImg
  },
  {
    name: "Allosaurus",
    image: AllosaurusImg
  },
  {
    name: "Diplodocus",
    image: DiplodocusJpegImg
  },
  // New JPG dinosaurs
  {
    name: "Plateosaurus",
    image: PlateosaurusImg
  },
  // New PNG dinosaurs
  {
    name: "Iguanodon",
    image: IguanodonPngImg
  }
];
