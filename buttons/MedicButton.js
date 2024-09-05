import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  Alert,
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform
} from 'react-native';
import { Image } from '@rneui/base';
import { Picker } from '@react-native-picker/picker';
import { icons } from '../constants';
import { supabase } from '../utils/supabase';

const MedicButton = () => {
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
          status: 'pending'
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

  const closeModal = () => {
    setIsPickerVisible(false);
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
        <Text className='text-white font-outfitbold text-lg'>
          {isRequesting ? 'Medic Requested' : 'Medic'}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={isPickerVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
        onDismiss={closeModal} // This will handle iOS swipe down
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.pickerContainer}>
                <Text style={styles.pickerTitle}>Select Field</Text>
                {Platform.OS === 'ios' ? (
                  <Picker
                    selectedValue={selectedField}
                    onValueChange={(itemValue) => setSelectedField(itemValue)}
                    style={styles.picker}
                    itemStyle={styles.pickerItemStyle}
                  >
                    {fields.map((field) => (
                      <Picker.Item key={field.id} label={`Field ${field.id}`} value={field.id} />
                    ))}
                  </Picker>
                ) : (
                  <View style={styles.androidPickerContainer}>
                    <Picker
                      selectedValue={selectedField}
                      onValueChange={(itemValue) => setSelectedField(itemValue)}
                      style={styles.picker}
                      mode="dropdown"
                    >
                      {fields.map((field) => (
                        <Picker.Item key={field.id} label={`Field ${field.id}`} value={field.id} />
                      ))}
                    </Picker>
                  </View>
                )}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.confirmButton} onPress={requestTrainer}>
                    <Text style={styles.buttonText}>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default MedicButton;

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
  androidPickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  pickerTitle: {
    fontSize: 20,
    fontFamily: 'Outfit-Bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  picker: {
    width: '100%',
  },
  pickerItemStyle: {
    fontFamily: 'Outfit-Regular',
    fontSize: 20
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#333243',
    padding: 10,
    borderRadius: 100,
    width: '47%',
  },
  confirmButton: {
    backgroundColor: '#EA1D25',
    padding: 10,
    borderRadius: 100,
    width: '47%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Outfit-Bold',
    fontSize: 16
  },
});