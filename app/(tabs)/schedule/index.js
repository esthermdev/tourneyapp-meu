import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ScheduleByDivision = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Schedule</Text>
      </View>
      <Text style={styles.title}>Division</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          disabled={true}
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
    backgroundColor: '#fff',
    padding: 20,
  },
  headerContainer: {
    flex: 1,
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
    fontWeight: 'bold',
    fontFamily: 'Outfit-Bold',
    marginBottom: 30,
    color: '#333',
  },
  buttonContainer: {
    flex: 2,
    width: '100%',
  },
  button: {
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: 'lightgray',
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