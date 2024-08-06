// settings/admin/update-scores/index.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';

const UpdateScoresScreen = () => {
  const divisions = [
    { title: 'Mixed Division', route: 'settings/admin/update-scores/mixed' },
    // { title: 'Open Division', route: 'settings/admin/update-scores/open' },
    // Add more divisions as needed
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Update Scores</Text>
      <Text style={styles.subHeader}>Select a Division</Text>
      {divisions.map((division, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.divisionButton}
          onPress={() => router.push(division.route)}
        >
          <Text style={styles.divisionText}>{division.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 28,
    fontFamily: 'Outfit-Bold',
    marginBottom: 20,
    color: '#EA1D25',
  },
  subHeader: {
    fontSize: 20,
    fontFamily: 'Outfit-Medium',
    marginBottom: 15,
    color: '#333',
  },
  divisionButton: {
    backgroundColor: '#EA1D25',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  divisionText: {
    color: '#fff',
    fontFamily: 'Outfit-SemiBold',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default UpdateScoresScreen;