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
}

interface QuizState {
  currentCategory: QuizCategory | null;
  questions: QuizItem[];
  foundItems: QuizItem[];
  score: number;
  gameOver: boolean;
  timeRemaining: number;
  attempts: number;
  maxAttempts: number;
}

interface QuizContextType {
  state: QuizState;
  startQuiz: (category: QuizCategory) => void;
  submitAnswer: (answer: string) => { isCorrect: boolean; item?: QuizItem; points: number };
  resetQuiz: () => void;
  setTimeRemaining: (time: number) => void;
  endGame: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

const initialState: QuizState = {
  currentCategory: null,
  questions: [],
  foundItems: [],
  score: 0,
  gameOver: false,
  timeRemaining: 300,
  attempts: 0,
  maxAttempts: 30, // 3 attempts per item * 10 items
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
      timeRemaining: 300,
    });
  };

  const submitAnswer = (answer: string): { isCorrect: boolean; item?: QuizItem; points: number } => {
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

      setState(prev => ({
        ...prev,
        questions: remainingQuestions,
        foundItems: newFoundItems,
        score: newScore,
        attempts: newAttempts,
        gameOver: isGameComplete,
      }));

      return { isCorrect: true, item: foundItem, points };
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

  const setTimeRemaining = (time: number) => {
    setState(prev => ({
      ...prev,
      timeRemaining: time,
      gameOver: prev.gameOver || time <= 0,
    }));
  };

  const endGame = () => {
    setState(prev => ({
      ...prev,
      gameOver: true,
    }));
  };

  return (
    <QuizContext.Provider
      value={{
        state,
        startQuiz,
        submitAnswer,
        resetQuiz,
        setTimeRemaining,
        endGame,
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