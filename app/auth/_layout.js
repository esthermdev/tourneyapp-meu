import { Stack } from 'expo-router';
import { View } from 'react-native';
import Account from './account';
import { useAuth } from '../../context/AuthProvider';

const AuthLayout = () => {
  const { session } = useAuth();

  return (
    <View style={{ flex: 1 }}>
      {session && session.user ? (
        <Account key={session.user.id} session={session} />
      ) : (
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ headerShown: false }} />
          <Stack.Screen name="account" options={{ headerShown: false }} />
          <Stack.Screen name="reset-password" options={{ headerShown: false }} />
        </Stack>
      )}
    </View>
  );
};

export default AuthLayout;