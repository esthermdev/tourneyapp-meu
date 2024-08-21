import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Alert, View, Modal, TouchableOpacity } from 'react-native';
import { supabase } from '../utils/supabase';
import { Image } from '@rneui/base';
import { icons } from '../constants';
import Ionicons from '@expo/vector-icons/Ionicons';
import Dropdown from '../components/CustomDropdownComponent';

const locations = ['Field', 'Entrance', 'Command Center'];

const RequestCartButton = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [fromFieldNumber, setFromFieldNumber] = useState('');
  const [toFieldNumber, setToFieldNumber] = useState('');
  const [fields, setFields] = useState([]);

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
      const { data, error } = await supabase
        .from('cart_requests')
        .insert({
          from_location: fromLocation,
          to_location: toLocation,
          from_field_number: fromLocation === 'Field' ? parseInt(fromFieldNumber) : null,
          to_field_number: toLocation === 'Field' ? parseInt(toFieldNumber) : null,
          status: 'pending'
        })
        .select()
        .single();

      const { data: volunteer, error: volunteerError } = await supabase
        .from('profiles')
        .select('id, expo_push_token')
        .eq('is_volunteer', true);

      if (volunteerError) throw volunteerError;

      if (!volunteer || volunteer.length === 0) {
        throw new Error('No volunteers available');
      }

      if (error) throw error;

      Alert.alert('Success', 'Cart request submitted successfully');

      setIsModalVisible(false);
    } catch (error) {
      console.error('Error submitting cart request:', error);
      Alert.alert('Error', 'Failed to submit cart request');
    }
  };

  return (
    <View>

      <TouchableOpacity
        style={styles.buttonStyle}
        className="bg-[#fad830]"
        onPress={() => setIsModalVisible(true)}
      >
        <Image
          source={icons.frisbee}
          resizeMode='contain'
          style={{ width: 25, height: 25 }}
        />
        <Text className='text-white font-outfitbold text-lg'>Request Cart</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>

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

            <TouchableOpacity style={styles.submitButton} onPress={handleRequestCart}>
              <Text style={styles.submitButtonText}>Request Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  labelHeader: {
    fontFamily: 'Outfit-Semibold',
    fontSize: 18
  },
  buttonStyle: {
    width: 160,
    height: 187,
    padding: 20,
    justifyContent: 'space-between',
    borderRadius: 22
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
    width: '90%',
    maxWidth: 400,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#FA7930',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RequestCartButton;