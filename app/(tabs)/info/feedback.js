import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Linking,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import CustomHeader from '../../../components/CustomHeader';
import { ms } from 'react-native-size-matters';

const FeedbackScreen = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (subject.trim() === '' || message.trim() === '') {
      Alert.alert('Error', 'Please fill in both subject and message fields.');
      return;
    }

    const emailSubject = encodeURIComponent(subject);
    const emailBody = encodeURIComponent(message);
    const mailtoLink = `mailto:support@maineultimateapp.org?subject=${emailSubject}&body=${emailBody}`;

    Linking.canOpenURL(mailtoLink)
      .then((supported) => {
        if (!supported) {
          Alert.alert('Error', 'Unable to open email client');
        } else {
          return Linking.openURL(mailtoLink);
        }
      })
      .then(() => {
        setSubject('');
        setMessage('');
      })
      .catch((err) => console.error('An error occurred', err));
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
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit Feedback</Text>
            </TouchableOpacity>

            <Text style={styles.noteHeader}>Note for Account Reset:</Text>
            <Text style={styles.noteText}>
              If you'd like to create a new account, format your email as follows:{'\n\n'}
              Subject: Reset account{'\n'}
              Reason: {'{state your reason why}'}{'\n'}
              Email: {'{your email}'}{'\n\n'}
              You will receive a reply from support confirming that you will be able to create a new account on the app then proceed to do so.
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