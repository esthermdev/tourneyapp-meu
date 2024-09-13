import { Stack } from 'expo-router';

export default function AdminLayout() {

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="update-scores" options={{ headerShown: false }} />
      <Stack.Screen name="trainer-screen" options={{ headerShown: false }} />
    </Stack>
  );
}