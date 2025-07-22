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
import { Play, TrendingUp } from 'lucide-react-native';
import { QUIZ_CATEGORIES, CATEGORY_ICONS } from '@/utils/constants';
import { useAuth } from '@/contexts/AuthContext';

const { width } = Dimensions.get('window');


export default function HomeScreen() {
  const { state: authState } = useAuth();

  const handleCategoryPress = (categoryId: string) => {
    router.push(`/quiz?category=${categoryId}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Top 10 Quiz</Text>
        <Text style={styles.subtitle}>Devinez les 10 éléments les plus populaires !</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.featuredSection}>
          <View style={styles.featuredCard}>
            <View style={styles.featuredContent}>
              <TrendingUp size={32} color="#FFFFFF" />
              <Text style={styles.featuredTitle}>Quiz du jour</Text>
              <Text style={styles.featuredDescription}>
                Films de science-fiction les plus populaires
              </Text>
            </View>
            <TouchableOpacity 
              style={styles.featuredButton}
              onPress={() => handleCategoryPress('sci-fi-movies')}
            >
              <Play size={20} color="#2563EB" />
              <Text style={styles.featuredButtonText}>Jouer</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Catégories populaires</Text>
          <View style={styles.categoriesGrid}>
            {QUIZ_CATEGORIES.map((category) => {
              const IconComponent = CATEGORY_ICONS[category.id as keyof typeof CATEGORY_ICONS];
              return (
                <TouchableOpacity
                  key={category.id}
                  style={[styles.categoryCard, { borderLeftColor: category.color }]}
                  onPress={() => handleCategoryPress(category.id)}
                >
                  <View style={styles.categoryHeader}>
                    <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                      <IconComponent size={24} color="#FFFFFF" />
                    </View>
                    <View style={styles.categoryBadge}>
                      <Text style={styles.categoryDifficulty}>{category.difficulty}</Text>
                    </View>
                  </View>
                  <Text style={styles.categoryTitle}>{category.title}</Text>
                  <Text style={styles.categoryDescription}>{category.description}</Text>
                  <View style={styles.categoryFooter}>
                    <Text style={styles.playButton}>
                      {authState.isAuthenticated ? 'Jouer →' : 'Connexion requise'}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
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
  featuredSection: {
    padding: 20,
  },
  featuredCard: {
    backgroundColor: '#2563EB',
    borderRadius: 16,
    padding: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  featuredContent: {
    marginBottom: 20,
  },
  featuredTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 12,
    marginBottom: 8,
  },
  featuredDescription: {
    fontSize: 16,
    color: '#BFDBFE',
    fontWeight: '500',
  },
  featuredButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 8,
  },
  featuredButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563EB',
  },
  categoriesSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 16,
  },
  categoriesGrid: {
    gap: 16,
  },
  categoryCard: {
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
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryDifficulty: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
    marginBottom: 16,
  },
  categoryFooter: {
    alignItems: 'flex-end',
  },
  playButton: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563EB',
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