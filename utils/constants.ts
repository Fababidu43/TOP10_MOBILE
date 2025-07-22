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
      'The Lord of the Rings: The Return of the King',
      'Pirates of the Caribbean: Dead Man\'s Chest',
      'The Dark Knight',
      'Harry Potter and the Philosopher\'s Stone',
      'Pirates of the Caribbean: The Curse of the Black Pearl',
      'Star Wars: Episode III – Revenge of the Sith',
      'The Lord of the Rings: The Two Towers',
      'Shrek 2'
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
      'Wednesday',
      'Money Heist',
      'Bridgerton',
      'The Witcher',
      'Ozark',
      'The Crown',
      'Lucifer',
      'You',
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