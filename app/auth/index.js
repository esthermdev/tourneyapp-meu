import React, { useState } from 'react';
import { 
  Alert, 
  StyleSheet, 
  View, 
  AppState, 
  Text, 
  TouchableOpacity, 
  TouchableWithoutFeedback, 
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput
} from 'react-native';
import { supabase } from '../../utils/supabase';
import { Button } from '@rneui/themed';
import { router, useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
});

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert('Insert email and password to sign in.', error.message)
    } else {
      router.push('(tabs)/home');
    };

    setLoading(false);
  };

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert('Insert email and password to sign up.', error.message);
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity 
        style={styles.menuButton} 
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <Ionicons name="menu" size={30} color="#EA1D25" />
      </TouchableOpacity>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <Text style={styles.header}>Welcome</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="email@address.com"
                autoCapitalize='none'
                keyboardType="email-address"
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="Password"
                secureTextEntry
                autoCapitalize='none'
              />
            </View>
            <View style={[styles.verticallySpaced, styles.mt20]}>
              <Button 
                title="Sign in" 
                disabled={loading} 
                onPress={() => signInWithEmail()} 
                buttonStyle={styles.primaryButton}
                titleStyle={styles.buttonText}
              />
            </View>
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Not an existing user?</Text>
              <Button 
                title='Sign up' 
                disabled={loading} 
                onPress={() => signUpWithEmail()} 
                buttonStyle={styles.secondaryButton}
                titleStyle={[styles.buttonText, styles.secondaryButtonText]}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    marginTop: 20,
    marginLeft: 20
  },
  content: {
    padding: 20
  },
  header: {
    fontFamily: 'Outfit-Bold',
    fontSize: 28,
    color: '#EA1D25',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontFamily: 'Outfit-Regular',
    fontSize: 18
  },
  inputLabel: {
    fontFamily: 'Outfit-Medium',
    color: '#333243',
  },
  primaryButton: {
    backgroundColor: '#EA1D25',
    borderRadius: 8,
    paddingVertical: 12,
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderColor: '#EA1D25',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 10,
  },
  buttonText: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 16,
  },
  secondaryButtonText: {
    color: '#EA1D25',
  },
  signupContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  signupText: {
    fontFamily: 'Outfit-Regular',
    color: '#333243',
    marginBottom: 10,
  },
});