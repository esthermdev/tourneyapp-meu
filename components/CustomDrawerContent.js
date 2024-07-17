import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { images } from '../constants';

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.logoContainer}>
        <Image source={images.logoW} style={styles.logo} />
        <Text style={styles.tournamentName}>Tournament Name</Text>
      </View>
      <View style={styles.divider}></View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 30,
  },
  divider: {
    borderWidth: 0.3,
    borderColor: 'lightgray',
    alignSelf: 'center',
    width: '80%'
  },    
  logo: {
    width: 80,
    height: 80,
  },
  tournamentName: {
    fontSize: 20,
    fontFamily: 'Outfit-Bold',
    marginTop: 30,
  },
});

export default CustomDrawerContent;
