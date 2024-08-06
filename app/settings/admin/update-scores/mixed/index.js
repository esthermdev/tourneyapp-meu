// settings/admin/update-scores/mixed/index.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';

const MixedUpdateScoresScreen = () => {
  const sections = [
    { title: 'Pool A Games', route: 'settings/admin/update-scores/mixed/poolAGames' },
    { title: 'Pool B Games', route: 'settings/admin/update-scores/mixed/poolBGames' },
    { title: 'Pool C Games', route: 'settings/admin/update-scores/mixed/poolCGames' },
    { title: 'Pool D Games', route: 'settings/admin/update-scores/mixed/poolDGames' },
    { title: 'Crossover Games', route: 'settings/admin/update-scores/mixed/Crossovers' },
    { title: 'Quarter Finals', route: 'settings/admin/update-scores/mixed/Quarters' },
    { title: 'Semi Finals', route: 'settings/admin/update-scores/mixed/SemiFinals' },
    { title: 'Finals', route: 'settings/admin/update-scores/mixed/Finals' },
    { title: '3rd Place Games', route: 'settings/admin/update-scores/mixed/ThirdPlace' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Mixed Division</Text>
      <Text style={styles.subHeader}>Select Games to update</Text>
      {sections.map((section, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.sectionButton}
          onPress={() => router.push(section.route)}
        >
          <Text style={styles.sectionText}>{section.title}</Text>
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
  sectionButton: {
    backgroundColor: '#EA1D25',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  sectionText: {
    color: '#fff',
    fontFamily: 'Outfit-SemiBold',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default MixedUpdateScoresScreen;