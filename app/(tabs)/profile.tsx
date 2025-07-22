import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { User, Settings, Bell, Moon, Sun, Share2, Heart, CircleHelp as HelpCircle, LogOut, CreditCard as Edit3, Crown } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import * as Haptics from 'expo-haptics';
import { Platform, Alert, Linking } from 'react-native';

export default function ProfileScreen() {
  const { state: authState, logout, updateProfile } = useAuth();
  const [notifications, setNotifications] = useState(authState.user?.settings?.notifications || true);
  const [soundEffects, setSoundEffects] = useState(authState.user?.settings?.sounds || true);
  const [hapticFeedback, setHapticFeedback] = useState(authState.user?.settings?.haptics || true);

  const avatars = ['🎯', '🎮', '🎬', '🎵', '🌟', '🚀', '🎭', '🎨'];
  const [selectedAvatar, setSelectedAvatar] = useState(authState.user?.avatar || '🎯');

  const handleAvatarChange = (avatar: string) => {
    setSelectedAvatar(avatar);
    updateProfile({ avatar });
    
    // Haptic feedback
    if (Platform.OS !== 'web' && hapticFeedback) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };
  
  const handleSettingChange = (setting: keyof typeof authState.user.settings, value: boolean) => {
    const newSettings = {
      ...authState.user?.settings,
      [setting]: value,
    };
    
    updateProfile({ settings: newSettings });
    
    switch (setting) {
      case 'notifications':
        setNotifications(value);
        break;
      case 'sounds':
        setSoundEffects(value);
        break;
      case 'haptics':
        setHapticFeedback(value);
        break;
    }
  };

  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  const handleShareApp = async () => {
    try {
      const message = "🎯 Decouvrez Top 10 Quiz ! Devinez les 10 elements les plus populaires dans differentes categories. Telechargez maintenant !";
      
      if (Platform.OS === 'web') {
        // Pour le web, copier dans le presse-papiers
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(message);
          Alert.alert('Succes', 'Le lien a ete copie dans votre presse-papiers !');
        } else {
          Alert.alert('Info', 'Copiez ce message : ' + message);
        }
      } else {
        // Pour mobile, utiliser l'API de partage native
        const { Share } = require('react-native');
        await Share.share({
          message,
          title: 'Top 10 Quiz',
        });
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de partager l\'application');
    }
  };

  const handleRateApp = () => {
    Alert.alert(
      'Noter l\'application',
      'Merci de nous soutenir ! Votre avis nous aide a ameliorer l\'application.',
      [
        { text: 'Plus tard', style: 'cancel' },
        { 
          text: 'Noter maintenant', 
          onPress: () => {
            // Simuler l'ouverture du store
            Alert.alert('Merci !', 'Redirection vers le store...');
          }
        }
      ]
    );
  };

  const handleHelp = () => {
    Alert.alert(
      'Aide & FAQ',
      '🎯 Comment jouer ?\nDevinez les 10 elements d\'un classement !\n\n❓ Regles :\n• 3 tentatives par element\n• 3 points par bonne reponse\n• Indices disponibles\n\n📧 Support :\nsupport@top10quiz.com',
      [{ text: 'Compris' }]
    );
  };

  const handleTerms = () => {
    Alert.alert(
      'Conditions d\'utilisation',
      '📋 Conditions generales :\n\n• Application gratuite\n• Donnees personnelles protegees\n• Contenu a des fins de divertissement\n• Mise a jour reguliere du contenu\n\n📞 Contact :\nlegal@top10quiz.com',
      [{ text: 'J\'accepte' }]
    );
  };

  if (!authState.isAuthenticated) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Profil</Text>
        </View>
        <View style={styles.notAuthenticatedContainer}>
          <Text style={styles.notAuthenticatedTitle}>Connexion requise</Text>
          <Text style={styles.notAuthenticatedText}>
            Connectez-vous pour accéder à votre profil et sauvegarder vos scores.
          </Text>
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={() => router.push('/login')}
          >
            <Text style={styles.loginButtonText}>Se connecter</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profil</Text>
        <TouchableOpacity style={styles.editButton}>
          <Edit3 size={20} color="#2563EB" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatar}>{selectedAvatar}</Text>
            <View style={styles.levelBadge}>
              <Crown size={16} color="#F59E0B" />
              <Text style={styles.levelText}>Niveau {authState.user?.level}</Text>
            </View>
          </View>
          <Text style={styles.username}>{authState.user?.username}</Text>
          <Text style={styles.userStats}>
            {authState.user?.totalPoints} points • {authState.user?.quizCompleted} quiz terminés
          </Text>
          
          <View style={styles.avatarSelector}>
            <Text style={styles.avatarSelectorTitle}>Choisir un avatar :</Text>
            <View style={styles.avatarGrid}>
              {avatars.map((avatarEmoji, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.avatarOption,
                    selectedAvatar === avatarEmoji && styles.avatarSelected
                  ]}
                  onPress={() => handleAvatarChange(avatarEmoji)}
                >
                  <Text style={styles.avatarEmoji}>{avatarEmoji}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Paramètres</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Bell size={20} color="#64748B" />
              <Text style={styles.settingLabel}>Notifications</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={(value) => handleSettingChange('notifications', value)}
              trackColor={{ false: '#E2E8F0', true: '#D97706' }}
              thumbColor={notifications ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingIcon}>🔊</Text>
              <Text style={styles.settingLabel}>Effets sonores</Text>
            </View>
            <Switch
              value={soundEffects}
              onValueChange={(value) => handleSettingChange('sounds', value)}
              trackColor={{ false: '#E2E8F0', true: '#D97706' }}
              thumbColor={soundEffects ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingIcon}>📱</Text>
              <Text style={styles.settingLabel}>Vibrations</Text>
            </View>
            <Switch
              value={hapticFeedback}
              onValueChange={(value) => handleSettingChange('haptics', value)}
              trackColor={{ false: '#E2E8F0', true: '#D97706' }}
              thumbColor={hapticFeedback ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Social</Text>
          
          <TouchableOpacity style={styles.menuItem} onPress={handleShareApp}>
            <Share2 size={20} color="#64748B" />
            <Text style={styles.menuLabel}>Partager l'app</Text>
            <Text style={styles.menuArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleRateApp}>
            <Heart size={20} color="#64748B" />
            <Text style={styles.menuLabel}>Noter l'app</Text>
            <Text style={styles.menuArrow}>→</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <TouchableOpacity style={styles.menuItem} onPress={handleHelp}>
            <HelpCircle size={20} color="#64748B" />
            <Text style={styles.menuLabel}>Aide & FAQ</Text>
            <Text style={styles.menuArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleTerms}>
            <Settings size={20} color="#64748B" />
            <Text style={styles.menuLabel}>Conditions d'utilisation</Text>
            <Text style={styles.menuArrow}>→</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <LogOut size={20} color="#DC2626" />
          <Text style={styles.logoutText} onPress={handleLogout}>Se déconnecter</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
          <Text style={styles.copyrightText}>© 2025 Top 10 Quiz</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  },
  editButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  profileSection: {
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
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    fontSize: 64,
    textAlign: 'center',
  },
  levelBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  levelText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#92400E',
  },
  username: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 4,
  },
  userStats: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
    marginBottom: 24,
  },
  avatarSelector: {
    width: '100%',
  },
  avatarSelectorTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
    textAlign: 'center',
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  avatarOption: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  avatarSelected: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
  avatarEmoji: {
    fontSize: 24,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingIcon: {
    fontSize: 20,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    flex: 1,
  },
  menuArrow: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '600',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    marginHorizontal: 20,
    borderRadius: 16,
    paddingVertical: 16,
    gap: 8,
    marginBottom: 32,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#DC2626',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 32,
  },
  versionText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
    marginBottom: 4,
  },
  copyrightText: {
    fontSize: 12,
    color: '#94A3B8',
  },
  notAuthenticatedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  notAuthenticatedTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 16,
    textAlign: 'center',
  },
  notAuthenticatedText: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  loginButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});