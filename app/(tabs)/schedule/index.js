import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


const ScheduleScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Schedule</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.openButton]}
          onPress={() => router.push('schedule/open')}
          disabled
        >
          <View style={styles.iconContainer}>
            <FontAwesome6 name="people-group" size={40} color="#2871FF" />
          </View>
          <Text style={styles.buttonText}>Open</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.mixedButton]}
          onPress={() => router.push('schedule/mixed')}
        >
          <View style={styles.iconContainer}>
            <FontAwesome6 name="people-group" size={40} color="#6D28FF" />
          </View>
          <Text style={styles.buttonText}>Mixed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.womenButton]}
          onPress={() => router.push('schedule/women')}
          disabled
        >
          <View style={styles.iconContainer}>
            <FontAwesome6 name="people-group" size={40} color='#FF026C' />
          </View>
          <Text style={styles.buttonText}>Women</Text>
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
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    gap: 15
  },
  button: {
    width: '40%',
    aspectRatio: 0.8,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#2871FF',
  },
  mixedButton: {
    backgroundColor: '#6D28FF',
  },
  womenButton: {
    backgroundColor: '#FF026C',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    shadowColor: 'white',
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Outfit-SemiBold'
  },
});

export default ScheduleScreen;