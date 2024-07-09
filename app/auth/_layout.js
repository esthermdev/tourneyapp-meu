import { Stack } from 'expo-router';

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{  }} />
      <Stack.Screen name="login" options={{  }} />
      <Stack.Screen name="signup" options={{  }} />
    </Stack>
  );
};

export default AuthLayout;
