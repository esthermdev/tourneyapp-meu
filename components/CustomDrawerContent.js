import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Image } from '@rneui/base';
import { images } from '../constants';
import { useRouter } from 'expo-router';
import Ionicon from '@expo/vector-icons/Ionicons';

const CustomDrawerContent = (props) => {
  const router = useRouter();

  const drawerItems = [
    { name: 'index', label: 'Welcome' },
    { name: '(tabs)', label: 'Home', icon: 'home' },
    { name: 'auth', label: 'My Account', icon: 'person' },
  ];

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.logoContainer}>
          <Image source={images.logoW} style={styles.logo} />
          <Text style={styles.tournamentName}>Vacationland 2024</Text>
        </View>
        <View style={styles.divider}></View>
        {drawerItems.map((item) => (
          <DrawerItem
            style={styles.drawerItemStyle}
            labelStyle={styles.drawerItemLabelStyle}
            key={item.name}
            label={item.label}
            onPress={() => props.navigation.navigate(item.name)}
            icon={item.icon ? () => <Ionicon name={item.icon} size={25} color={'#EA1D25'} /> : undefined}
          />
        ))}
      </DrawerContentScrollView>
      <View style={styles.bottomDrawerSection}>
        <DrawerItem
          label="Settings"
          labelStyle={styles.settingsLabelStyle}
          onPress={() => router.push('/settings')}
          icon={({ color, size }) => <Ionicon name='settings' size={size} color={color} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 30,
  },
  divider: {
    borderWidth: 0.3,
    borderColor: 'lightgray',
    alignSelf: 'center',
    width: '80%',
    marginBottom: 10,
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
  drawerItemStyle: {
    marginHorizontal: 24
  },
  drawerItemLabelStyle: {
    fontFamily: 'Outfit-Regular', 
    fontSize: 18, 
    color: '#EA1D25'
  },
  settingsLabelStyle: { 
    fontFamily: 'Outfit-Regular', 
    fontSize: 18 
  },
  bottomDrawerSection: {
    marginBottom: 15,
    marginHorizontal: 24,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
});

export default CustomDrawerContent;