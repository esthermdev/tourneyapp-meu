import React from 'react';
import { StatusBar, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useNavigation } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { DrawerActions } from '@react-navigation/native';
import { useButtonState } from '../../context/ButtonStateContext';
import { useAuth } from '../../context/AuthProvider';

const AdminOption = ({ title, icon, onPress, disabled }) => (
  <TouchableOpacity style={styles.optionButton} disabled={disabled} onPress={onPress}>
    <Text>{icon}</Text>
    <Text maxFontSizeMultiplier={1} style={styles.optionText}>{title}</Text>
  </TouchableOpacity>
);

const AdminScreen = () => {
  const navigation = useNavigation();

  const adminOptions = [
    {
      title: 'Update Scores',
      icon: <MaterialIcons name='scoreboard' size={52} color="#FFFFFF" />,
      route: 'settings/update-scores',
      disabled: false
    },
    {
      title: 'Trainers List',
      icon: <MaterialIcons name="sports" size={52} color="#FFFFFF" />,
      route: 'settings/trainer-screen',
      disabled: false
    },
    {
      title: 'Cart Requests',
      icon: <MaterialIcons name="directions-car" size={52} color="#FFFFFF" />,
      route: 'settings/cart-requests',
      disabled: false
    },
    {
      title: 'Send Public Announcement',
      icon: <MaterialIcons name="campaign" size={52} color="#FFFFFF" />,
      route: 'settings/send-announcement',
      disabled: false
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='#fff' backgroundColor={'#333243'} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Ionicons name='menu' size={25} color='orange' />
        </TouchableOpacity>
        <Text maxFontSizeMultiplier={1.2} style={styles.headerTitle}>Admin Dashboard</Text>
      </View>
      <Text style={styles.subtitle}>What do you need?</Text>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {adminOptions.map((option, index) => (
          <AdminOption
            key={index}
            title={option.title}
            icon={option.icon}
            disabled={option.disabled}
            onPress={option.onPress || (() => router.push(option.route))}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333243',
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
    marginLeft: 10
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
    backgroundColor: '#EA1D25',
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