// MedicButton.js
import React, { useState, useEffect } from 'react';
import { Image } from '@rneui/base';
import { StyleSheet, Text, Alert, View, Modal, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { icons } from '../constants';
import { supabase } from '../utils/supabase';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthProvider';

const WaterRefillButton = () => {
  const [isRequesting, setIsRequesting] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [fields, setFields] = useState([]);
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  useEffect(() => {
    fetchFields();
  }, []);

  const fetchFields = async () => {
    const { data, error } = await supabase.from('fields').select('*');
    if (error) {
      console.error('Error fetching fields:', error);
    } else {
      setFields(data);
      setSelectedField(data[0]?.id);
    }
  };

  const showPicker = () => {
    setIsPickerVisible(true);
  };

  const hidePicker = () => {
    setIsPickerVisible(false);
  };

  const requestWater = async () => {
    if (isRequesting || !selectedField) return;

    setIsRequesting(true);

    try {
      // Create a single medical request
      const { data: newRequest, error: insertError } = await supabase
        .from('water_refill')
        .insert({
          field_number: selectedField,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      const { data: volunteer, error: volunteerError } = await supabase
        .from('profiles')
        .select('id, expo_push_token')
        .eq('is_volunteer', true);

      if (volunteerError) throw volunteerError;

      if (!volunteer || volunteer.length === 0) {
        throw new Error('No volunteers available');
      }

      Alert.alert('Refill of water jugs requested', 'Water is on the way');

    } catch (error) {
      console.error('Error requesting water jub refills:', error);
      Alert.alert('Error', 'Failed to request water jug refill');
    } finally {
      setIsRequesting(false);
      hidePicker();
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.buttonStyle}
        className={`bg-[#3DC5C5] ${isRequesting ? 'opacity-50' : ''}`}
        onPress={showPicker}
        disabled={isRequesting}
      >
        <Ionicons name="water" size={27} color="#FFF" />
        <Text className='text-white font-outfitbold text-lg'>{isRequesting ? 'Requesting Water' : 'Water'}</Text>
      </TouchableOpacity>

      <Modal
        visible={isPickerVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerTitle}>Select Field</Text>
            <Picker
              selectedValue={selectedField}
              onValueChange={(itemValue) => setSelectedField(itemValue)}
              style={styles.picker}
            >
              {fields.map((field) => (
                <Picker.Item key={field.id} label={`Field ${field.id}`} value={field.id} />
              ))}
            </Picker>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={hidePicker}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={requestWater}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default WaterRefillButton;

const styles = StyleSheet.create({
  buttonStyle: {
    width: 160,
    height: 136,
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
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  picker: {
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    width: '40%',
  },
  confirmButton: {
    backgroundColor: '#2956b7',
    padding: 10,
    borderRadius: 5,
    width: '40%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});