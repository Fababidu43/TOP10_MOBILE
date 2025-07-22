import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Share,
  Alert,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Trophy, Share2, RotateCcw, Chrome as Home, CircleCheck as CheckCircle, Circle as XCircle } from 'lucide-react-native';
import { QUIZ_CATEGORIES } from '@/utils/constants';
import { generateShareMessage } from '@/utils/helpers';
import { useQuiz } from '@/contexts/QuizContext';

export default function ResultsScreen() {
  const { resetQuiz } = useQuiz();
  const { 
    categoryId, 
    score, 
    foundCount, 
    totalItems = '10' 
  } = useLocalSearchParams<{
    categoryId?: string;
    score?: string;
    foundCount?: string;
    totalItems?: string;
  }>();

  const category = QUIZ_CATEGORIES.find(cat => cat.id === categoryId);
  const finalScore = parseInt(score || '0');
  const itemsFound = parseInt(foundCount || '0');
  const totalItemsCount = parseInt(totalItems);
  const maxScore = totalItemsCount * 3;
  const percentage = Math.round((finalScore / maxScore) * 100);

  const handleShare = async () => {
    if (!category) return;
    
    // Ne permettre le partage que si score parfait (30/30)
    if (finalScore < maxScore) {
      Alert.alert(
        'Partage non disponible',
        'Vous pouvez partager votre score uniquement si vous obtenez un score parfait (10/10) !',
        [{ text: 'OK' }]
      );
      return;
    }
    
    const message = generateShareMessage(finalScore, category.title, totalItemsCount);
    
    try {
      await Share.share({
        message,
        title: 'Mon score Top 10 Quiz',
      });
    } catch (error) {
      Alert.alert(
        'Partage impossible',
        'Le partage n\'est pas disponible sur cette plateforme. Vous pouvez copier votre score manuellement.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleReplay = () => {
    // Supprimer le bouton rejouer car si on termine, on ne veut pas rejouer immédiatement
    handleBackToPlay();
  };

  const handleBackToPlay = () => {
    // Réinitialiser le quiz avant de retourner à la sélection
    resetQuiz();
    router.replace('/(tabs)/play');
  };

  const handleBackToHome = () => {
    router.replace('/(tabs)/');
  };

  if (!category) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Catégorie non trouvée</Text>
      </View>
    );
  }

  const getPerformanceMessage = () => {
    if (percentage === 100) {
      return { message: "🏆 PARFAIT !", color: "#F59E0B", emoji: "🎉" };
    } else if (percentage >= 80) {
      return { message: "🔥 Excellent !", color: "#059669", emoji: "🔥" };
    } else if (percentage >= 60) {
      return { message: "👍 Pas mal !", color: "#2563EB", emoji: "👍" };
    } else {
      return { message: "💪 Continuez !", color: "#DC2626", emoji: "💪" };
    }
  };

  const performance = getPerformanceMessage();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Résultats</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.scoreSection}>
          <Text style={styles.performanceEmoji}>{performance.emoji}</Text>
          <Text style={[styles.performanceMessage, { color: performance.color }]}>
            {performance.message}
          </Text>
          <Text style={styles.categoryTitle}>{category.title}</Text>
          
          <View style={styles.scoreContainer}>
            <View style={styles.scoreItem}>
              <Trophy size={32} color="#F59E0B" />
              <Text style={styles.scoreValue}>{finalScore}</Text>
              <Text style={styles.scoreLabel}>points</Text>
            </View>
            <View style={styles.scoreItem}>
              <CheckCircle size={32} color="#059669" />
              <Text style={styles.scoreValue}>{itemsFound}</Text>
              <Text style={styles.scoreLabel}>trouvés</Text>
            </View>
            <View style={styles.scoreItem}>
              <Text style={styles.percentageValue}>{percentage}%</Text>
              <Text style={styles.scoreLabel}>réussite</Text>
            </View>
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: `${percentage}%`,
                    backgroundColor: performance.color
                  }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>{finalScore}/{maxScore} points</Text>
          </View>
        </View>

        <View style={styles.detailsSection}>
          <Text style={styles.detailsTitle}>Top 10 complet</Text>
          <Text style={styles.detailsSubtitle}>
            Voici la liste complète des éléments de ce classement
          </Text>
          
          <View style={styles.itemsList}>
            {category.items.map((item, index) => {
              const position = index + 1;
              const wasFound = position <= itemsFound; // Simulation basée sur le nombre trouvé
              
              return (
                <View key={position} style={styles.itemRow}>
                  <Text style={styles.itemPosition}>#{position}</Text>
                  {wasFound ? (
                    <CheckCircle size={20} color="#059669" />
                  ) : (
                    <XCircle size={20} color="#DC2626" />
                  )}
                  <Text style={[
                    styles.itemName,
                    wasFound ? styles.itemFound : styles.itemMissed
                  ]}>
                    {item}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.actionsSection}>
          {finalScore === maxScore && (
            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
              <Share2 size={20} color="#FFFFFF" />
              <Text style={styles.shareButtonText}>Partager mon score parfait !</Text>
            </TouchableOpacity>
          )}

          <View style={styles.navigationButtons}>

            <TouchableOpacity style={styles.playButton} onPress={handleBackToPlay}>
              <Text style={styles.playButtonText}>Autre quiz</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.homeButton} onPress={handleBackToHome}>
            <Home size={20} color="#64748B" />
            <Text style={styles.homeButtonText}>Retour à l'accueil</Text>
          </TouchableOpacity>
        </View>
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
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E293B',
  },
  content: {
    flex: 1,
  },
  scoreSection: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  performanceEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  performanceMessage: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 24,
    textAlign: 'center',
  },
  scoreContainer: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 24,
  },
  scoreItem: {
    alignItems: 'center',
    gap: 8,
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E293B',
  },
  percentageValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2563EB',
  },
  scoreLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 8,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  detailsSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
  },
  detailsSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 16,
  },
  itemsList: {
    gap: 8,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 12,
  },
  itemPosition: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2563EB',
    width: 32,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  itemFound: {
    color: '#059669',
  },
  itemMissed: {
    color: '#DC2626',
  },
  actionsSection: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 16,
  },
  shareButton: {
    backgroundColor: '#2563EB',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  navigationButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  replayButton: {
    flex: 1,
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 2,
    borderColor: '#2563EB',
  },
  replayButtonText: {
    color: '#2563EB',
    fontSize: 16,
    fontWeight: '700',
  },
  playButton: {
    flex: 1,
    backgroundColor: '#F97316',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  homeButton: {
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  homeButtonText: {
    color: '#64748B',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 18,
    color: '#DC2626',
    textAlign: 'center',
    marginTop: 100,
  },
});