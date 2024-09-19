import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

const UpdateScoresScreen = () => {
  const divisions = [
    { title: 'Men - Upper', route: 'settings/update-scores/men_upper', icon: 'people' },
    // { title: 'Open Division', route: 'settings/admin/update-scores/open', icon: 'people-outline' },
    // Add more divisions as needed
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle" size={30} color="#FFA000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Update Scores</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.subHeader}>Select a Division</Text>
        {divisions.map((division, index) => (
          <TouchableOpacity
            key={index}
            style={styles.divisionButton}
            onPress={() => router.push(division.route)}
          >
            <Ionicons name={division.icon} size={24} color="#1E2A3A" style={styles.icon} />
            <Text style={styles.divisionText}>{division.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E2A3A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#34495E',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontFamily: 'Outfit-Bold',
    fontSize: 28,
    color: '#FFFFFF',
  },
  content: {
    padding: 20,
  },
  subHeader: {
    fontSize: 20,
    fontFamily: 'Outfit-Medium',
    marginBottom: 20,
    color: '#FFFFFF',
  },
  divisionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFA000',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  icon: {
    marginRight: 15,
  },
  divisionText: {
    color: '#1E2A3A',
    fontFamily: 'Outfit-SemiBold',
    fontSize: 18,
  },
});

export default UpdateScoresScreen;