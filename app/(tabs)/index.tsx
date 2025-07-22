import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { Play, TrendingUp, Users, Target, Info } from 'lucide-react-native';
import { QUIZ_CATEGORIES, CATEGORY_ICONS } from '@/utils/constants';
import { useAuth } from '@/contexts/AuthContext';

const { width } = Dimensions.get('window');

// Mock data pour les catégories les plus populaires
const popularCategories = [
  {
    id: 'movies-2000s',
    title: 'Films des années 2000',
    playCount: 15420,
    averageScore: 18.5,
    successRate: 62,
  },
  {
    id: 'netflix-series',
    title: 'Séries Netflix',
    playCount: 12890,
    averageScore: 16.2,
    successRate: 54,
  },
  {
    id: 'video-games',
    title: 'Jeux vidéo populaires',
    playCount: 11340,
    averageScore: 14.8,
    successRate: 49,
  },
  {
    id: 'destinations',
    title: 'Destinations de rêve',
    playCount: 9870,
    averageScore: 19.3,
    successRate: 64,
  },
];

export default function HomeScreen() {
  const { state: authState } = useAuth();

  const handleCategoryPress = (categoryId: string) => {
    if (!authState.isAuthenticated) {
      router.push('/login');
      return;
    }
    router.push(`/quiz?category=${categoryId}`);
  };

  const handleTutorial = () => {
    // TODO: Ouvrir modal tutorial
    console.log('Ouvrir tutorial');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Top 10 Quiz</Text>
        <Text style={styles.subtitle}>Devinez les 10 éléments les plus populaires !</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Section explication du jeu */}
        <View style={styles.explanationSection}>
          <View style={styles.explanationHeader}>
            <Target size={24} color="#2563EB" />
            <Text style={styles.explanationTitle}>Comment jouer ?</Text>
          </View>
          <Text style={styles.explanationText}>
            Devinez les 10 éléments d'un classement ! Par exemple : "Les 10 films les plus vus en 2020".
          </Text>
          <Text style={styles.explanationSubtext}>
            • 3 tentatives par élément{'\n'}
            • Points dégressifs (3-2-1){'\n'}
            • Indices disponibles
          </Text>
          <TouchableOpacity style={styles.tutorialButton} onPress={handleTutorial}>
            <Info size={16} color="#2563EB" />
            <Text style={styles.tutorialButtonText}>En savoir plus</Text>
          </TouchableOpacity>
        </View>

        {/* Section catégories populaires */}
        <View style={styles.popularSection}>
          <View style={styles.sectionHeader}>
            <TrendingUp size={20} color="#F59E0B" />
            <Text style={styles.sectionTitle}>Top 10 les plus joués</Text>
          </View>
          
          <View style={styles.popularGrid}>
            {popularCategories.map((category, index) => {
              const fullCategory = QUIZ_CATEGORIES.find(cat => cat.id === category.id);
              const IconComponent = CATEGORY_ICONS[category.id as keyof typeof CATEGORY_ICONS];
              
              return (
                <TouchableOpacity
                  key={category.id}
                  style={[styles.popularCard, { borderLeftColor: fullCategory?.color || '#2563EB' }]}
                  onPress={() => handleCategoryPress(category.id)}
                >
                  <View style={styles.popularHeader}>
                    <View style={styles.popularRank}>
                      <Text style={styles.rankNumber}>#{index + 1}</Text>
                    </View>
                    <View style={[styles.popularIcon, { backgroundColor: fullCategory?.color || '#2563EB' }]}>
                      <IconComponent size={20} color="#FFFFFF" />
                    </View>
                  </View>
                  
                  <Text style={styles.popularTitle}>{category.title}</Text>
                  
                  <View style={styles.popularStats}>
                    <View style={styles.statItem}>
                      <Users size={14} color="#64748B" />
                      <Text style={styles.statText}>{category.playCount.toLocaleString()} parties</Text>
                    </View>
                    <View style={styles.statItem}>
                      <Target size={14} color="#64748B" />
                      <Text style={styles.statText}>{category.successRate}% de réussite</Text>
                    </View>
                  </View>
                  
                  <View style={styles.scoreInfo}>
                    <Text style={styles.averageScore}>
                      Score moyen : <Text style={styles.scoreValue}>{category.averageScore}/30</Text>
                    </Text>
                  </View>
                  
                  <View style={styles.popularFooter}>
                    <TouchableOpacity 
                      style={styles.playButton}
                      onPress={() => handleCategoryPress(category.id)}
                    >
                      <Play size={14} color="#FFFFFF" />
                      <Text style={styles.playButtonText}>
                        {authState.isAuthenticated ? 'Jouer' : 'Connexion'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Section découvrir plus */}
        <View style={styles.discoverSection}>
          <Text style={styles.discoverTitle}>Envie de plus de défis ?</Text>
          <Text style={styles.discoverText}>
            Découvrez toutes nos catégories dans l'onglet "Jouer"
          </Text>
          <TouchableOpacity 
            style={styles.discoverButton}
            onPress={() => router.push('/(tabs)/play')}
          >
            <Text style={styles.discoverButtonText}>Voir toutes les catégories</Text>
          </TouchableOpacity>
        </View>

        {!authState.isAuthenticated && (
          <View style={styles.authPrompt}>
            <Text style={styles.authPromptTitle}>Connectez-vous pour jouer !</Text>
            <Text style={styles.authPromptText}>
              Créez un compte pour sauvegarder vos scores et débloquer toutes les fonctionnalités.
            </Text>
            <TouchableOpacity 
              style={styles.authButton}
              onPress={() => router.push('/login')}
            >
              <Text style={styles.authButtonText}>Se connecter</Text>
            </TouchableOpacity>
          </View>
        )}
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
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  explanationSection: {
    backgroundColor: '#EFF6FF',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  explanationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  explanationTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E40AF',
  },
  explanationText: {
    fontSize: 16,
    color: '#1E40AF',
    lineHeight: 24,
    marginBottom: 12,
  },
  explanationSubtext: {
    fontSize: 14,
    color: '#3730A3',
    lineHeight: 20,
    marginBottom: 16,
  },
  tutorialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
  },
  tutorialButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563EB',
  },
  popularSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
  },
  popularGrid: {
    gap: 16,
  },
  popularCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  popularHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  popularRank: {
    backgroundColor: '#F59E0B',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankNumber: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  popularIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popularTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 12,
  },
  popularStats: {
    gap: 8,
    marginBottom: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  scoreInfo: {
    marginBottom: 16,
  },
  averageScore: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  scoreValue: {
    fontWeight: '700',
    color: '#2563EB',
  },
  popularFooter: {
    alignItems: 'flex-end',
  },
  playButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  playButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  discoverSection: {
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
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  discoverTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
    textAlign: 'center',
  },
  discoverText: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  discoverButton: {
    backgroundColor: '#F97316',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  discoverButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  authPrompt: {
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
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  authPromptTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
    textAlign: 'center',
  },
  authPromptText: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  authButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  authButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});