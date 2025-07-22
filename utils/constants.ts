import { QuizCategory } from '@/contexts/QuizContext';
import { Film, Tv, Gamepad2, MapPin, Music, Award } from 'lucide-react-native';

export const QUIZ_CATEGORIES: QuizCategory[] = [
  {
    id: 'movies-2000s',
    title: 'Films français populaires',
    description: 'Les films français les plus populaires',
    difficulty: 'Facile',
    color: '#DC2626',
    items: [
      'Le Fabuleux Destin d\'Amelie Poulain',
      'Intouchables',
      'Bienvenue chez les Ch\'tis',
      'Les Visiteurs',
      'Asterix et Obelix Mission Cleopatre',
      'Le Diner de Cons',
      'La Grande Vadrouille',
      'Les Bronzes',
      'Taxi',
      'Le Pere Noel est une Ordure'
    ],
    explanations: [
      'Le Fabuleux Destin d\'Amelie Poulain de Jean-Pierre Jeunet a conquis le monde entier avec sa poesie visuelle.',
      'Titanic reste l\'un des films les plus emblématiques de tous les temps, combinant romance épique et reconstitution historique.',
      'Bienvenue chez les Ch\'tis a battu tous les records du box-office francais.',
      'Pirates des Caraïbes 2 a capitalisé sur le succès du premier film avec des effets spéciaux spectaculaires.',
      'Asterix et Obelix Mission Cleopatre reste la meilleure adaptation des BD d\'Uderzo.',
      'Le Diner de Cons de Francis Veber est un chef-d\'oeuvre du theatre adapte au cinema.',
      'La Grande Vadrouille avec Bourvil et de Funes reste un classique intemporel.',
      'Les Bronzes ont cree un nouveau genre de comedie a la francaise.',
      'Les Deux Tours a maintenu la qualité de la trilogie avec la bataille du Gouffre de Helm.',
      'Le Pere Noel est une Ordure du Splendid reste culte avec ses repliques memorables.'
    ],
    hints: [
      ['Film de Jean-Pierre Jeunet', 'Montmartre', 'Audrey Tautou'],
      ['Naufrage célèbre', 'Leonardo DiCaprio', 'Rose et Jack'],
      ['Nord de la France', 'Dany Boon', 'Accent ch\'ti'],
      ['Moyen Age', 'Jean Reno', 'Voyage dans le temps'],
      ['Asterix', 'Jamel Debbouze', 'Egypte antique'],
      ['École de magie', 'Garçon à lunettes', 'J.K. Rowling'],
      ['Bourvil', 'Louis de Funes', 'Seconde Guerre mondiale'],
      ['Prélogie Star Wars', 'Anakin devient Vador', 'Vengeance des Sith'],
      ['Deuxième film LOTR', 'Bataille du Gouffre de Helm', 'Gollum'],
      ['Splendid', 'Noel', 'SDF']
    ]
  },
  {
    id: 'netflix-series',
    title: 'Series Netflix',
    description: 'Les series les plus regardees sur Netflix',
    difficulty: 'Moyen',
    color: '#DC2626',
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
      'Stranger Things a revolutionne Netflix avec son melange de nostalgie 80s et de science-fiction.',
      'Mercredi Addams a conquis le monde avec sa danse iconique et son humour noir.',
      'La Casa de Papel est devenue un phenomene mondial avec ses braquages spectaculaires.',
      'Bridgerton a modernise le genre periode avec sa diversite et ses romances passionnees.',
      'The Witcher a adapte avec succes l\'univers fantasy d\'Andrzej Sapkowski.',
      'Ozark a captivé avec son thriller familial sombre dans les Ozarks.',
      'The Crown offre un regard intime sur la famille royale britannique.',
      'Lucifer a melange comedie, romance et procedural avec charme.',
      'You explore les derives des reseaux sociaux et de l\'obsession amoureuse.',
      'Elite combine teen drama espagnol et thriller psychologique.'
    ],
    hints: [
      ['Annees 80', 'Hawkins', 'Demogorgon'],
      ['Famille Addams', 'Academie Nevermore', 'Danse virale'],
      ['Braquage', 'Professeur', 'Bella Ciao'],
      ['Regence anglaise', 'Famille Bridgerton', 'Romance periode'],
      ['Geralt de Riv', 'Sorceleur', 'Yennefer'],
      ['Blanchiment d\'argent', 'Famille Byrde', 'Missouri'],
      ['Famille royale', 'Elizabeth II', 'Buckingham'],
      ['Diable', 'LAPD', 'Boîte de nuit'],
      ['Stalker', 'Librairie', 'Reseaux sociaux'],
      ['Lycee prive', 'Las Encinas', 'Secrets']
    ]
  },
  {
    id: 'video-games',
    title: 'Jeux video populaires',
    description: 'Les jeux les plus vendus de tous les temps',
    difficulty: 'Difficile',
    color: '#B45309',
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
      'Minecraft a revolutionne le gaming avec son monde ouvert en blocs et sa creativite infinie.',
      'GTA V continue de dominer les ventes grâce à son monde ouvert et GTA Online.',
      'Tetris reste le puzzle game le plus addictif et intemporel de tous les temps.',
      'Wii Sports a democratise le gaming motion avec la Nintendo Wii.',
      'PUBG a popularise le genre Battle Royale avant Fortnite.',
      'Super Mario Bros a sauve l\'industrie du jeu video dans les annees 80.',
      'Mario Kart 8 perfectionne la formule de course arcade de Nintendo.',
      'Red Dead Redemption 2 offre l\'expérience western la plus immersive.',
      'The Witcher 3 definit le standard des RPG modernes avec ses quetes.',
      'Call of Duty Modern Warfare a revolutionne les FPS militaires.'
    ],
    hints: [
      ['Blocs', 'Creativite', 'Survie'],
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
    title: 'Destinations de reve',
    description: 'Les pays les plus visites au monde',
    difficulty: 'Moyen',
    color: '#166534',
    items: [
      'France',
      'Espagne',
      'Etats-Unis',
      'Chine',
      'Italie',
      'Turquie',
      'Mexique',
      'Thailande',
      'Allemagne',
      'Royaume-Uni'
    ],
    explanations: [
      'La France reste la destination touristique numero 1 mondiale avec Paris et ses regions.',
      'L\'Espagne attire avec ses plages, sa culture et sa gastronomie mediterraneenne.',
      'Les Etats-Unis offrent une diversite incroyable de paysages et d\'experiences.',
      'La Chine fascine avec son histoire millenaire et sa modernite.',
      'L\'Italie seduit par son patrimoine artistique et sa dolce vita.',
      'La Turquie melange Orient et Occident avec Istanbul et la Cappadoce.',
      'Le Mexique enchante avec ses plages paradisiaques et sa culture maya.',
      'La Thailande est le paradis tropical avec temples et street food.',
      'L\'Allemagne impressionne par son histoire et ses chateaux.',
      'Le Royaume-Uni charme avec Londres et ses traditions.'
    ],
    hints: [
      ['Tour Eiffel', 'Paris', 'Baguette'],
      ['Flamenco', 'Paella', 'Madrid'],
      ['Statue de la Liberte', 'Grand Canyon', 'Hollywood'],
      ['Grande Muraille', 'Pekin', 'Pandas'],
      ['Colisee', 'Rome', 'Pizza'],
      ['Istanbul', 'Cappadoce', 'Bosphore'],
      ['Cancun', 'Tequila', 'Mayas'],
      ['Bangkok', 'Temples', 'Pad Thai'],
      ['Berlin', 'Oktoberfest', 'Châteaux'],
      ['Londres', 'Big Ben', 'The']
    ]
  },
  {
    id: 'music-hits',
    title: 'Hits musicaux francais',
    description: 'Les chansons francaises les plus populaires',
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
      'Comme d\'Habitude - Claude Francois',
      'Alexandrie Alexandra - Claude Francois'
    ],
    explanations: [
      'Derniere Danse d\'Indila est devenu un phenomene mondial avec plus de 800 millions de vues.',
      'Alors on Danse de Stromae a marque le retour de la chanson francaise dans les charts internationaux.',
      'Je Veux de Zaz a conquis le monde avec sa fraicheur et son authenticite.',
      'Papaoutai de Stromae aborde avec genie la figure paternelle absente.',
      'Formidable de Stromae raconte une rupture amoureuse avec une melodie inoubliable.',
      'Tous les Mêmes de Stromae critique avec humour les relations hommes-femmes.',
      'La Vie en Rose d\'Edith Piaf reste l\'une des chansons francaises les plus connues au monde.',
      'Non, je ne Regrette Rien d\'Edith Piaf est devenue un hymne a la resilience.',
      'Comme d\'Habitude de Claude Francois a inspire "My Way" de Frank Sinatra.',
      'Alexandrie Alexandra de Claude Francois reste un classique de la chanson francaise.'
    ],
    hints: [
      ['Indila', 'Danse', 'Melancolie'],
      ['Stromae', 'Danse', 'Électro'],
      ['Zaz', 'Authenticite', 'Accordeon'],
      ['Stromae', 'Papa', 'Pere absent'],
      ['Stromae', 'Rupture', 'Alcool'],
      ['Stromae', 'Hommes femmes', 'Critique'],
      ['Édith Piaf', 'Rose', 'Amour'],
      ['Edith Piaf', 'Regrets', 'Resilience'],
      ['Claude Francois', 'Habitude', 'My Way'],
      ['Claude Francois', 'Alexandrie', 'Egypte']
    ]
  },
  {
    id: 'sports',
    title: 'Sportifs francais legendaires',
    description: 'Les plus grands athletes francais',
    difficulty: 'Difficile',
    color: '#B91C1C',
    items: [
      'Zinedine Zidane',
      'Michel Platini',
      'Thierry Henry',
      'Yannick Noah',
      'Sebastien Loeb',
      'Teddy Riner',
      'Marie-Jose Perec',
      'Laure Manaudou',
      'Tony Parker',
      'Alain Prost'
    ],
    explanations: [
      'Zinedine Zidane est considere comme l\'un des plus grands footballeurs de tous les temps.',
      'Michel Platini a domine le football europeen dans les annees 80.',
      'Thierry Henry reste le meilleur buteur de l\'histoire de l\'équipe de France.',
      'Yannick Noah a remporte Roland-Garros et mene la France vers la Coupe Davis.',
      'Sebastien Loeb a revolutionne le rallye avec ses 9 titres mondiaux consecutifs.',
      'Teddy Riner domine le judo mondial depuis plus de 15 ans.',
      'Marie-Jose Perec a marque l\'athletisme francais avec ses titres olympiques.',
      'Laure Manaudou a ete la reine de la natation francaise.',
      'Tony Parker a brillé en NBA et avec l\'équipe de France.',
      'Alain Prost reste une legende de la Formule 1 avec ses 4 titres mondiaux.'
    ],
    hints: [
      ['Football', 'Real Madrid', 'Coup de tête 2006'],
      ['Football', 'Annees 80', 'Ballon d\'Or'],
      ['Football', 'Arsenal', 'Buteur historique'],
      ['Tennis', 'Roland-Garros', 'Coupe Davis'],
      ['Rallye', '9 titres', 'Citroen'],
      ['Judo', 'Heavyweight', 'Invincible'],
      ['Athletisme', '400m', 'Jeux Olympiques'],
      ['Natation', 'Dos crawle', 'Championne'],
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