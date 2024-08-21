// MedicButton.js
import React, { useState, useEffect } from 'react';
import { Image } from '@rneui/base';
import { StyleSheet, Text, Alert, View, Modal, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { icons } from '../constants';
import { supabase } from '../utils/supabase';
import { useAuth } from '../context/AuthProvider';

const MedicButton = () => {
  const [isRequesting, setIsRequesting] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [fields, setFields] = useState([]);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const { user } = useAuth();

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

  const showPicker = () => setIsPickerVisible(true);
  const hidePicker = () => setIsPickerVisible(false);

  const requestTrainer = async () => {
    if (isRequesting || !selectedField) return;
    setIsRequesting(true);

    try {
      // Create a single medical request
      const { error: insertError } = await supabase
        .from('medical_requests')
        .insert({
          field_number: selectedField,
          status: 'pending',
          request_type: 'medical'
        })
        .select()
        .single();

      if (insertError) throw insertError;

      const { data: medicStaff, error: staffError } = await supabase
        .from('profiles')
        .select('id, expo_push_token')
        .eq('is_medical_staff', true);

      if (staffError) throw staffError;

      if (!medicStaff || medicStaff.length === 0) {
        throw new Error('No medical staff available');
      }

      Alert.alert('Medical assistance requested', 'Help is on the way');

    } catch (error) {
      console.error('Error requesting medical assistance:', error);
      Alert.alert('Error', 'Failed to request medical assistance');
    } finally {
      setIsRequesting(false);
      hidePicker();
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.buttonStyle}
        className={`bg-[#2956b7] ${isRequesting ? 'opacity-50' : ''}`}
        onPress={showPicker}
        disabled={isRequesting}
      >
        <Image
          source={icons.medic}
          resizeMode='contain'
          style={{ width: 25, height: 25 }}
        />
        <Text className='text-white font-outfitbold text-lg'>{isRequesting ? 'Medic Requested' : 'Medic'}</Text>
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
              <TouchableOpacity style={styles.confirmButton} onPress={requestTrainer}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MedicButton;

const styles = StyleSheet.create({
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