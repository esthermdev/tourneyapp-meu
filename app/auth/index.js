import React from 'react';
import {
  AppState,
  SafeAreaView,
} from 'react-native';
import { supabase } from '../../utils/supabase';
import { useAuth } from '../../context/AuthProvider';
import LoginComponent from '../../components/LoginComponent';
import Account from '../../components/Account';

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
  const { session } = useAuth();

  return (
    <SafeAreaView className='h-full bg-white'>
      {session && session.user ? (
        <Account key={session.user.id} session={session} />
      ) : (
        <LoginComponent />
      )}
    </SafeAreaView>
  );
};
