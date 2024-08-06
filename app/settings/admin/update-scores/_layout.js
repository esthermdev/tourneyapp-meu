import { Stack } from 'expo-router';

export default function UpdateScoresLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="poolAGames" options={{ headerShown: false, title: 'Pool A Games' }} />
      <Stack.Screen name="poolBGames" options={{ headerShown: false, title: 'Pool B Games' }} />
      <Stack.Screen name="poolCGames" options={{ headerShown: false, title: 'Pool C Games' }} />
      <Stack.Screen name="poolDGames" options={{ headerShown: false, title: 'Pool D Games' }} />
      <Stack.Screen name="Crossovers" options={{ headerShown: false, title: 'Pool D Games' }} />
    </Stack>
  );
}