import { QuizCategory } from '@/contexts/QuizContext';
import { Film, Tv, Gamepad2, MapPin, Music, Award } from 'lucide-react-native';

export const QUIZ_CATEGORIES: QuizCategory[] = [
  {
    id: 'movies-2000s',
    title: 'Films des années 2000',
    description: 'Les blockbusters qui ont marqué la décennie',
    difficulty: 'Facile',
    color: '#2563EB',
    items: [
      'Avatar',
      'Titanic',
      'Le Seigneur des Anneaux : Le Retour du Roi',
      'Pirates des Caraïbes : Le Secret du Coffre Maudit',
      'The Dark Knight',
      'Harry Potter à l\'École des Sorciers',
      'Pirates des Caraïbes : La Malédiction du Black Pearl',
      'Star Wars Episode III : La Revanche des Sith',
      'Le Seigneur des Anneaux : Les Deux Tours',
      'Shrek 2'
    ],
    explanations: [
      'Avatar de James Cameron a révolutionné le cinéma avec ses effets visuels 3D et a généré plus de 2,9 milliards de dollars au box-office mondial.',
      'Titanic reste l\'un des films les plus emblématiques de tous les temps, combinant romance épique et reconstitution historique.',
      'Le Retour du Roi a couronné la trilogie du Seigneur des Anneaux avec 11 Oscars, un record encore inégalé.',
      'Pirates des Caraïbes 2 a capitalisé sur le succès du premier film avec des effets spéciaux spectaculaires.',
      'The Dark Knight de Christopher Nolan a redéfini le genre super-héroïque avec une approche plus sombre et réaliste.',
      'Harry Potter à l\'école des sorciers a lancé une franchise qui a marqué toute une génération.',
      'Le premier Pirates des Caraïbes a relancé la carrière de Johnny Depp et créé un personnage iconique.',
      'Star Wars Episode III a conclu la prélogie avec des scènes d\'action épiques et l\'origine de Dark Vador.',
      'Les Deux Tours a maintenu la qualité de la trilogie avec la bataille du Gouffre de Helm.',
      'Shrek 2 a prouvé que les suites d\'animation pouvaient surpasser l\'original en termes de succès commercial.'
    ],
    hints: [
      ['Film en 3D révolutionnaire', 'Planète Pandora', 'James Cameron'],
      ['Naufrage célèbre', 'Leonardo DiCaprio', 'Rose et Jack'],
      ['Trilogie fantasy', '11 Oscars', 'Retour du roi'],
      ['Pirates et malédiction', 'Johnny Depp', 'Coffre du mort'],
      ['Super-héros sombre', 'Joker iconique', 'Christopher Nolan'],
      ['École de magie', 'Garçon à lunettes', 'J.K. Rowling'],
      ['Premier film pirates', 'Malédiction de la perle noire', 'Jack Sparrow'],
      ['Prélogie Star Wars', 'Anakin devient Vador', 'Vengeance des Sith'],
      ['Deuxième film LOTR', 'Bataille du Gouffre de Helm', 'Gollum'],
      ['Suite d\'animation', 'Ogre vert', 'Chat Potté']
    ]
  },
  {
    id: 'netflix-series',
    title: 'Séries Netflix',
    description: 'Les séries les plus regardées sur Netflix',
    difficulty: 'Moyen',
    color: '#DC2626',
    items: [
      'Stranger Things',
      'Mercredi',
      'La Casa de Papel',
      'Bridgerton',
      'The Witcher',
      'Ozark',
      'La Couronne',
      'Lucifer',
      'Toi',
      'Elite'
    ]
  },
  {
    id: 'video-games',
    title: 'Jeux vidéo populaires',
    description: 'Les jeux les plus vendus de tous les temps',
    difficulty: 'Difficile',
    color: '#7C3AED',
    items: [
      'Minecraft',
      'Grand Theft Auto V',
      'Tetris',
      'Wii Sports',
      'PUBG',
      'Super Mario Bros.',
      'Mario Kart 8',
      'Red Dead Redemption 2',
      'The Witcher 3',
      'Call of Duty: Modern Warfare'
    ]
  },
  {
    id: 'destinations',
    title: 'Destinations de rêve',
    description: 'Les pays les plus visités au monde',
    difficulty: 'Moyen',
    color: '#059669',
    items: [
      'France',
      'Espagne',
      'États-Unis',
      'Chine',
      'Italie',
      'Turquie',
      'Mexique',
      'Thaïlande',
      'Allemagne',
      'Royaume-Uni'
    ]
  },
  {
    id: 'music-hits',
    title: 'Hits musicaux',
    description: 'Les chansons les plus écoutées en 2024',
    difficulty: 'Facile',
    color: '#F97316',
    items: [
      'Flowers - Miley Cyrus',
      'As It Was - Harry Styles',
      'Unholy - Sam Smith ft. Kim Petras',
      'Anti-Hero - Taylor Swift',
      'Calm Down - Rema & Selena Gomez',
      'Shivers - Ed Sheeran',
      'Bad Habit - Steve Lacy',
      'About Damn Time - Lizzo',
      'Heat Waves - Glass Animals',
      'Stay - The Kid LAROI & Justin Bieber'
    ]
  },
  {
    id: 'sports',
    title: 'Champions sportifs',
    description: 'Les plus grands athlètes de l\'histoire',
    difficulty: 'Difficile',
    color: '#DC2626',
    items: [
      'Michael Jordan',
      'Lionel Messi',
      'Serena Williams',
      'Muhammad Ali',
      'Tom Brady',
      'Usain Bolt',
      'Michael Phelps',
      'Cristiano Ronaldo',
      'Tiger Woods',
      'LeBron James'
    ]
  },
];

export const CATEGORY_ICONS = {
  'movies-2000s': Film,
  'netflix-series': Tv,
  'video-games': Gamepad2,
  'destinations': MapPin,
  'music-hits': Music,
  'sports': Award,
};

export const TIMER_DURATION = 300; // 5 minutes en secondes
export const MAX_ATTEMPTS_PER_ITEM = 3;
export const POINTS_PER_CORRECT_ANSWER = [3, 2, 1]; // Points dégressifs

export const ACHIEVEMENT_TYPES = {
  PERFECT_SCORE: 'perfect-score',
  SPEED_DEMON: 'speed-demon',
  SOCIAL_BUTTERFLY: 'social-butterfly',
  DAILY_PLAYER: 'daily-player',
} as const;