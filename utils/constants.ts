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
      'pirates des caraïbes le secret du coffre maudits',
      'The Dark Knight',
      'Harry Potter and the Philosopher\'s Stone',
      'pirates des caraïbes : la malédiction du black pearl',
      'Star Wars: Episode III – Revenge of the Sith',
      'The Lord of the Rings: The Two Towers',
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
      'Wednesday',
      'Money Heist',
      'Bridgerton',
      'The Witcher',
      'Ozark',
      'The Crown',
      'Lucifer',
      'You',
      'Elite'
    ],
    explanations: [
      'Stranger Things a révolutionné Netflix avec son mélange de nostalgie 80s et de science-fiction.',
      'Wednesday Addams a conquis le monde avec sa danse iconique et son humour noir.',
      'La Casa de Papel (Money Heist) est devenue un phénomène mondial avec ses braquages spectaculaires.',
      'Bridgerton a modernisé le genre période avec sa diversité et ses romances passionnées.',
      'The Witcher a adapté avec succès l\'univers fantasy d\'Andrzej Sapkowski.',
      'Ozark a captivé avec son thriller familial sombre dans les Ozarks.',
      'The Crown offre un regard intime sur la famille royale britannique.',
      'Lucifer a mélangé comédie, romance et procédural avec charme.',
      'You explore les dérives des réseaux sociaux et de l\'obsession amoureuse.',
      'Elite combine teen drama espagnol et thriller psychologique.'
    ],
    hints: [
      ['Années 80', 'Hawkins', 'Demogorgon'],
      ['Famille Addams', 'Académie Nevermore', 'Danse virale'],
      ['Braquage', 'Professeur', 'Bella Ciao'],
      ['Régence anglaise', 'Famille Bridgerton', 'Romance période'],
      ['Geralt de Riv', 'Sorceleur', 'Yennefer'],
      ['Blanchiment d\'argent', 'Famille Byrde', 'Missouri'],
      ['Famille royale', 'Elizabeth II', 'Buckingham'],
      ['Diable', 'LAPD', 'Boîte de nuit'],
      ['Stalker', 'Librairie', 'Réseaux sociaux'],
      ['Lycée privé', 'Las Encinas', 'Secrets']
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
    ],
    explanations: [
      'Minecraft a révolutionné le gaming avec son monde ouvert en blocs et sa créativité infinie.',
      'GTA V continue de dominer les ventes grâce à son monde ouvert et GTA Online.',
      'Tetris reste le puzzle game le plus addictif et intemporel de tous les temps.',
      'Wii Sports a démocratisé le gaming motion avec la Nintendo Wii.',
      'PUBG a popularisé le genre Battle Royale avant Fortnite.',
      'Super Mario Bros. a sauvé l\'industrie du jeu vidéo dans les années 80.',
      'Mario Kart 8 perfectionne la formule de course arcade de Nintendo.',
      'Red Dead Redemption 2 offre l\'expérience western la plus immersive.',
      'The Witcher 3 définit le standard des RPG modernes avec ses quêtes.',
      'Call of Duty Modern Warfare a révolutionné les FPS militaires.'
    ],
    hints: [
      ['Blocs', 'Créativité', 'Survie'],
      ['Los Santos', 'Braquages', 'Monde ouvert'],
      ['Puzzle', 'Blocs qui tombent', 'Lignes'],
      ['Nintendo Wii', 'Motion', 'Sports'],
      ['Battle Royale', '100 joueurs', 'Zone'],
      ['Plombier', 'Champignons', 'Princesse'],
      ['Course', 'Kart', 'Objets'],
      ['Western', 'Arthur Morgan', 'Cow-boys'],
      ['Geralt', 'RPG', 'Quêtes'],
      ['FPS', 'Militaire', 'Multijoueur']
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
    ],
    explanations: [
      'La France reste la destination touristique #1 mondiale avec Paris et ses régions.',
      'L\'Espagne attire avec ses plages, sa culture et sa gastronomie méditerranéenne.',
      'Les États-Unis offrent une diversité incroyable de paysages et d\'expériences.',
      'La Chine fascine avec son histoire millénaire et sa modernité.',
      'L\'Italie séduit par son patrimoine artistique et sa dolce vita.',
      'La Turquie mélange Orient et Occident avec Istanbul et la Cappadoce.',
      'Le Mexique enchante avec ses plages paradisiaques et sa culture maya.',
      'La Thaïlande est le paradis tropical avec temples et street food.',
      'L\'Allemagne impressionne par son histoire et ses châteaux.',
      'Le Royaume-Uni charme avec Londres et ses traditions.'
    ],
    hints: [
      ['Tour Eiffel', 'Paris', 'Baguette'],
      ['Flamenco', 'Paella', 'Madrid'],
      ['Statue de la Liberté', 'Grand Canyon', 'Hollywood'],
      ['Grande Muraille', 'Pékin', 'Pandas'],
      ['Colisée', 'Rome', 'Pizza'],
      ['Istanbul', 'Cappadoce', 'Bosphore'],
      ['Cancún', 'Tequila', 'Mayas'],
      ['Bangkok', 'Temples', 'Pad Thaï'],
      ['Berlin', 'Oktoberfest', 'Châteaux'],
      ['Londres', 'Big Ben', 'Thé']
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
    ],
    explanations: [
      'Flowers de Miley Cyrus est devenu un hymne d\'indépendance féminine viral.',
      'As It Was d\'Harry Styles a dominé les charts avec sa mélodie nostalgique.',
      'Unholy a marqué la collaboration parfaite entre Sam Smith et Kim Petras.',
      'Anti-Hero de Taylor Swift explore ses insécurités avec génie.',
      'Calm Down a créé un pont parfait entre Afrobeat et pop mainstream.',
      'Shivers d\'Ed Sheeran continue sa série de hits romantiques.',
      'Bad Habit de Steve Lacy a conquis TikTok avec son groove irrésistible.',
      'About Damn Time de Lizzo célèbre la confiance en soi avec énergie.',
      'Heat Waves de Glass Animals a eu une longévité exceptionnelle.',
      'Stay a prouvé la puissance des collaborations pop modernes.'
    ],
    hints: [
      ['Miley Cyrus', 'Indépendance', 'Viral'],
      ['Harry Styles', 'Nostalgie', 'Solo'],
      ['Sam Smith', 'Kim Petras', 'Collaboration'],
      ['Taylor Swift', 'Insécurités', 'Introspection'],
      ['Rema', 'Selena Gomez', 'Afrobeat'],
      ['Ed Sheeran', 'Romance', 'Guitare'],
      ['Steve Lacy', 'TikTok', 'Groove'],
      ['Lizzo', 'Confiance', 'Énergie'],
      ['Glass Animals', 'Longévité', 'Indie'],
      ['Kid LAROI', 'Justin Bieber', 'Pop']
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
    ],
    explanations: [
      'Michael Jordan a transcendé le basketball pour devenir une icône mondiale.',
      'Lionel Messi est considéré comme le plus grand footballeur de tous les temps.',
      'Serena Williams a dominé le tennis féminin pendant deux décennies.',
      'Muhammad Ali était "The Greatest" boxeur et activiste social.',
      'Tom Brady a remporté 7 Super Bowls, record absolu en NFL.',
      'Usain Bolt détient tous les records du sprint et reste imbattable.',
      'Michael Phelps est l\'athlète olympique le plus titré de l\'histoire.',
      'Cristiano Ronaldo combine longévité et excellence au plus haut niveau.',
      'Tiger Woods a révolutionné le golf et reste une légende vivante.',
      'LeBron James continue de dominer la NBA après 20 ans de carrière.'
    ],
    hints: [
      ['Basketball', 'Chicago Bulls', 'Air Jordan'],
      ['Football', 'Argentine', 'Barcelone'],
      ['Tennis', 'Grand Chelem', 'Puissance'],
      ['Boxe', 'The Greatest', 'Cassius Clay'],
      ['NFL', 'Quarterback', '7 Super Bowls'],
      ['Sprint', 'Jamaïque', 'Éclair'],
      ['Natation', 'Olympique', '23 médailles d\'or'],
      ['Football', 'Portugal', 'Real Madrid'],
      ['Golf', 'Masters', 'Comeback'],
      ['Basketball', 'Lakers', 'King James']
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