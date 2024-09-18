import { View } from 'react-native';
import Account from './account';
import LoginScreen from './index';
import { useAuth } from '../../context/AuthProvider';

const AuthLayout = () => {
  const { session } = useAuth();

  return (
    <View>
      {session && session.user ? <Account key={session.user.id} session={session} /> : <LoginScreen />}
    </View>
  );
};

export default AuthLayout;
