import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  Alert,
  View,
  Modal,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform
} from 'react-native';
import { Image } from '@rneui/base';
import { Picker } from '@react-native-picker/picker';
import { icons } from '../constants';
import { supabase } from '../utils/supabase';
import { ScrollView } from 'react-native-gesture-handler';
import { ms } from 'react-native-size-matters';
const { width } = Dimensions.get('window');
const buttonWidth = (width - 70) / 2;


const MedicButton = ({ buttonStyle }) => {
  const [isRequesting, setIsRequesting] = useState(false);
  const [selected, setSelected] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [priorityLevel, setPriorityLevel] = useState('Medium');
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
          status: 'pending',
          priority_level: priorityLevel
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

      Alert.alert('Medical assistance requested', 'Help is on the way. Please allow some time for a trainer to make their way to your location. If no trainer has arrived please try again later as trainers may be unavailable at the moment.');

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

  const renderPriorityButton = (level, color) => (
    <TouchableOpacity
      style={[styles.priorityButton, { backgroundColor: color }, priorityLevel === level && styles.selected]}
      onPress={() => {
        setPriorityLevel(level)
      }}
      activeOpacity={0.9}
    >
      <Text style={styles.priorityButtonText} maxFontSizeMultiplier={1.2}>{level}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <TouchableOpacity
        style={[styles.buttonStyle, isRequesting && styles.disabledButton]}
        onPress={showPicker}
        disabled={isRequesting}
      >
        <Image
          source={icons.medic}
          resizeMode='contain'
          style={{ width: 25, height: 25 }}
        />
        <Text maxFontSizeMultiplier={1.1} style={styles.text}>
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
                <ScrollView>
                  <Text style={styles.selecTitle} maxFontSizeMultiplier={1.2}>Select Level of Medical Emergency</Text>
                  <View style={styles.priorityButtonContainer}>
                    {renderPriorityButton('High', '#FF6347')}
                    {renderPriorityButton('Med', '#FFA500', 'Ankle sprain, muscle strain')}
                    {renderPriorityButton('Low', '#32CD32', 'Cramping, minor bruises')}
                  </View>
                  <Text className='font-outfitregular my-3' style={styles.priorityDescription} maxFontSizeMultiplier={1.2}>
                    <Text className='font-outfitsemibold'>High:</Text> Fractured bone, ACL tear{'\n'}
                    <Text className='font-outfitsemibold'>Medium:</Text> Ankle sprain, muscle strain{'\n'}
                    <Text className='font-outfitsemibold'>Low:</Text> Cramping, minor bruises
                  </Text>
                </ScrollView>
                <Text style={styles.selecTitle} className='mt-3' maxFontSizeMultiplier={1.2}>Select Field</Text>
                {Platform.OS === 'ios' ? (
                  <Picker
                    selectedValue={selectedField}
                    onValueChange={(itemValue) => setSelectedField(itemValue)}
                    itemStyle={styles.pickerItemStyle}
                    numberOfLines={1}
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
                  <TouchableOpacity style={styles.confirmButton} onPress={requestTrainer} disabled>
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

export default MedicButton;

const styles = StyleSheet.create({
  buttonStyle: {
    flex: 1,
    padding: 20,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderRadius: 22,
    minHeight: 140,
    width: buttonWidth,
    backgroundColor: '#2956b7',
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
  selecTitle: {
    fontSize: ms(18),
    fontFamily: 'Outfit-Bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  priorityDescription: {
    fontSize: ms(16)
  },
  pickerItemStyle: {
    fontFamily: 'Outfit-Regular',
    fontSize: ms(20)
  },
  priorityTitle: {
    fontSize: ms(18),
    fontFamily: 'Outfit-Bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  priorityButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginVertical: 10
  },
  priorityButton: {
    padding: 10,
    borderRadius: 5,
    width: '25%',
    justifyContent: 'center'
  },
  priorityButtonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Outfit-Bold',
    fontSize: ms(15),
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
  selected: {
    borderWidth: 2,
    borderColor: '#000',
  },
});