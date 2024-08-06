import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

const AdminScreen = () => {

  const adminOptions = [
    { title: 'Update Scores', route: 'settings/admin/update-scores', icon: 'bar-chart' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.menuButton} 
          onPress={() => router.back()}
        >
          <Ionicons name="backspace-outline" size={25} color="#EA1D25" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {adminOptions.map((option, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.optionButton}
            onPress={() => router.push(option.route)}
          >
            <Ionicons name={option.icon} size={24} color="#fff" style={styles.optionIcon} />
            <Text style={styles.optionText}>{option.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
  },
  menuButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontFamily: 'Outfit-Bold',
    fontSize: 28,
    color: '#EA1D25',
  },
  contentContainer: {
    padding: 20,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EA1D25',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  optionIcon: {
    marginRight: 15,
  },
  optionText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Outfit-SemiBold',
  },
});

export default AdminScreen;