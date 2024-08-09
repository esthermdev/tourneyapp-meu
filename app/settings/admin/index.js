import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

const AdminOption = ({ title, icon, onPress, disabled }) => (
  <TouchableOpacity style={styles.optionButton} disabled={disabled} onPress={onPress}>
    <Ionicons name={icon} size={40} color="#FFFFFF" />
    <Text style={styles.optionText}>{title}</Text>
  </TouchableOpacity>
);

const AdminScreen = () => {
  const adminOptions = [
    { title: 'Update Scores', icon: 'bar-chart', route: 'settings/admin/update-scores', disabled: false },
    { title: 'Manage Teams', icon: 'people', route: 'settings/admin/manage-teams', disabled: true },
    { title: 'Schedule Games', icon: 'calendar', route: 'settings/admin/schedule-games', disabled: true },
    { title: 'Tournament Settings', icon: 'settings', route: 'settings/admin/tournament-settings', disabled: true },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.navigate('/settings')}>
          <Ionicons name="arrow-back-circle" size={30} color="#FFA000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
      </View>
      <Text style={styles.subtitle}>What do you need?</Text>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {adminOptions.map((option, index) => (
          <AdminOption
            key={index}
            title={option.title}
            icon={option.icon}
            disabled={option.disabled}
            onPress={() => router.push(option.route)}
          />
        ))}
      </ScrollView>
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
  subtitle: {
    fontFamily: 'Outfit-Medium',
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 20,
    marginLeft: 20,
  },
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 20,
  },
  optionButton: {
    width: '45%',
    aspectRatio: 1,
    backgroundColor: '#FFA000',
    borderRadius: 15,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Outfit-SemiBold',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default AdminScreen;