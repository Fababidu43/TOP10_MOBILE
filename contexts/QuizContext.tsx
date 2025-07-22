import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface QuizItem {
  id: string;
  name: string;
  position: number;
}

export interface QuizCategory {
  id: string;
  title: string;
  description: string;
  items: string[];
  difficulty: 'Facile' | 'Moyen' | 'Difficile';
  color: string;
  explanations: string[];
  hints: string[][];
}

export interface SavedGame {
  id: string;
  categoryId: string;
  categoryTitle: string;
  foundItems: QuizItem[];
  remainingItems: QuizItem[];
  score: number;
  attempts: number;
  usedHints: { [key: string]: number };
  savedAt: Date;
}

interface QuizState {
  currentCategory: QuizCategory | null;
  questions: QuizItem[];
  foundItems: QuizItem[];
  score: number;
  gameOver: boolean;
  attempts: number;
  maxAttempts: number;
  usedHints: { [key: string]: number };
  currentExplanation: string | null;
  savedGames: SavedGame[];
  isGameAbandoned: boolean;
}

interface QuizContextType {
  state: QuizState;
  startQuiz: (category: QuizCategory) => void;
  submitAnswer: (answer: string) => { isCorrect: boolean; item?: QuizItem; points: number; explanation?: string };
  resetQuiz: () => void;
  endGame: () => void;
  getHint: (itemId: string) => string | null;
  clearExplanation: () => void;
  abandonGame: () => void;
  resumeGame: (savedGame: SavedGame) => void;
  deleteSavedGame: (gameId: string) => void;
  getSavedGames: () => SavedGame[];
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

const initialState: QuizState = {
  currentCategory: null,
  questions: [],
  foundItems: [],
  score: 0,
  gameOver: false,
  attempts: 0,
  maxAttempts: 30, // 3 attempts per item * 10 items
  usedHints: {},
  currentExplanation: null,
  savedGames: [],
  isGameAbandoned: false,
};

// Fonction pour mélanger un tableau
const shuffle = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Générer les questions à partir d'une catégorie
const generateQuestions = (category: QuizCategory): QuizItem[] => {
  return category.items.map((item, index) => ({
    id: `${category.id}-${index}`,
    name: item,
    position: index + 1,
  }));
};

export function QuizProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<QuizState>(initialState);

  const startQuiz = (category: QuizCategory) => {
    const questions = generateQuestions(category);
    setState({
      ...initialState,
      currentCategory: category,
      questions: shuffle(questions),
      usedHints: {},
    });
  };

  const submitAnswer = (answer: string): { isCorrect: boolean; item?: QuizItem; points: number; explanation?: string } => {
    if (state.gameOver || state.questions.length === 0) {
      return { isCorrect: false, points: 0 };
    }

    const trimmedAnswer = answer.toLowerCase().trim();
    const foundItem = state.questions.find(
      item => item.name.toLowerCase().trim() === trimmedAnswer
    );

    const newAttempts = state.attempts + 1;

    if (foundItem) {
      // Bonne réponse
      const remainingQuestions = state.questions.filter(q => q.id !== foundItem.id);
      const newFoundItems = [...state.foundItems, foundItem];
      
      // Points dégressifs basés sur le nombre de tentatives pour cet item
      const itemAttempts = Math.min(3, newAttempts - state.attempts + 1);
      const points = Math.max(0, 4 - itemAttempts);
      
      const newScore = state.score + points;
      const isGameComplete = remainingQuestions.length === 0;
      
      // Récupérer l'explication
      const explanation = state.currentCategory?.explanations[foundItem.position - 1];

      setState(prev => ({
        ...prev,
        questions: remainingQuestions,
        foundItems: newFoundItems,
        score: newScore,
        attempts: newAttempts,
        gameOver: isGameComplete,
        currentExplanation: explanation || null,
      }));

      return { isCorrect: true, item: foundItem, points, explanation };
    } else {
      // Mauvaise réponse
      setState(prev => ({
        ...prev,
        attempts: newAttempts,
        gameOver: newAttempts >= prev.maxAttempts,
      }));

      return { isCorrect: false, points: 0 };
    }
  };

  const resetQuiz = () => {
    setState(initialState);
  };

  const endGame = () => {
    setState(prev => ({
      ...prev,
      gameOver: true,
    }));
  };

  const getHint = (itemId: string): string | null => {
    if (!state.currentCategory) return null;
    
    const item = state.currentCategory.items.find((_, index) => `${state.currentCategory!.id}-${index}` === itemId);
    if (!item) return null;
    
    const itemIndex = state.currentCategory.items.indexOf(item);
    const hints = state.currentCategory.hints[itemIndex];
    const usedCount = state.usedHints[itemId] || 0;
    
    if (usedCount >= hints.length) return null;
    
    const hint = hints[usedCount];
    
    setState(prev => ({
      ...prev,
      usedHints: {
        ...prev.usedHints,
        [itemId]: usedCount + 1,
      },
    }));
    
    return hint;
  };
  
  const clearExplanation = () => {
    setState(prev => ({
      ...prev,
      currentExplanation: null,
    }));
  };

  const abandonGame = () => {
    if (!state.currentCategory || state.gameOver) return;
    
    const savedGame: SavedGame = {
      id: Date.now().toString(),
      categoryId: state.currentCategory.id,
      categoryTitle: state.currentCategory.title,
      foundItems: state.foundItems,
      remainingItems: state.questions,
      score: state.score,
      attempts: state.attempts,
      usedHints: state.usedHints,
      savedAt: new Date(),
    };
    
    setState(prev => ({
      ...prev,
      savedGames: [...prev.savedGames, savedGame],
      isGameAbandoned: true,
      gameOver: true,
    }));
  };
  
  const resumeGame = (savedGame: SavedGame) => {
    const category = state.currentCategory; // Assume category is already loaded
    if (!category) return;
    
    setState(prev => ({
      ...prev,
      currentCategory: category,
      questions: savedGame.remainingItems,
      foundItems: savedGame.foundItems,
      score: savedGame.score,
      attempts: savedGame.attempts,
      usedHints: savedGame.usedHints,
      gameOver: false,
      isGameAbandoned: false,
      currentExplanation: null,
    }));
  };
  
  const deleteSavedGame = (gameId: string) => {
    setState(prev => ({
      ...prev,
      savedGames: prev.savedGames.filter(game => game.id !== gameId),
    }));
  };
  
  const getSavedGames = (): SavedGame[] => {
    return state.savedGames;
  };
  return (
    <QuizContext.Provider
      value={{
        state,
        startQuiz,
        submitAnswer,
        resetQuiz,
        endGame,
        getHint,
        clearExplanation,
        abandonGame,
        resumeGame,
        deleteSavedGame,
        getSavedGames,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};