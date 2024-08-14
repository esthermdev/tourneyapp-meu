import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const ScheduleScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Schedule</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          disabled={true}
          style={[styles.button, styles.openButton]} 
        >
          <View style={styles.iconContainer}>
            <Ionicons name="people" size={40} color="#333" />
          </View>
          <Text style={[styles.buttonText, { color: '#333' }]}>Open</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.mixedButton]} 
          onPress={() => router.push('schedule/mixed')}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="people" size={40} color="white" />
          </View>
          <Text style={styles.buttonText}>Mixed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  }, 
  header: {
    fontFamily: 'Outfit-Bold',
    fontSize: 35,
    color: '#EA1D25'
  },
  title: {
    fontSize: 28,
    fontFamily: 'Outfit-Bold',
    marginBottom: 30,
    color: '#FFFFFF',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  button: {
    width: '40%',
    aspectRatio: 0.8,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#FFFFFF',
  },
  mixedButton: {
    backgroundColor: '#6D28FF',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Outfit-SemiBold'
  },
});

export default ScheduleScreen;