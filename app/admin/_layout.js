import { Stack } from 'expo-router';

export default function AdminLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Admin Dashboard' }} />
      <Stack.Screen name="update-scores" options={{ title: 'Update Scores' }} />
      <Stack.Screen name="update-schedule" options={{ title: 'Update Schedule' }} />
    </Stack>
  );
}