import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Alert, View, Modal, TouchableOpacity } from 'react-native';
import { supabase } from '../utils/supabase';
import Ionicons from '@expo/vector-icons/Ionicons';
import Dropdown from '../components/CustomDropdownComponent';
import { usePushNotifications } from '../hooks/usePushNotifications';
import { Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');
const buttonWidth = (width - 70) / 2;

const locations = ['Field', 'Entrance', 'Command Center'];

const RequestCartButton = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [fromFieldNumber, setFromFieldNumber] = useState('');
  const [toFieldNumber, setToFieldNumber] = useState('');
  const [fields, setFields] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const { expoPushToken } = usePushNotifications();

  useEffect(() => {
    fetchFields();
  }, []);

  const fetchFields = async () => {
    const { data, error } = await supabase.from('fields').select('id');
    if (error) {
      console.error('Error fetching fields:', error);
    } else {
      setFields(data.map(field => field.id));
    }
  };

  const handleRequestCart = async () => {
    try {
      setIsButtonDisabled(true);

      const { data, error } = await supabase
        .from('cart_requests')
        .insert({
          from_location: fromLocation,
          to_location: toLocation,
          from_field_number: fromLocation === 'Field' ? parseInt(fromFieldNumber) : null,
          to_field_number: toLocation === 'Field' ? parseInt(toFieldNumber) : null,
          status: 'pending',
          requester_token: expoPushToken.data
        })
        .select()
        .single();

      if (error) throw error;

      Alert.alert('Success', 'Cart request submitted successfully. Please wait for a driver.');
      setIsModalVisible(false);

      // Set a timeout to re-enable the button after 60 seconds
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 60000);

    } catch (error) {
      console.error('Error submitting cart request:', error);
      Alert.alert('Error', 'Failed to submit cart request');
      setIsButtonDisabled(false);
    }
  };

  return (
    <View>

      <TouchableOpacity
        style={[styles.buttonStyle, isButtonDisabled && styles.disabledButton]}
        className="bg-[#E9BD21]"
        onPress={() => !isButtonDisabled && setIsModalVisible(true)}
        disabled={isButtonDisabled}
      >
        <Ionicons name="car" size={30} color="#FFF" />
        <Text className='text-white font-outfitbold text-lg'>
          {isButtonDisabled ? 'Request Pending...' : 'Request Cart'}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
              <Ionicons name="close" size={20} color="#8F8DAA" />
            </TouchableOpacity>
            <ScrollView showsVerticalScrollIndicator>
              <Text style={styles.noteText}>
                Note: Our volunteer drivers are dedicated to assisting you as quickly as possible. To help us serve everyone efficiently:
                {'\n\n'}
                • If you're in a group, please submit only one request.{'\n'}
                • Allow up to 5 minutes for a driver to reach you.{'\n'}
                • If no driver arrives after 5 minutes, feel free to submit another request.
                {'\n\n'}
                Thank you for your patience and understanding as we work to accommodate everyone's transportation needs.
              </Text>
            </ScrollView>
            <Text style={styles.labelHeader}>From:</Text>
            <Dropdown
              label="From Location"
              data={locations}
              onSelect={(item) => setFromLocation(item)}
              selectedValue={fromLocation}
            />

            {fromLocation === 'Field' && (
              <Dropdown
                label="From Field Number"
                data={fields}
                onSelect={(item) => setFromFieldNumber(item)}
                selectedValue={fromFieldNumber}
              />
            )}

            <Text style={styles.labelHeader}>To:</Text>
            <Dropdown
              label="To Location"
              data={locations}
              onSelect={(item) => setToLocation(item)}
              selectedValue={toLocation}
            />

            {toLocation === 'Field' && (
              <Dropdown
                label="To Field Number"
                data={fields}
                onSelect={(item) => setToFieldNumber(item)}
                selectedValue={toFieldNumber}
              />
            )}

            <TouchableOpacity style={styles.submitButton} onPress={handleRequestCart} disabled>
              <Text style={styles.submitButtonText}>Request Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  disabledButton: {
    opacity: 0.5,
  },
  labelHeader: {
    fontFamily: 'Outfit-Bold',
    fontSize: 16,
    marginTop: 4,
    marginBottom: 8
  },
  buttonStyle: {
    flex: 1,
    padding: 20,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderRadius: 22,
    minHeight: 120,
    width: buttonWidth,
    backgroundColor: '#E9BD21',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    height: '80%',
    maxWidth: 350,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  submitButton: {
    backgroundColor: '#EA1D25',
    padding: 15,
    borderRadius: 100,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontFamily: 'Outfit-Bold',
    fontSize: 16
  },
  noteText: {
    fontFamily: 'Outfit-Regular',
    fontSize: 15,
    color: '#666',
    marginVertical: 10,
  }
});

export default RequestCartButton;