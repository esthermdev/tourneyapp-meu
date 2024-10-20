import React, { useCallback } from 'react';
import {
  SafeAreaView, BackHandler
} from 'react-native';
import { useAuth } from '../../context/AuthProvider';
import LoginComponent from '../../components/LoginComponent';
import Account from '../../components/Account';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';

export default function LoginScreen() {
  const { session } = useAuth();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        router.push('/(tabs)/home');
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

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
