import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { supabase } from '../../utils/supabase';
import { useRouter } from 'expo-router';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function signUpWithEmail() {
    setLoading(true)
    const {
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: fullName
        }
      }
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>Full Name</Text>
      <TextInput
        value={fullName}
        onChangeText={setFullName}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />
      <Text>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginBottom: 10 }}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, marginBottom: 10 }}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={() => signUpWithEmail()} />
    </View>
  );
};

export default SignUpScreen;
