import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

const CustomAdminHeader = ({ title, route }) => {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.navigate(route)}>
        <Ionicons name="arrow-back" size={30} color="#FF9821" />
      </TouchableOpacity>
      <Text maxFontSizeMultiplier={1} style={styles.headerTitle}>{title}</Text>
      <TouchableOpacity style={styles.backButton} onPress={() => router.navigate('settings')}>
        <Ionicons name="home" size={30} color="#FF9821" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#8F8DAA',
    backgroundColor: '#333243'
  },
  headerTitle: {
    flex: 1,
    fontFamily: 'Outfit-Bold',
    fontSize: 24,
    color: '#FF9821',
    textAlign: 'center',
  },
});

export default CustomAdminHeader;