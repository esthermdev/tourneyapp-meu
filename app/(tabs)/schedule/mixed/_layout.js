import React from 'react';
import { Stack } from 'expo-router';

const MixedScheduleLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: 'Mixed Division', headerShown: false }}
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

export default MixedScheduleLayout;