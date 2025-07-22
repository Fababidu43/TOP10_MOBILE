import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
} from 'react-native';
import { router } from 'expo-router';
import { Play, Star, Search, Filter } from 'lucide-react-native';
import { QUIZ_CATEGORIES, CATEGORY_ICONS } from '@/utils/constants';
import { useAuth } from '@/contexts/AuthContext';

const { width } = Dimensions.get('window');

export default function PlayScreen() {
  const { state: authState } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  const difficulties = ['Facile', 'Moyen', 'Difficile'];

  const filteredCategories = QUIZ_CATEGORIES.filter(category => {
    const matchesSearch = category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = !selectedDifficulty || category.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const handleCategoryPress = (categoryId: string) => {
    if (!authState.isAuthenticated) {
      router.push('/login');
      return;
    }
    router.push(`/quiz?category=${categoryId}`);
  };

  const handleDifficultyFilter = (difficulty: string) => {
    setSelectedDifficulty(selectedDifficulty === difficulty ? null : difficulty);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Choisir une catégorie</Text>
        <Text style={styles.subtitle}>{QUIZ_CATEGORIES.length} quiz disponibles</Text>
      </View>

      <View style={styles.filtersContainer}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#64748B" />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher une catégorie..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.difficultyFilters}
          contentContainerStyle={styles.difficultyFiltersContent}
        >
          {difficulties.map((difficulty) => (
            <TouchableOpacity
              key={difficulty}
              style={[
                styles.difficultyChip,
                selectedDifficulty === difficulty && styles.difficultyChipActive
              ]}
              onPress={() => handleDifficultyFilter(difficulty)}
            >
              <Text style={[
                styles.difficultyChipText,
                selectedDifficulty === difficulty && styles.difficultyChipTextActive
              ]}>
                {difficulty}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.categoriesGrid}>
          {filteredCategories.map((category) => {
            const IconComponent = CATEGORY_ICONS[category.id as keyof typeof CATEGORY_ICONS];
            return (
              <TouchableOpacity
                key={category.id}
                style={[styles.categoryCard, { borderLeftColor: category.color }]}
                onPress={() => handleCategoryPress(category.id)}
              >
                <View style={styles.categoryHeader}>
                  <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                    <IconComponent size={28} color="#FFFFFF" />
                  </View>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryDifficulty}>{category.difficulty}</Text>
                  </View>
                </View>
                
                <Text style={styles.categoryTitle}>{category.title}</Text>
                <Text style={styles.categoryDescription}>{category.description}</Text>
                
                <View style={styles.categoryStats}>
                  <View style={styles.statItem}>
                    <Star size={16} color="#F59E0B" />
                    <Text style={styles.statText}>10 éléments</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statIcon}>💡</Text>
                    <Text style={styles.statText}>3 indices par élément</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statIcon}>📚</Text>
                    <Text style={styles.statText}>Explications incluses</Text>
                  </View>
                </View>

                <View style={styles.categoryFooter}>
                  <View style={styles.previewInfo}>
                    <Text style={styles.previewText}>
                      Exemple : {category.items[0]}, {category.items[1]}...
                    </Text>
                  </View>
                  <TouchableOpacity 
                    style={[
                      styles.playButton,
                      !authState.isAuthenticated && styles.playButtonDisabled
                    ]}
                    onPress={() => handleCategoryPress(category.id)}
                  >
                    <Play size={16} color="#FFFFFF" />
                    <Text style={styles.playButtonText}>
                      {authState.isAuthenticated ? 'Démarrer' : 'Connexion requise'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {filteredCategories.length === 0 && (
          <View style={styles.noResults}>
            <Text style={styles.noResultsTitle}>Aucune catégorie trouvée</Text>
            <Text style={styles.noResultsText}>
              Essayez de modifier vos critères de recherche
            </Text>
          </View>
        )}

        {!authState.isAuthenticated && (
          <View style={styles.authPrompt}>
            <Text style={styles.authPromptTitle}>Connectez-vous pour jouer !</Text>
            <Text style={styles.authPromptText}>
              Créez un compte pour accéder à tous les quiz et sauvegarder vos scores.
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
  filtersContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
  },
  difficultyFilters: {
    flexGrow: 0,
  },
  difficultyFiltersContent: {
    gap: 8,
  },
  difficultyChip: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  difficultyChipActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  difficultyChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  difficultyChipTextActive: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  categoriesGrid: {
    padding: 20,
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
    marginBottom: 16,
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  categoryDifficulty: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  categoryTitle: {
    fontSize: 20,
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
  categoryStats: {
    gap: 8,
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statIcon: {
    fontSize: 16,
  },
  statText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  categoryFooter: {
    gap: 12,
  },
  previewInfo: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 12,
  },
  previewText: {
    fontSize: 12,
    color: '#64748B',
    fontStyle: 'italic',
  },
  playButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  playButtonDisabled: {
    backgroundColor: '#94A3B8',
  },
  playButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  noResults: {
    alignItems: 'center',
    padding: 40,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
  },
  noResultsText: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
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