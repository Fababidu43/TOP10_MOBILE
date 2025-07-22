import { QuizCategory } from '@/contexts/QuizContext';
import { Film, Tv, Gamepad2, MapPin, Music, Award } from 'lucide-react-native';

export const QUIZ_CATEGORIES: QuizCategory[] = [
  {
    id: 'movies-2000s',
    title: 'Films des années 2000',
    description: 'Les blockbusters qui ont marqué la décennie',
    difficulty: 'Facile',
    color: '#D97706',
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
    color: '#B91C1C',
    items: [
      'Stranger Things',
      'Mercredi',
      'La Casa de Papel',
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
      'Mercredi Addams a conquis le monde avec sa danse iconique et son humour noir.',
      'La Casa de Papel est devenue un phénomène mondial avec ses braquages spectaculaires.',
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
    color: '#7C2D12',
    items: [
      'Minecraft',
      'Grand Theft Auto V',
      'Tetris',
      'Wii Sports',
      'PUBG',
      'Super Mario Bros',
      'Mario Kart 8',
      'Red Dead Redemption 2',
      'The Witcher 3',
      'Call of Duty Modern Warfare'
    ],
    explanations: [
      'Minecraft a révolutionné le gaming avec son monde ouvert en blocs et sa créativité infinie.',
      'GTA V continue de dominer les ventes grâce à son monde ouvert et GTA Online.',
      'Tetris reste le puzzle game le plus addictif et intemporel de tous les temps.',
      'Wii Sports a démocratisé le gaming motion avec la Nintendo Wii.',
      'PUBG a popularisé le genre Battle Royale avant Fortnite.',
      'Super Mario Bros a sauvé l\'industrie du jeu vidéo dans les années 80.',
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
    color: '#166534',
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
    title: 'Hits musicaux français',
    description: 'Les chansons françaises les plus populaires',
    difficulty: 'Facile',
    color: '#EA580C',
    items: [
      'Dernière Danse - Indila',
      'Alors on Danse - Stromae',
      'Je Veux - Zaz',
      'Papaoutai - Stromae',
      'Formidable - Stromae',
      'Tous les Mêmes - Stromae',
      'La Vie en Rose - Édith Piaf',
      'Non, je ne Regrette Rien - Édith Piaf',
      'Comme d\'Habitude - Claude François',
      'Alexandrie Alexandra - Claude François'
    ],
    explanations: [
      'Dernière Danse d\'Indila est devenu un phénomène mondial avec plus de 800 millions de vues.',
      'Alors on Danse de Stromae a marqué le retour de la chanson française dans les charts internationaux.',
      'Je Veux de Zaz a conquis le monde avec sa fraîcheur et son authenticité.',
      'Papaoutai de Stromae aborde avec génie la figure paternelle absente.',
      'Formidable de Stromae raconte une rupture amoureuse avec une mélodie inoubliable.',
      'Tous les Mêmes de Stromae critique avec humour les relations hommes-femmes.',
      'La Vie en Rose d\'Édith Piaf reste l\'une des chansons françaises les plus connues au monde.',
      'Non, je ne Regrette Rien d\'Édith Piaf est devenue un hymne à la résilience.',
      'Comme d\'Habitude de Claude François a inspiré "My Way" de Frank Sinatra.',
      'Alexandrie Alexandra de Claude François reste un classique de la chanson française.'
    ],
    hints: [
      ['Indila', 'Danse', 'Mélancolie'],
      ['Stromae', 'Danse', 'Électro'],
      ['Zaz', 'Authenticité', 'Accordéon'],
      ['Stromae', 'Papa', 'Père absent'],
      ['Stromae', 'Rupture', 'Alcool'],
      ['Stromae', 'Hommes femmes', 'Critique'],
      ['Édith Piaf', 'Rose', 'Amour'],
      ['Édith Piaf', 'Regrets', 'Résilience'],
      ['Claude François', 'Habitude', 'My Way'],
      ['Claude François', 'Alexandrie', 'Égypte']
    ]
  },
  {
    id: 'sports',
    title: 'Sportifs français légendaires',
    description: 'Les plus grands athlètes français',
    difficulty: 'Difficile',
    color: '#B91C1C',
    items: [
      'Zinédine Zidane',
      'Michel Platini',
      'Thierry Henry',
      'Yannick Noah',
      'Sébastien Loeb',
      'Teddy Riner',
      'Marie-José Pérec',
      'Laure Manaudou',
      'Tony Parker',
      'Alain Prost'
    ],
    explanations: [
      'Zinédine Zidane est considéré comme l\'un des plus grands footballeurs de tous les temps.',
      'Michel Platini a dominé le football européen dans les années 80.',
      'Thierry Henry reste le meilleur buteur de l\'histoire de l\'équipe de France.',
      'Yannick Noah a remporté Roland-Garros et mené la France vers la Coupe Davis.',
      'Sébastien Loeb a révolutionné le rallye avec ses 9 titres mondiaux consécutifs.',
      'Teddy Riner domine le judo mondial depuis plus de 15 ans.',
      'Marie-José Pérec a marqué l\'athlétisme français avec ses titres olympiques.',
      'Laure Manaudou a été la reine de la natation française.',
      'Tony Parker a brillé en NBA et avec l\'équipe de France.',
      'Alain Prost reste une légende de la Formule 1 avec ses 4 titres mondiaux.'
    ],
    hints: [
      ['Football', 'Real Madrid', 'Coup de tête 2006'],
      ['Football', 'Années 80', 'Ballon d\'Or'],
      ['Football', 'Arsenal', 'Buteur historique'],
      ['Tennis', 'Roland-Garros', 'Coupe Davis'],
      ['Rallye', '9 titres', 'Citroën'],
      ['Judo', 'Heavyweight', 'Invincible'],
      ['Athlétisme', '400m', 'Jeux Olympiques'],
      ['Natation', 'Dos crawlé', 'Championne'],
      ['Basketball', 'NBA', 'San Antonio Spurs'],
      ['Formule 1', '4 titres', 'Professeur']
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