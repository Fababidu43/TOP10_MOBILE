import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Mail, Lock, Eye, EyeOff, User } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { isValidEmail, isValidPassword } from '@/utils/helpers';

export default function RegisterScreen() {
  const { register, state } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ 
    email?: string; 
    password?: string; 
    confirmPassword?: string;
    username?: string;
  }>({});

  const validateForm = (): boolean => {
    const newErrors: { 
      email?: string; 
      password?: string; 
      confirmPassword?: string;
      username?: string;
    } = {};

    if (!username.trim()) {
      newErrors.username = 'Le nom d\'utilisateur est requis';
    } else if (username.trim().length < 3) {
      newErrors.username = 'Le nom d\'utilisateur doit contenir au moins 3 caractères';
    }

    if (!email) {
      newErrors.email = 'L\'email est requis';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    if (!password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (!isValidPassword(password)) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirmez votre mot de passe';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      const success = await register(email, password, username);
      if (success) {
        router.replace('/');
      } else {
        Alert.alert('Erreur', 'Impossible de créer le compte');
      }
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue lors de la création du compte');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.title}>Inscription</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <Text style={styles.welcomeText}>Créer un compte</Text>
          <Text style={styles.subtitleText}>Rejoignez la communauté Top 10 Quiz</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nom d'utilisateur</Text>
            <View style={[styles.inputContainer, errors.username && styles.inputError]}>
              <User size={20} color="#64748B" />
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Votre pseudo"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={[styles.inputContainer, errors.email && styles.inputError]}>
              <Mail size={20} color="#64748B" />
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="votre@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mot de passe</Text>
            <View style={[styles.inputContainer, errors.password && styles.inputError]}>
              <Lock size={20} color="#64748B" />
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff size={20} color="#64748B" />
                ) : (
                  <Eye size={20} color="#64748B" />
                )}
              </TouchableOpacity>
            </View>
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirmer le mot de passe</Text>
            <View style={[styles.inputContainer, errors.confirmPassword && styles.inputError]}>
              <Lock size={20} color="#64748B" />
              <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="••••••••"
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? (
                  <EyeOff size={20} color="#64748B" />
                ) : (
                  <Eye size={20} color="#64748B" />
                )}
              </TouchableOpacity>
            </View>
            {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
          </View>

          <TouchableOpacity 
            style={[styles.registerButton, state.isLoading && styles.registerButtonDisabled]}
            onPress={handleRegister}
            disabled={state.isLoading}
          >
            <Text style={styles.registerButtonText}>
              {state.isLoading ? 'Création...' : 'Créer mon compte'}
            </Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>ou</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.loginLink} onPress={() => router.push('/login')}>
            <Text style={styles.loginLinkText}>
              Déjà un compte ? <Text style={styles.loginLinkBold}>Se connecter</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  form: {
    padding: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  inputError: {
    borderColor: '#DC2626',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
  },
  errorText: {
    fontSize: 14,
    color: '#DC2626',
    marginTop: 4,
  },
  registerButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  registerButtonDisabled: {
    backgroundColor: '#94A3B8',
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    fontSize: 14,
    color: '#64748B',
    paddingHorizontal: 16,
  },
  loginLink: {
    alignItems: 'center',
  },
  loginLinkText: {
    fontSize: 14,
    color: '#64748B',
  },
  loginLinkBold: {
    color: '#2563EB',
    fontWeight: '700',
  },
});