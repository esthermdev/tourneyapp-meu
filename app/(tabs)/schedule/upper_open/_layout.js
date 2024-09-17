import React from 'react';
import { Stack } from 'expo-router';

const OpenScheduleLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: 'Open Division', headerShown: false }}
      />
      <Stack.Screen
        name="pool-play"
        options={{ title: 'Pool Play', headerShown: false }}
      />
      <Stack.Screen
        name="championship-bracket"
        options={{ title: 'Championship Bracket', headerShown: false }}
      />
    </Stack>
  );
};

export default OpenScheduleLayout;