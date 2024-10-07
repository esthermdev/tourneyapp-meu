import React, { useState } from 'react';
import { StatusBar, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { supabase } from '../../utils/supabase';
import CustomAdminHeader from '../../components/CustomAdminHeader';
import { SafeAreaView } from 'react-native-safe-area-context';

const AnnouncementScreen = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (!title.trim() || !message.trim()) {
      Alert.alert('Error', 'Please enter both title and message');
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('send-announcement', {
        body: { title, message },
      });

      if (error) throw error;

      Alert.alert('Success', 'Announcement sent successfully');
      setTitle('');
      setMessage('');
    } catch (error) {
      console.error('Error sending announcement:', error);
      Alert.alert('Error', 'Failed to send announcement');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomAdminHeader title="Send Announcement" route='settings' />
      <View style={styles.content}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter announcement title"
        />
        <Text style={styles.label}>Message</Text>
        <TextInput
          style={[styles.input, styles.messageInput]}
          value={message}
          onChangeText={setMessage}
          placeholder="Enter announcement message"
          multiline
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333243',
  },
  content: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Outfit-Medium',
    marginBottom: 5,
    color: '#fff'
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontFamily: 'Outfit-Regular',
  },
  messageInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#EA1D25',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontFamily: 'Outfit-Bold',
    fontSize: 16,
  },
});

export default AnnouncementScreen;