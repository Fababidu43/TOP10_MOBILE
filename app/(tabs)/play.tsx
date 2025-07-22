import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Clock, Trophy, CircleCheck as CheckCircle, Circle as XCircle } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const quizData = {
  'movies-2000s': {
    title: 'Films des années 2000',
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
  'netflix-series': {
    title: 'Séries Netflix',
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
  }
};

export default function PlayScreen() {
  const { category } = useLocalSearchParams<{ category?: string }>();
  const [currentPosition, setCurrentPosition] = useState(1);
  const [guesses, setGuesses] = useState<{ [key: number]: string[] }>({});
  const [currentGuess, setCurrentGuess] = useState('');
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes
  const [gameComplete, setGameComplete] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState<{ [key: number]: string }>({});

  const quiz = category && quizData[category as keyof typeof quizData] 
    ? quizData[category as keyof typeof quizData]
    : quizData['movies-2000s'];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setGameComplete(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const submitGuess = () => {
    if (!currentGuess.trim()) return;

    const correctAnswer = quiz.items[currentPosition - 1];
    const isCorrect = currentGuess.toLowerCase().trim() === correctAnswer.toLowerCase();
    
    const positionGuesses = guesses[currentPosition] || [];
    const newGuesses = [...positionGuesses, currentGuess];
    
    setGuesses({
      ...guesses,
      [currentPosition]: newGuesses
    });

    if (isCorrect) {
      setCorrectAnswers({
        ...correctAnswers,
        [currentPosition]: correctAnswer
      });
      
      // Points dégressifs : 3 points pour premier essai, 2 pour deuxième, 1 pour troisième
      const points = Math.max(0, 4 - newGuesses.length);
      setScore(score + points);
      
      // Passer à la position suivante
      if (currentPosition < 10) {
        setCurrentPosition(currentPosition + 1);
      } else {
        setGameComplete(true);
      }
    } else if (newGuesses.length >= 3) {
      // Échec après 3 essais, passer à la suivante
      if (currentPosition < 10) {
        setCurrentPosition(currentPosition + 1);
      } else {
        setGameComplete(true);
      }
    }

    setCurrentGuess('');
  };

  const skipPosition = () => {
    if (currentPosition < 10) {
      setCurrentPosition(currentPosition + 1);
    } else {
      setGameComplete(true);
    }
  };

  const finishGame = () => {
    Alert.alert(
      'Quiz terminé !',
      `Votre score : ${score}/30 points\n${Object.keys(correctAnswers).length}/10 réponses correctes`,
      [
        {
          text: 'Partager',
          onPress: () => {
            // TODO: Implémenter le partage social
          }
        },
        {
          text: 'Rejouer',
          onPress: () => {
            // Réinitialiser le jeu
            setCurrentPosition(1);
            setGuesses({});
            setCurrentGuess('');
            setScore(0);
            setTimeRemaining(300);
            setGameComplete(false);
            setCorrectAnswers({});
          }
        },
        {
          text: 'Accueil',
          onPress: () => router.push('/')
        }
      ]
    );
  };

  useEffect(() => {
    if (gameComplete) {
      finishGame();
    }
  }, [gameComplete]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.quizTitle}>{quiz.title}</Text>
        <View style={styles.timerContainer}>
          <Clock size={16} color="#F97316" />
          <Text style={styles.timer}>{formatTime(timeRemaining)}</Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${(currentPosition - 1) / 10 * 100}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>{currentPosition}/10</Text>
      </View>

      <View style={styles.scoreContainer}>
        <Trophy size={20} color="#F59E0B" />
        <Text style={styles.scoreText}>{score}/30 points</Text>
      </View>

      {!gameComplete && (
        <View style={styles.gameContainer}>
          <Text style={styles.positionTitle}>Position #{currentPosition}</Text>
          <Text style={styles.question}>
            Quel est le {currentPosition === 1 ? '1er' : `${currentPosition}ème`} élément du top 10 ?
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={currentGuess}
              onChangeText={setCurrentGuess}
              placeholder="Tapez votre réponse..."
              onSubmitEditing={submitGuess}
              autoCapitalize="words"
              autoCorrect={false}
            />
            <TouchableOpacity 
              style={styles.submitButton}
              onPress={submitGuess}
            >
              <Text style={styles.submitButtonText}>Valider</Text>
            </TouchableOpacity>
          </View>

          {guesses[currentPosition] && (
            <View style={styles.previousGuesses}>
              <Text style={styles.previousGuessesTitle}>Tentatives précédentes :</Text>
              {guesses[currentPosition].map((guess, index) => (
                <View key={index} style={styles.guessItem}>
                  <XCircle size={16} color="#DC2626" />
                  <Text style={styles.guessText}>{guess}</Text>
                </View>
              ))}
              <Text style={styles.attemptsRemaining}>
                {3 - guesses[currentPosition].length} essai(s) restant(s)
              </Text>
            </View>
          )}

          <TouchableOpacity 
            style={styles.skipButton}
            onPress={skipPosition}
          >
            <Text style={styles.skipButtonText}>Passer cette question</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView style={styles.answersContainer}>
        <Text style={styles.answersTitle}>Réponses trouvées :</Text>
        {Array.from({ length: 10 }, (_, index) => {
          const position = index + 1;
          const answer = correctAnswers[position];
          return (
            <View key={position} style={styles.answerItem}>
              <Text style={styles.answerPosition}>#{position}</Text>
              {answer ? (
                <>
                  <CheckCircle size={20} color="#059669" />
                  <Text style={styles.answerText}>{answer}</Text>
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
  positionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2563EB',
    textAlign: 'center',
    marginBottom: 8,
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 26,
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
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  previousGuesses: {
    marginBottom: 20,
  },
  previousGuessesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 8,
  },
  guessItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  guessText: {
    fontSize: 14,
    color: '#64748B',
  },
  attemptsRemaining: {
    fontSize: 12,
    color: '#F97316',
    fontWeight: '600',
    marginTop: 4,
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
});