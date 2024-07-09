import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import { router, Stack } from 'expo-router';
import { View } from 'react-native';
import Account from './account';
import LoginScreen from './index';

const AuthLayout = () => {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  if (session && session.user) {
    content = <Account key={session.user.id} session={session} />
  } else {
    content = <LoginScreen />
  }

  return (
    <View>
      {content}
    </View>
  );
};

export default AuthLayout;
