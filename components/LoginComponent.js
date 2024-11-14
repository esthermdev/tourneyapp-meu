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
  TextInput,
  SafeAreaView,
} from 'react-native';
import { Button } from '@rneui/themed';
import { router, useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { supabase } from '../utils/supabase';
import { usePushNotifications } from '../hooks/usePushNotifications';
import { ScrollView } from 'react-native-gesture-handler';
import { useAuth } from '../context/AuthProvider';

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

export default function LoginComponent() {
  const { getProfile, profile } = useAuth();
  const { expoPushToken } = usePushNotifications();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

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
          full_name: profile?.full_name,
          team_id: profile?.team_id,
          expo_push_token: expoPushToken ? expoPushToken.data : null,
        })
        .eq('id', data.user.id);
      if (updateError) {
        console.error('Error updating push token: ', updateError)
      }
    }

    if (error) {
      Alert.alert('Invalid email or password.', 'Please try again.');
    } else {
      await getProfile(data.user.id);
      router.push('(tabs)/home');
    };

    setLoading(false);
  };

  return (
    <SafeAreaView className='h-full'>
      <View style={styles.navHeader}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Ionicons name="menu" size={30} color="#EA1D25" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('(tabs)')}
        >
          <Ionicons name="home" size={30} color="#EA1D25" />
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView style={styles.content}>
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
                title="Login"
                disabled={loading}
                onPress={() => signInWithEmail()}
                buttonStyle={styles.primaryButton}
                titleStyle={styles.buttonText}
              />
              {/* <TouchableOpacity onPress={() => setShowResetPassword(true)}>
                <Text style={styles.linkText}>Forgot Password?</Text>
              </TouchableOpacity> */}
            </View>
            {/* <View>
              <Text style={styles.signupText}>Not an existing user?</Text>
              <Button
                title='Sign up'
                disabled={loading}
                onPress={() => router.push('auth/signup')}
                buttonStyle={styles.secondaryButton}
                titleStyle={[styles.buttonText, styles.secondaryButtonText]}
              />
            </View> */}
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 20
  },
  resetContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    paddingVertical: 40
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
  resetHeader: {
    fontFamily: 'Outfit-Bold',
    fontSize: 28,
    color: '#EA1D25',
    marginVertical: 30,
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
    borderRadius: 100,
    fontFamily: 'Outfit-Regular',
    fontSize: 18
  },
  resetInput: {
    height: 60,
    borderColor: '#8F8DAA',
    borderWidth: 1,
    paddingHorizontal: 22,
    borderRadius: 100,
    fontFamily: 'Outfit-Regular',
    fontSize: 18,
    marginBottom: 12
  },
  inputLabel: {
    fontFamily: 'Outfit-Medium',
    color: '#333243',
  },
  primaryButton: {
    height: 60,
    backgroundColor: '#EA1D25',
    paddingHorizontal: 22,
    borderRadius: 100,
    marginBottom: 10
  },
  linkText: {
    color: '#2871FF',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 25,
    fontFamily: 'Outfit-Regular'
  },
  secondaryButton: {
    height: 60,
    backgroundColor: '#fff',
    borderColor: '#EA1D25',
    borderWidth: 1,
    paddingHorizontal: 22,
    borderRadius: 100,
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
    marginBottom: 15,
    alignSelf: 'center',
    marginTop: 20
  },
});