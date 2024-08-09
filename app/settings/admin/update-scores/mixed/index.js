import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle" size={25} color="#EA1D25" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mixed Division</Text>
      </View>
      <View style={styles.content}>
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontFamily: 'Outfit-Bold',
    fontSize: 28,
    color: '#EA1D25',
  },
  content: {
    padding: 20,
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