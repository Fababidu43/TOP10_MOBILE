/**
 * Mélange un tableau de manière aléatoire (algorithme Fisher-Yates)
 */
export const shuffle = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Formate le temps en minutes:secondes
 */
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Normalise une chaîne pour la comparaison (supprime accents, espaces, casse)
 */
export const normalizeString = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
    .replace(/[^\w\s]/g, '') // Supprime la ponctuation
    .replace(/\s+/g, ' '); // Normalise les espaces
};

/**
 * Vérifie si deux chaînes correspondent (avec normalisation)
 */
export const isAnswerCorrect = (userAnswer: string, correctAnswer: string): boolean => {
  const normalizedUser = normalizeString(userAnswer);
  const normalizedCorrect = normalizeString(correctAnswer);
  
  // Vérification exacte
  if (normalizedUser === normalizedCorrect) {
    return true;
  }
  
  // Vérification avec tolérance aux fautes (distance de Levenshtein simple)
  return calculateSimilarity(normalizedUser, normalizedCorrect) >= 0.8;
};

/**
 * Calcule la similarité entre deux chaînes (0 = différent, 1 = identique)
 */
const calculateSimilarity = (str1: string, str2: string): number => {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) {
    return 1.0;
  }
  
  const distance = levenshteinDistance(longer, shorter);
  return (longer.length - distance) / longer.length;
};

/**
 * Calcule la distance de Levenshtein entre deux chaînes
 */
const levenshteinDistance = (str1: string, str2: string): number => {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
};

/**
 * Calcule le score basé sur le nombre de tentatives
 */
export const calculatePoints = (attemptNumber: number): number => {
  const pointsMap = [3, 2, 1]; // 1ère tentative = 3 points, 2ème = 2 points, 3ème = 1 point
  return pointsMap[attemptNumber - 1] || 0;
};

/**
 * Génère un message de partage pour les réseaux sociaux
 */
export const generateShareMessage = (score: number, category: string, totalItems: number): string => {
  const percentage = Math.round((score / (totalItems * 3)) * 100);
  
  if (percentage === 100) {
    return `🏆 PARFAIT ! J'ai obtenu ${score}/${totalItems * 3} points au quiz "${category}" sur Top 10 Quiz ! 🎯\n\nPeux-tu faire mieux ? 🤔`;
  } else if (percentage >= 80) {
    return `🔥 Excellent ! ${score}/${totalItems * 3} points au quiz "${category}" sur Top 10 Quiz ! 💪\n\nÀ ton tour de jouer ! 🎮`;
  } else if (percentage >= 60) {
    return `👍 Pas mal ! ${score}/${totalItems * 3} points au quiz "${category}" sur Top 10 Quiz !\n\nTu peux sûrement faire mieux ! 😉`;
  } else {
    return `🎯 ${score}/${totalItems * 3} points au quiz "${category}" sur Top 10 Quiz !\n\nC'est plus dur qu'il n'y paraît ! 😅 À toi de jouer !`;
  }
};

/**
 * Détermine le niveau basé sur les points totaux
 */
export const calculateLevel = (totalPoints: number): number => {
  return Math.floor(totalPoints / 50) + 1;
};

/**
 * Calcule les points nécessaires pour le prochain niveau
 */
export const getPointsForNextLevel = (currentLevel: number): number => {
  return currentLevel * 50;
};

/**
 * Génère un nom d'utilisateur aléatoire
 */
export const generateRandomUsername = (): string => {
  const adjectives = ['Quick', 'Smart', 'Cool', 'Super', 'Mega', 'Ultra', 'Pro', 'Master'];
  const nouns = ['Player', 'Gamer', 'Quiz', 'Brain', 'Genius', 'Champion', 'Star', 'Hero'];
  
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = Math.floor(Math.random() * 999) + 1;
  
  return `${adjective}${noun}${number}`;
};

/**
 * Valide un email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valide un mot de passe (minimum 6 caractères)
 */
export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

/**
 * Debounce une fonction
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};