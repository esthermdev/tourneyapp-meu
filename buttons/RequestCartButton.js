import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  Alert,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Dimensions
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { supabase } from '../utils/supabase';
import Ionicons from '@expo/vector-icons/Ionicons';
import Dropdown from '../components/CustomDropdownComponent';
import { usePushNotifications } from '../hooks/usePushNotifications';
import { ms } from 'react-native-size-matters';

const { width, height } = Dimensions.get('window');
const buttonWidth = (width - 70) / 2;
const modalHeight = height * 0.8; // 80% of screen height

const locations = ['Field', 'Tourney Central', 'Lot 1', 'Lot 2'];

const RequestCartButton = ({ disabled }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [fromFieldNumber, setFromFieldNumber] = useState('');
  const [toFieldNumber, setToFieldNumber] = useState('');
  const [fields, setFields] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [passengerCount, setPassengerCount] = useState(1);
  const [specialRequest, setSpecialRequest] = useState('');

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
          passenger_count: passengerCount,
          special_request: specialRequest,
          status: 'pending',
          requester_token: expoPushToken?.data
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

  const PassengerCountInput = ({ value, onValueChange }) => {
    const increment = () => onValueChange(Math.min(value + 1, 6));
    const decrement = () => onValueChange(Math.max(value - 1, 1));

    return (
      <View style={styles.passengerCountContainer}>
        <TouchableOpacity onPress={decrement} style={styles.passengerCountButton}>
          <Ionicons name="remove" size={24} color="#EA1D25" />
        </TouchableOpacity>
        <Text style={styles.passengerCountText}>{value}</Text>
        <TouchableOpacity onPress={increment} style={styles.passengerCountButton}>
          <Ionicons name="add" size={24} color="#EA1D25" />
        </TouchableOpacity>
      </View>
    );
  };

  const isFormValid = () => {
    if (!fromLocation || !toLocation) return false;
    if (fromLocation === 'Field' && !fromFieldNumber) return false;
    if (toLocation === 'Field' && !toFieldNumber) return false;
    if (fromLocation === toLocation && fromFieldNumber === toFieldNumber) return false;
    return true;
  };

  const resetInputs = () => {
    setFromLocation('');
    setToLocation('');
    setFromFieldNumber('');
    setToFieldNumber('');
    setPassengerCount(1);
    setSpecialRequest('');
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    resetInputs();
  };

  return (
    <View>
      <TouchableOpacity
        style={[styles.buttonStyle, isButtonDisabled && styles.disabledButton]}
        className="bg-[#E9BD21]"
        onPress={() => !isButtonDisabled && setIsModalVisible(true)}
        disabled={isButtonDisabled || disabled}
      >
        <Ionicons name="car" size={30} color="#FFF" />
        <Text maxFontSizeMultiplier={1} style={styles.text}>
          {isButtonDisabled ? 'Request Pending...' : 'Request Cart'}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
              <Ionicons name="close" size={20} color="#8F8DAA" />
            </TouchableOpacity>
            <KeyboardAwareScrollView
              enableOnAndroid={true}
              enableAutomaticScroll={Platform.OS === 'ios'}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.scrollViewContent}
              showsVerticalScrollIndicator={false}
            >
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                  <Text style={styles.noteText} maxFontSizeMultiplier={1.2}>
                    Note: Our volunteer drivers are dedicated to assisting you as quickly as possible. To help us serve everyone efficiently:
                    {'\n\n'}
                    • If you're in a group, please submit only one request.{'\n'}
                    • Allow up to 5 minutes for a driver to reach you.{'\n'}
                    • If no driver arrives after 5 minutes, feel free to submit another request.
                    {'\n\n'}
                    Thank you for your patience and understanding as we work to accommodate everyone's transportation needs.
                  </Text>

                  <Text style={styles.labelHeader} maxFontSizeMultiplier={1.2}>Number of Passengers:</Text>
                  <PassengerCountInput
                    value={passengerCount}
                    onValueChange={setPassengerCount}
                  />

                  <Text style={styles.labelHeader} maxFontSizeMultiplier={1.2}>From:</Text>
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

                  <Text style={styles.labelHeader} maxFontSizeMultiplier={1.2}>To:</Text>
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

                  <Text style={styles.labelHeader} maxFontSizeMultiplier={1.2}>Special Request:</Text>
                  <TextInput
                    style={styles.specialRequestInput}
                    placeholder="e.g., Wheelchair needed, carrying large items..."
                    value={specialRequest}
                    onChangeText={setSpecialRequest}
                    multiline
                    numberOfLines={3}
                    maxLength={200}
                  />

                  <TouchableOpacity
                    style={[styles.submitButton, !isFormValid() && styles.disabledSubmitButton]}
                    onPress={handleRequestCart}
                    disabled={!isFormValid()}
                  >
                    <Text style={styles.submitButtonText} maxFontSizeMultiplier={1.2}>Request Cart</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </KeyboardAwareScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  disabledSubmitButton: {
    backgroundColor: '#ccc',
  },
  disabledButton: {
    opacity: 0.5,
  },
  labelHeader: {
    fontFamily: 'Outfit-Bold',
    fontSize: ms(16),
    marginVertical: 8
  },
  buttonStyle: {
    flex: 1,
    padding: 20,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderRadius: 22,
    minHeight: 120,
    width: buttonWidth,
    backgroundColor: '#808080',
  },
  text: {
    fontSize: ms(16),
    fontFamily: 'Outfit-Bold',
    color: '#fff'
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
    height: modalHeight,
    overflow: 'hidden'
  },
  noteText: {
    fontFamily: 'Outfit-Regular',
    fontSize: ms(14),
    color: '#666',
  },
  closeButton: {
    alignSelf: 'flex-end',
    zIndex: 1,
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
    fontSize: ms(16)
  },
  passengerCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  passengerCountButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  passengerCountText: {
    fontFamily: 'Outfit-Bold',
    fontSize: ms(18),
    marginHorizontal: 20,
  },
  specialRequestInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontFamily: 'Outfit-Regular',
    fontSize: ms(14),
    textAlignVertical: 'top',
  },
});

export default RequestCartButton;