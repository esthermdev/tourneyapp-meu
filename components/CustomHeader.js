// components/CustomHeader.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ms } from 'react-native-size-matters';

const CustomHeader = ({ title, route }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.navigate(`${route}`)}>
        <Ionicons name="arrow-back-outline" size={23} color="#EA1D25" />
      </TouchableOpacity>
      <Text style={styles.header} maxFontSizeMultiplier={1}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    justifyContent: 'space-between'
  },
  header: {
    fontFamily: 'Outfit-Bold',
    fontSize: ms(24),
    color: 'black',
  },
  backButton: {
    marginRight: 15,
  },
});

export default CustomHeader;