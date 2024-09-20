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
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@rneui/themed';
import { router, useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { supabase } from '../../utils/supabase';
import { usePushNotifications } from '../../hooks/usePushNotifications';

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
  const { expoPushToken } = usePushNotifications();

  async function signInWithEmail() {
    setLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (!error && data.user) {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          is_logged_in: true,
          expo_push_token: expoPushToken ? expoPushToken.data : null
        })
        .eq('id', data.user.id);
      if (updateError) {
        console.error('Error updating push token: ', updateError)
      }
    }

    if (error) {
      Alert.alert('Insert email and password to sign in.', error.message)
    } else {
      router.push('(tabs)/home');
      console.log('Logging in user: ', data)
    };

    setLoading(false);
  };

  async function signUpWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert('Insert email and password to sign up.', error.message);
    setLoading(false);
  };

  return (
    <SafeAreaView className='h-full' style={styles.container}>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <Ionicons name="menu" size={30} color="#EA1D25" />
      </TouchableOpacity>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={100}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <Text style={styles.header}>Welcome!</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="email@address.com"
                placeholderTextColor='#cdd0d4'
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
                placeholderTextColor='#cdd0d4'
                secureTextEntry
                autoCapitalize='none'
              />
            </View>
            <View>
              <Button
                title="Sign in"
                disabled={loading}
                onPress={() => signInWithEmail()}
                buttonStyle={styles.primaryButton}
                titleStyle={styles.buttonText}
              />
            </View>
            <View>
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
  container: {
    backgroundColor: '#fff'
  },
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
    marginBottom: 12,
  },
  input: {
    height: 60,
    borderColor: '#8F8DAA',
    borderWidth: 1,
    paddingHorizontal: 22,
    borderRadius: 30,
    fontFamily: 'Outfit-Regular',
    fontSize: 18
  },
  inputLabel: {
    fontFamily: 'Outfit-Medium',
    color: '#333243',
  },
  primaryButton: {
    height: 60,
    backgroundColor: '#EA1D25',
    paddingHorizontal: 22,
    borderRadius: 30,
    marginBottom: 20,
  },
  secondaryButton: {
    height: 60,
    backgroundColor: '#fff',
    borderColor: '#EA1D25',
    borderWidth: 1,
    paddingHorizontal: 22,
    borderRadius: 30,
    marginTop: 10,
  },
  buttonText: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 18,
  },
  secondaryButtonText: {
    color: '#EA1D25',
  },
  signupText: {
    fontFamily: 'Outfit-Regular',
    fontSize: 16,
    color: '#333243',
    marginBottom: 10,
    alignSelf: 'center'
  },
});