import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  username: string;
  avatar: string;
  level: number;
  totalPoints: number;
  quizCompleted: number;
  bestScore: number;
  settings: {
    darkMode: boolean;
    notifications: boolean;
    sounds: boolean;
    haptics: boolean;
  };
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, username: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  updateScore: (score: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialState: AuthState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
};

// Mock user pour la démo
const mockUser: User = {
  id: '1',
  email: 'user@example.com',
  username: 'QuizMaster_Pro',
  avatar: '🎯',
  level: 8,
  totalPoints: 127,
  quizCompleted: 8,
  bestScore: 27,
  settings: {
    darkMode: false,
    notifications: true,
    sounds: true,
    haptics: true,
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(initialState);

  useEffect(() => {
    // Simuler la vérification d'un token stocké
    const checkAuthStatus = async () => {
      
      // Simuler un délai de vérification
      setTimeout(() => {
        // Pour la démo, l'utilisateur n'est pas connecté par défaut
        setState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        });
      }, 1000);
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true }));

    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Pour la démo, accepter n'importe quel email/password
      if (email && password) {
        setState({
          user: { ...mockUser, email },
          isLoading: false,
          isAuthenticated: true,
        });
        return true;
      }

      setState(prev => ({ ...prev, isLoading: false }));
      return false;
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  };

  const register = async (email: string, password: string, username: string): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true }));

    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (email && password && username) {
        const newUser: User = {
          id: Date.now().toString(),
          email,
          username,
          avatar: '🎯',
          level: 1,
          totalPoints: 0,
          quizCompleted: 0,
          bestScore: 0,
          settings: {
            darkMode: false,
            notifications: true,
            sounds: true,
            haptics: true,
          },
        };

        setState({
          user: newUser,
          isLoading: false,
          isAuthenticated: true,
        });
        return true;
      }

      setState(prev => ({ ...prev, isLoading: false }));
      return false;
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  };

  const logout = () => {
    setState(initialState);
  };

  const updateProfile = (updates: Partial<User>) => {
    setState(prev => ({
      ...prev,
      user: prev.user ? { ...prev.user, ...updates } : null,
    }));
  };

  const updateScore = (score: number) => {
    setState(prev => {
      if (!prev.user) return prev;

      const newTotalPoints = prev.user.totalPoints + score;
      const newQuizCompleted = prev.user.quizCompleted + 1;
      const newBestScore = Math.max(prev.user.bestScore, score);
      const newLevel = Math.floor(newTotalPoints / 50) + 1; // Niveau basé sur les points

      return {
        ...prev,
        user: {
          ...prev.user,
          totalPoints: newTotalPoints,
          quizCompleted: newQuizCompleted,
          bestScore: newBestScore,
          level: newLevel,
        },
      };
    });
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        register,
        logout,
        updateProfile,
        updateScore,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};