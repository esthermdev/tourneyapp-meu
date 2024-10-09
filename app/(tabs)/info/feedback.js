import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import CustomHeader from '../../../components/CustomHeader';
import { ms } from 'react-native-size-matters';
import { supabase } from '../../../utils/supabase'; // Make sure this path is correct

const FeedbackScreen = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (subject.trim() === '' || message.trim() === '') {
      Alert.alert('Error', 'Please fill in both subject and message fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('feedback')
        .insert([
          { subject, message }
        ]);

      if (error) throw error;

      Alert.alert('Success', 'Your feedback has been submitted. Thank you!');
      setSubject('');
      setMessage('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      Alert.alert('Error', 'Failed to submit feedback. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <CustomHeader title='Feedback' route='info' />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.content}>
            <Text style={styles.label}>Subject:</Text>
            <TextInput
              style={styles.input}
              value={subject}
              onChangeText={setSubject}
              placeholder="Enter subject"
            />
            <Text style={styles.label}>Message:</Text>
            <TextInput
              style={[styles.input, styles.messageInput]}
              value={message}
              onChangeText={setMessage}
              placeholder="Enter your feedback or report a bug"
              multiline
            />
            <TouchableOpacity
              style={[styles.submitButton, isSubmitting && styles.disabledButton]}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Text style={styles.submitButtonText}>
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
              </Text>
            </TouchableOpacity>

            <Text style={styles.noteHeader}>Note for Account Reset:</Text>
            <Text style={styles.noteText}>
              If you'd like to create a new account, please include "Reset account" in your subject line and provide the reason and your email in the message body.
            </Text>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  content: {
    padding: 20,
  },
  label: {
    fontFamily: 'Outfit-Bold',
    fontSize: ms(16),
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontFamily: 'Outfit-Regular',
    fontSize: ms(14),
  },
  messageInput: {
    height: 150,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#EA1D25',
    padding: 15,
    borderRadius: 100,
    alignItems: 'center',
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontFamily: 'Outfit-Bold',
    fontSize: ms(16),
  },
  noteHeader: {
    fontFamily: 'Outfit-Bold',
    fontSize: ms(16),
    marginTop: 20,
    marginBottom: 10,
  },
  noteText: {
    fontFamily: 'Outfit-Regular',
    fontSize: ms(14),
    lineHeight: ms(20),
    color: 'gray'
  },
});

export default FeedbackScreen;