import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

const AuthIndex = () => {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Welcome to the Auth Screen</Text>
      <Button title="Login" onPress={() => router.push('/auth/login')} />
      <Button title="Sign Up" onPress={() => router.push('/auth/signup')} />
    </View>
  );
};

export default AuthIndex;
