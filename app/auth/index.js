import React from 'react';
import {
  SafeAreaView,
} from 'react-native';
import { useAuth } from '../../context/AuthProvider';
import LoginComponent from '../../components/LoginComponent';
import Account from '../../components/Account';

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
