import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { AuthProvider } from '../context/AuthProvider';
import CustomDrawerContent from '../components/CustomDrawerContent';
import Ionicon from '@expo/vector-icons/Ionicons';

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
				headerShown: false,
				drawerItemStyle: {marginHorizontal: 30},
				drawerLabelStyle: {fontFamily: 'Outfit-Regular', fontSize: 18, color: '#333243'},
				drawerActiveTintColor: '#EA1D25',
			}}
			drawerContent={(props) => <CustomDrawerContent {...props} />}
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
					drawerIcon: () => <Ionicon name='home' size={25} color={'#333243'}/>
				}}
			/>
			<Drawer.Screen 
				name='auth'
				options={{
					drawerLabel: 'My Account',
					drawerIcon: () => <Ionicon name='person' size={25} color={'#333243'}/>
				}}
			/>
		</Drawer>
    )
  }

  return (
		<AuthProvider>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<DrawerLayout />
			</GestureHandlerRootView>
		</AuthProvider>
  )
};

export default RootLayout;