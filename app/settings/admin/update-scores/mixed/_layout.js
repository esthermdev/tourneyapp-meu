import { Stack } from 'expo-router';

export default function MixedUpdateScoresLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, title: 'Mixed Division' }} />
      <Stack.Screen name="poolAGames" options={{ headerShown: false, title: 'Pool A Games' }} />
      <Stack.Screen name="poolBGames" options={{ headerShown: false, title: 'Pool B Games' }} />
      <Stack.Screen name="poolCGames" options={{ headerShown: false, title: 'Pool C Games' }} />
      <Stack.Screen name="poolDGames" options={{ headerShown: false, title: 'Pool D Games' }} />
      <Stack.Screen name="Crossovers" options={{ headerShown: false, title: 'Crossover Games' }} />
      <Stack.Screen name="Quarters" options={{ headerShown: false, title: 'Quarters' }} />
      <Stack.Screen name="SemiFinals" options={{ headerShown: false, title: 'Semi Finals' }} />
      <Stack.Screen name="Finals" options={{ headerShown: false, title: 'Finals' }} />
      <Stack.Screen name="ThirdPlace" options={{ headerShown: false, title: '3rd Place Games' }} />
    </Stack>
  );
}