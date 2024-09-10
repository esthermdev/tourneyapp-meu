import React from 'react';
import { Stack } from 'expo-router';

const MixedUpdateScoresLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[gameType]" options={{ headerShown: false }} />
    </Stack>
  );
};

export default MixedUpdateScoresLayout;