import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';

const UpdateScoresScreen = () => {
  const sections = [
    { title: 'Pool A Games', route: 'settings/admin/update-scores/poolAGames' },
    { title: 'Pool B Games', route: 'settings/admin/update-scores/poolBGames' },
    { title: 'Pool C Games', route: 'settings/admin/update-scores/poolCGames' },
    { title: 'Pool D Games', route: 'settings/admin/update-scores/poolDGames' },
    { title: 'Crossover Games', route: 'settings/admin/update-scores/Crossovers' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Update Scores</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
    fontFamily: 'Outfit-Semibold',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default UpdateScoresScreen;