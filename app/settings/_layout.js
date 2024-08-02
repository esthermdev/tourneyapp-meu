// app/(settings)/_layout.js
import { Stack } from 'expo-router';

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{
          title: 'Settings',
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="admin" 
        options={{
          title: 'Admin',
          headerShown: false
        }} 
      />
    </Stack>
  );
}