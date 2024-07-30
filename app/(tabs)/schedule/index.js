import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ScheduleByDivision = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Schedule by Division</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.openButton]} 
          onPress={() => router.push('schedule/open')}
        >
          <Text style={styles.buttonText}>Open</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.mixedButton]} 
          onPress={() => router.push('schedule/mixed')}
        >
          <Text style={styles.buttonText}>Mixed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Outfit-Bold',
    marginBottom: 30,
    color: '#333',
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#2871ff',
  },
  mixedButton: {
    backgroundColor: '#6D28FF',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Outfit-Bold'
  },
});

export default ScheduleByDivision;