import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Clock, Trophy, CircleCheck as CheckCircle, Circle as XCircle, Share2 } from 'lucide-react-native';
import { useQuiz } from '@/contexts/QuizContext';
import { useAuth } from '@/contexts/AuthContext';
import { QUIZ_CATEGORIES } from '@/utils/constants';
import { formatTime, generateShareMessage } from '@/utils/helpers';

const { width } = Dimensions.get('window');

export default function QuizScreen() {
  const { category: categoryId } = useLocalSearchParams<{ category?: string }>();
  const { state: quizState, startQuiz, submitAnswer, resetQuiz, setTimeRemaining, endGame } = useQuiz();
  const { state: authState, updateScore } = useAuth();
  
  const [currentGuess, setCurrentGuess] = useState('');
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const category = QUIZ_CATEGORIES.find(cat => cat.id === categoryId);

  useEffect(() => {
    if (category && !quizState.currentCategory) {
      startQuiz(category);
    }
  }, [category]);

  useEffect(() => {
    if (!quizState.gameOver && quizState.timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(quizState.timeRemaining - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quizState.timeRemaining, quizState.gameOver]);

  useEffect(() => {
    if (quizState.gameOver) {
      handleGameEnd();
    }
  }, [quizState.gameOver]);

  const handleSubmitGuess = async () => {
    if (!currentGuess.trim() || isSubmitting) return;

    setIsSubmitting(true);
    const result = submitAnswer(currentGuess);

    if (result.isCorrect) {
      setFeedback({
        message: `Correct ! +${result.points} points`,
        type: 'success'
      });
    } else {
      setFeedback({
        message: 'Réponse incorrecte, essayez encore !',
        type: 'error'
      });
    }

    setCurrentGuess('');
    
    // Effacer le feedback après 2 secondes
    setTimeout(() => {
      setFeedback(null);
      setIsSubmitting(false);
    }, 2000);
  };

  const handleGameEnd = () => {
    if (authState.isAuthenticated) {
      updateScore(quizState.score);
    }

    const foundCount = quizState.foundItems.length;
    const totalItems = 10;
    const maxScore = totalItems * 3;

    Alert.alert(
      'Quiz terminé !',
      `Score : ${quizState.score}/${maxScore} points\nTrouvés : ${foundCount}/${totalItems} éléments`,
      [
        {
          text: 'Partager',
          onPress: handleShare
        },
        {
          text: 'Rejouer',
          onPress: handleRestart
        },
        {
          text: 'Accueil',
          onPress: () => router.push('/')
        }
      ]
    );
  };

  const handleShare = () => {
    if (!category) return;
    
    const message = generateShareMessage(quizState.score, category.title, 10);
    // TODO: Implémenter le partage natif
    console.log('Partage:', message);
  };

  const handleRestart = () => {
    if (category) {
      resetQuiz();
      startQuiz(category);
      setCurrentGuess('');
      setFeedback(null);
    }
  };

  const handleSkip = () => {
    endGame();
  };

  if (!category) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Catégorie non trouvée</Text>
      </View>
    );
  }

  const remainingItems = quizState.questions.length;
  const foundItems = quizState.foundItems.length;
  const progress = (foundItems / 10) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.quizTitle}>{category.title}</Text>
        <View style={styles.timerContainer}>
          <Clock size={16} color="#F97316" />
          <Text style={styles.timer}>{formatTime(quizState.timeRemaining)}</Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[styles.progressFill, { width: `${progress}%` }]} 
          />
        </View>
        <Text style={styles.progressText}>{foundItems}/10</Text>
      </View>

      <View style={styles.scoreContainer}>
        <Trophy size={20} color="#F59E0B" />
        <Text style={styles.scoreText}>{quizState.score}/30 points</Text>
      </View>

      {!quizState.gameOver && remainingItems > 0 && (
        <View style={styles.gameContainer}>
          <Text style={styles.question}>
            Trouvez un élément du Top 10 :
          </Text>
          <Text style={styles.remainingText}>
            {remainingItems} élément{remainingItems > 1 ? 's' : ''} restant{remainingItems > 1 ? 's' : ''}
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={currentGuess}
              onChangeText={setCurrentGuess}
              placeholder="Tapez votre réponse..."
              onSubmitEditing={handleSubmitGuess}
              autoCapitalize="words"
              autoCorrect={false}
              editable={!isSubmitting}
            />
            <TouchableOpacity 
              style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
              onPress={handleSubmitGuess}
              disabled={isSubmitting || !currentGuess.trim()}
            >
              <Text style={styles.submitButtonText}>Valider</Text>
            </TouchableOpacity>
          </View>

          {feedback && (
            <View style={[
              styles.feedbackContainer,
              feedback.type === 'success' ? styles.feedbackSuccess : styles.feedbackError
            ]}>
              {feedback.type === 'success' ? (
                <CheckCircle size={16} color="#059669" />
              ) : (
                <XCircle size={16} color="#DC2626" />
              )}
              <Text style={[
                styles.feedbackText,
                feedback.type === 'success' ? styles.feedbackTextSuccess : styles.feedbackTextError
              ]}>
                {feedback.message}
              </Text>
            </View>
          )}

          <TouchableOpacity 
            style={styles.skipButton}
            onPress={handleSkip}
          >
            <Text style={styles.skipButtonText}>Terminer le quiz</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView style={styles.answersContainer}>
        <Text style={styles.answersTitle}>Éléments trouvés :</Text>
        {Array.from({ length: 10 }, (_, index) => {
          const position = index + 1;
          const foundItem = quizState.foundItems.find(item => item.position === position);
          
          return (
            <View key={position} style={styles.answerItem}>
              <Text style={styles.answerPosition}>#{position}</Text>
              {foundItem ? (
                <>
                  <CheckCircle size={20} color="#059669" />
                  <Text style={styles.answerText}>{foundItem.name}</Text>
                </>
              ) : (
                <Text style={styles.answerEmpty}>? ? ?</Text>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    padding: 8,
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    flex: 1,
    textAlign: 'center',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timer: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F97316',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    backgroundColor: '#FFFBEB',
    borderBottomWidth: 1,
    borderBottomColor: '#FEF3C7',
  },
  scoreText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#92400E',
  },
  gameContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  question: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 8,
  },
  remainingText: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  submitButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#94A3B8',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  feedbackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  feedbackSuccess: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  feedbackError: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  feedbackText: {
    fontSize: 14,
    fontWeight: '600',
  },
  feedbackTextSuccess: {
    color: '#059669',
  },
  feedbackTextError: {
    color: '#DC2626',
  },
  skipButton: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  skipButtonText: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '600',
  },
  answersContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  answersTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 16,
  },
  answerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 8,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  answerPosition: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2563EB',
    width: 32,
  },
  answerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#059669',
    flex: 1,
  },
  answerEmpty: {
    fontSize: 16,
    color: '#94A3B8',
    flex: 1,
    fontStyle: 'italic',
  },
  errorText: {
    fontSize: 18,
    color: '#DC2626',
    textAlign: 'center',
    marginTop: 100,
  },
});