import React from 'react';
import { Stack } from 'expo-router';

const OpenScheduleLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="pool-play" options={{ headerShown: false }} />
      <Stack.Screen name="championship-bracket" options={{ headerShown: false }} />
      <Stack.Screen name="3-7place" options={{ headerShown: false }} />
      <Stack.Screen name="9place" options={{ headerShown: false }} />
      <Stack.Screen name="11-15place" options={{ headerShown: false }} />
    </Stack>
  );
};

export default OpenScheduleLayout;