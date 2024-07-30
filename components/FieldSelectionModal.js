import React from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const FieldSelectionModal = ({ visible, onClose, onSelectField }) => {
  const fields = Array.from({ length: 20 }, (_, i) => i + 1);

  const renderField = ({ item }) => (
    <TouchableOpacity 
      style={styles.fieldButton} 
      onPress={() => onSelectField(item)}
    >
      <Text style={styles.fieldText}>Field {item}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Select a Field</Text>
          <FlatList
            data={fields}
            renderItem={renderField}
            keyExtractor={(item) => item.toString()}
            numColumns={2}
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  fieldButton: {
    flex: 1,
    margin: 5,
    padding: 10,
    backgroundColor: '#2871FF',
    borderRadius: 5,
    alignItems: 'center',
  },
  fieldText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FA7930',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default FieldSelectionModal;