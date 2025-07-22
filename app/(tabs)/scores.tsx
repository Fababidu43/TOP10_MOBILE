import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Trophy, Medal, Star, TrendingUp, Users, Calendar } from 'lucide-react-native';

const achievements = [
  {
    id: 'perfect-score',
    title: 'Score parfait',
    description: 'Réussir un quiz avec 30/30 points',
    icon: Trophy,
    color: '#F59E0B',
    unlocked: false,
  },
  {
    id: 'speed-demon',
    title: 'Éclair',
    description: 'Terminer un quiz en moins de 2 minutes',
    icon: TrendingUp,
    color: '#2563EB',
    unlocked: true,
  },
  {
    id: 'social-butterfly',
    title: 'Papillon social',
    description: 'Partager 5 scores sur les réseaux',
    icon: Users,
    color: '#059669',
    unlocked: false,
  },
  {
    id: 'daily-player',
    title: 'Joueur assidu',
    description: 'Jouer 7 jours consécutifs',
    icon: Calendar,
    color: '#DC2626',
    unlocked: true,
  },
];

const recentScores = [
  {
    category: 'Films des années 2000',
    score: 24,
    maxScore: 30,
    date: '2025-01-12',
    rank: 8,
  },
  {
    category: 'Séries Netflix',
    score: 18,
    maxScore: 30,
    date: '2025-01-11',
    rank: 15,
  },
  {
    category: 'Jeux vidéo populaires',
    score: 27,
    maxScore: 30,
    date: '2025-01-10',
    rank: 3,
  },
];

export default function ScoresScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mes Scores</Text>
        <Text style={styles.subtitle}>Vos performances et réussites</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Trophy size={32} color="#F59E0B" />
            <Text style={styles.statValue}>127</Text>
            <Text style={styles.statLabel}>Points totaux</Text>
          </View>
          <View style={styles.statCard}>
            <Star size={32} color="#2563EB" />
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Quiz terminés</Text>
          </View>
          <View style={styles.statCard}>
            <Medal size={32} color="#059669" />
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Meilleur rang</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Réussites</Text>
          <View style={styles.achievementsContainer}>
            {achievements.map((achievement) => {
              const IconComponent = achievement.icon;
              return (
                <View 
                  key={achievement.id} 
                  style={[
                    styles.achievementCard,
                    !achievement.unlocked && styles.achievementLocked
                  ]}
                >
                  <View style={[
                    styles.achievementIcon,
                    { backgroundColor: achievement.unlocked ? achievement.color : '#E2E8F0' }
                  ]}>
                    <IconComponent 
                      size={24} 
                      color={achievement.unlocked ? '#FFFFFF' : '#94A3B8'} 
                    />
                  </View>
                  <View style={styles.achievementContent}>
                    <Text style={[
                      styles.achievementTitle,
                      !achievement.unlocked && styles.achievementTitleLocked
                    ]}>
                      {achievement.title}
                    </Text>
                    <Text style={[
                      styles.achievementDescription,
                      !achievement.unlocked && styles.achievementDescriptionLocked
                    ]}>
                      {achievement.description}
                    </Text>
                  </View>
                  {achievement.unlocked && (
                    <View style={styles.achievementBadge}>
                      <Text style={styles.achievementBadgeText}>✓</Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Scores récents</Text>
          <View style={styles.scoresContainer}>
            {recentScores.map((scoreItem, index) => (
              <View key={index} style={styles.scoreCard}>
                <View style={styles.scoreHeader}>
                  <Text style={styles.scoreCategory}>{scoreItem.category}</Text>
                  <Text style={styles.scoreDate}>
                    {new Date(scoreItem.date).toLocaleDateString('fr-FR')}
                  </Text>
                </View>
                <View style={styles.scoreDetails}>
                  <View style={styles.scoreValue}>
                    <Text style={styles.scorePoints}>{scoreItem.score}</Text>
                    <Text style={styles.scoreMax}>/{scoreItem.maxScore}</Text>
                  </View>
                  <View style={styles.scoreRank}>
                    <Medal size={16} color="#F59E0B" />
                    <Text style={styles.scoreRankText}>#{scoreItem.rank}</Text>
                  </View>
                </View>
                <View style={styles.scoreProgress}>
                  <View 
                    style={[
                      styles.scoreProgressFill,
                      { width: `${(scoreItem.score / scoreItem.maxScore) * 100}%` }
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.shareButton}>
          <Users size={20} color="#FFFFFF" />
          <Text style={styles.shareButtonText}>Partager mes scores</Text>
        </TouchableOpacity>
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
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
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
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E293B',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
    textAlign: 'center',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 16,
  },
  achievementsContainer: {
    gap: 12,
  },
  achievementCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
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
  achievementLocked: {
    opacity: 0.6,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  achievementTitleLocked: {
    color: '#94A3B8',
  },
  achievementDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  achievementDescriptionLocked: {
    color: '#CBD5E1',
  },
  achievementBadge: {
    backgroundColor: '#059669',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  scoresContainer: {
    gap: 12,
  },
  scoreCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  scoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  scoreCategory: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    flex: 1,
  },
  scoreDate: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  scoreDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  scoreValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  scorePoints: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2563EB',
  },
  scoreMax: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '600',
  },
  scoreRank: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  scoreRankText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#F59E0B',
  },
  scoreProgress: {
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  scoreProgressFill: {
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 2,
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
    marginHorizontal: 20,
    marginBottom: 20,
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});