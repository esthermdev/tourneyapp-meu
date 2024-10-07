import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, View, Text, TextInput } from 'react-native';
import { Button } from '@rneui/themed';
import { supabase } from '../utils/supabase';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleResetPassword() {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      Alert.alert('Error found', error.message);
    } else {
      Alert.alert('Success', 'Your password has been reset.', [
        { text: 'OK', onPress: () => router.replace('/') },
      ]);
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reset Your Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={setNewPassword}
        value={newPassword}
        placeholder="New Password"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        placeholder="Confirm New Password"
        secureTextEntry
      />
      <Button
        title="Reset Password"
        onPress={handleResetPassword}
        buttonStyle={styles.primaryButton}
        titleStyle={styles.buttonText}
        loading={loading}
        disabled={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 80,
    padding: 30,
  },
  header: {
    fontFamily: 'Outfit-Bold',
    fontSize: 28,
    color: '#EA1D25',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 60,
    borderColor: '#8F8DAA',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 22,
    borderRadius: 100,
    fontFamily: 'Outfit-Regular',
    fontSize: 18,
  },
  primaryButton: {
    height: 60,
    backgroundColor: '#EA1D25',
    paddingHorizontal: 22,
    borderRadius: 100,
    marginBottom: 20,
  },
  buttonText: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  secondaryButton: {
    height: 60,
    backgroundColor: '#fff',
    borderColor: '#EA1D25',
    borderWidth: 1,
    paddingHorizontal: 22,
    borderRadius: 100,
    marginTop: 10,
  },
  secondaryButtonText: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 18,
    color: '#EA1D25',
  },
  linkText: {
    fontFamily: 'Outfit-Regular',
    fontSize: 16,
    color: '#2871FF',
    textAlign: 'center',
    marginTop: 15,
  },
  errorText: {
    fontFamily: 'Outfit-Regular',
    fontSize: 14,
    color: '#EA1D25',
    textAlign: 'center',
    marginTop: 10,
  },
  successText: {
    fontFamily: 'Outfit-Regular',
    fontSize: 14,
    color: '#4CAF50',
    textAlign: 'center',
    marginTop: 10,
  },
  inputLabel: {
    fontFamily: 'Outfit-Medium',
    fontSize: 16,
    color: '#333243',
    marginBottom: 5,
  },
});