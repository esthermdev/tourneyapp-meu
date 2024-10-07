import React, { useState, useEffect } from 'react';
import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as Linking from "expo-linking";
import { supabase } from "../utils/supabase";
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';

const redirectTo = makeRedirectUri();
console.log('redirect:', redirectTo)

const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url);

  if (errorCode) throw new Error(errorCode);
  const { access_token, refresh_token } = params;

  if (!access_token) return;

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });
  if (error) throw error;

  console.log('Session created', data.session)
  return data.session;
};

const sendMagicLink = async (email) => {
  const { data, error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      emailRedirectTo: redirectTo,
    },
  });

    if (!error && data.user) {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          is_logged_in: true,
        })
        
      if (updateError) {
        console.error('Error updating push token: ', updateError)
      }
    }
  // Email sent.
};

export default function Auth() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  // Handle linking into app from email app.
  const url = Linking.useURL();
  console.log('First session URL:', { url })

  if (url) createSessionFromUrl(url);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button
        title={loading ? 'Sending...' : 'Send Magic Link'}
        onPress={() => sendMagicLink(email)}
        disabled={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});