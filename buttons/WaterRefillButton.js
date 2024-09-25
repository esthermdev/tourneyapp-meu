import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  Alert,
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  Dimensions
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import { supabase } from '../utils/supabase';
import { ms } from 'react-native-size-matters';

const { width } = Dimensions.get('window');
const buttonWidth = (width - 70) / 2;

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

  const closeModal = () => {
    setIsPickerVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={[styles.buttonStyle, isRequesting && styles.disabledButton]}
        onPress={showPicker}
        disabled={isRequesting}
      >
        <Ionicons name="water" size={27} color="#FFF" />
        <Text maxFontSizeMultiplier={1.1} style={styles.text}>{isRequesting ? 'Requesting Water' : 'Water'}</Text>
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
                <Text style={styles.pickerTitle} maxFontSizeMultiplier={1.2}>Select Field</Text>
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
                    <Text style={styles.buttonText} maxFontSizeMultiplier={1.2}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.confirmButton} onPress={requestWater} disabled>
                    <Text style={styles.buttonText} maxFontSizeMultiplier={1.2}>Confirm</Text>
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

export default WaterRefillButton;

const styles = StyleSheet.create({
  buttonStyle: {
    flex: 1,
    padding: 20,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderRadius: 22,
    minHeight: 120,
    width: buttonWidth,
    backgroundColor: '#3DC5C5',
  },
  text: {
    fontSize: ms(18),
    fontFamily: 'Outfit-Bold',
    color: '#fff'
  },
  disabledButton: {
    opacity: 0.5,
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
    fontSize: ms(20),
    fontFamily: 'Outfit-Bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  picker: {
    width: '100%',
  },
  pickerItemStyle: {
    fontFamily: 'Outfit-Regular',
    fontSize: ms(20)
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
    fontSize: ms(16)
  },
});