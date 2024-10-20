// _layout.js
import React from 'react';
import { Stack } from 'expo-router';
import { View, } from 'react-native';

const AuthLayout = () => {

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AuthLayout;