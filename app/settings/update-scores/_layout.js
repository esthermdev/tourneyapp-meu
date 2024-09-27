// settings/admin/update-scores/_layout.js

import { Stack } from 'expo-router';

export default function UpdateScoresLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[division]" options={{ headerShown: false }} />
    </Stack>
  );
}