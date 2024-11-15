import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Image } from '@rneui/base';
import { images } from '../constants';
import { router } from 'expo-router';
import Ionicon from '@expo/vector-icons/Ionicons';
import { useAuth } from '../context/AuthProvider';
import { ms } from 'react-native-size-matters'

const CustomDrawerContent = (props) => {
  const { profile } = useAuth();

  const drawerItems = useMemo(() => [
    { name: 'index', label: 'Welcome' },
    { name: 'home', label: 'Home', icon: 'home' },
    { name: 'auth', label: 'My Account', icon: 'person' },
  ], []);

  const renderDrawerItem = (item) => (
    <DrawerItem
      key={item.name}
      style={styles.drawerItemStyle}
      labelStyle={styles.drawerItemLabelStyle}
      label={item.label}
      onPress={() => props.navigation.navigate(item.name)}
      icon={item.icon ? () => <Ionicon name={item.icon} size={ms(25)} color={'#EA1D25'} /> : undefined}
    />
  );

  const renderAdminSection = () => {
    if (!profile?.is_admin) return null;

    return (
      <View style={styles.bottomDrawerSection}>
        <DrawerItem
          label="Admin"
          labelStyle={styles.settingsLabelStyle}
          onPress={() => router.push('/settings')}
          icon={({ color, size }) => <Ionicon name='settings' size={size} color={color} />}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.logoContainer}>
          <Image source={images.lpTitleLogo} style={{ width: 200, height: 200 }} />
        </View>
        <View style={styles.divider} />
        {drawerItems.map(renderDrawerItem)}
      </DrawerContentScrollView>
      {renderAdminSection()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
  },
  divider: {
    borderWidth: ms(0.3),
    borderColor: 'lightgray',
    alignSelf: 'center',
    width: '80%',
    marginBottom: 10,
  },
  tournamentName: {
    fontSize: 20,
    fontFamily: 'Outfit-Bold',
  },
  drawerItemStyle: {
    marginHorizontal: 24
  },
  drawerItemLabelStyle: {
    fontFamily: 'Outfit-Medium',
    fontSize: ms(16, 0.3),
    color: '#000'
  },
  settingsLabelStyle: {
    fontFamily: 'Outfit-Regular',
    fontSize: ms(18, 0.3)
  },
  bottomDrawerSection: {
    marginBottom: 15,
    marginHorizontal: 24,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
});

export default CustomDrawerContent;