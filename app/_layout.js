import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '../context/AuthProvider';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
		"Outfit-Black": require("../assets/fonts/Outfit-Black.ttf"),
		"Outfit-Bold": require("../assets/fonts/Outfit-Bold.ttf"),
		"Outfit-ExtraBold": require("../assets/fonts/Outfit-ExtraBold.ttf"),
		"Outfit-ExtraLight": require("../assets/fonts/Outfit-ExtraLight.ttf"),
		"Outfit-Light": require("../assets/fonts/Outfit-Light.ttf"),
		"Outfit-Medium": require("../assets/fonts/Outfit-Medium.ttf"),
		"Outfit-Regular": require ("../assets/fonts/Outfit-Regular.ttf"),
		"Outfit-SemiBold": require("../assets/fonts/Outfit-SemiBold.ttf"),
		"Outfit-Thin": require("../assets/fonts/Outfit-Thin.ttf"),
  })

  useEffect(() => {
		if (error) throw error;
	
		if (fontsLoaded) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded, error]);
  
	if (!fontsLoaded && !error) {
		return null;
	};

  const DrawerLayout = () => {
	return (
		<Drawer
			screenOptions={{
				headerShown: false
			}}
		>
			<Drawer.Screen 
				name='index'
				options={{
					drawerLabel: 'Welcome',
				}}
			/>
			<Drawer.Screen 
				name='(tabs)'
				options={{
					drawerLabel: 'Home',
				}}
			/>
			<Drawer.Screen 
				name='login'
				options={{
					drawerLabel: 'Login',
				}}
			/>
		</Drawer>
    )
  }

  return (
		<AuthProvider>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<StatusBar style='auto' />
				<DrawerLayout />
			</GestureHandlerRootView>
		</AuthProvider>
  )
};

export default RootLayout;