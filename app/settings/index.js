import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthProvider'; // Adjust the path as needed
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';

const SettingsOption = ({ title, icon, onPress }) => (
  <TouchableOpacity style={styles.optionButton} onPress={onPress}>
    <Ionicons name={icon} size={24} color="#333243" />
    <Text style={styles.optionText}>{title}</Text>
    <Ionicons name="chevron-forward" size={24} color="#333243" />
  </TouchableOpacity>
);

const SettingsScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const { user, profile } = useAuth();

  const navigateToAdmin = () => {
    if (user && profile.role === 'admin') {
      router.push('settings/admin');
    } else {
      alert('You do not have permission to access the admin dashboard.');
    }
  };

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const settingsOptions = [
    { title: 'Notifications', icon: 'notifications-outline', onPress: () => console.log('Notifications pressed') },
    { title: 'Privacy', icon: 'lock-closed-outline', onPress: () => console.log('Privacy pressed') },
    { title: 'Help & Support', icon: 'help-circle-outline', onPress: () => console.log('Help & Support pressed') },
    { title: 'About', icon: 'information-circle-outline', onPress: () => console.log('About pressed') },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={openDrawer} style={styles.menuButton}>
          <Ionicons name="menu" size={25} color="#333243" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Settings</Text>
      </View>
      
      {settingsOptions.map((option, index) => (
        <SettingsOption key={index} {...option} />
      ))}

      {profile && profile.role === 'admin' ? (
        <TouchableOpacity style={styles.adminButton} onPress={navigateToAdmin}>
          <Ionicons name="settings-outline" size={24} color="white" />
          <Text style={styles.adminButtonText}>Admin Dashboard</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>Additional settings options will appear here based on your account type.</Text>
        </View>
      )}
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
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  menuButton: {
    marginRight: 15,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333243',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 1,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
    color: '#333243',
  },
  adminButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EA1D25',
    padding: 15,
    borderRadius: 5,
    margin: 20,
  },
  adminButtonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
  placeholderContainer: {
    backgroundColor: '#e0e0e0',
    padding: 20,
    margin: 20,
    borderRadius: 5,
  },
  placeholderText: {
    color: '#666',
    textAlign: 'center',
    fontSize: 14,
  },
});

export default SettingsScreen;