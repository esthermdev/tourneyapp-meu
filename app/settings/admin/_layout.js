import { Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AdminLayout() {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen 
        name="update-scores" 
        options={{
          title: 'Update Scores',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="backspace-outline" size={24} color="#000" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen 
        name="update-schedule" 
        options={{
          title: 'Update Schedule',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="backspace-outline" size={24} color="#000" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}