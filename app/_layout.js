import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DrawerLayout from '../components/DrawerLayout';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { AuthProvider } from '../context/AuthProvider';
import 'expo-dev-client';
import 'react-native-gesture-handler';
import { ButtonStateProvider } from '../context/ButtonStateContext';

// Call this function when your app starts
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {

	const [loaded, error] = useFonts({
		"Outfit-Black": require("../assets/fonts/Outfit-Black.ttf"),
		"Outfit-Bold": require("../assets/fonts/Outfit-Bold.ttf"),
		"Outfit-ExtraBold": require("../assets/fonts/Outfit-ExtraBold.ttf"),
		"Outfit-ExtraLight": require("../assets/fonts/Outfit-ExtraLight.ttf"),
		"Outfit-Light": require("../assets/fonts/Outfit-Light.ttf"),
		"Outfit-Medium": require("../assets/fonts/Outfit-Medium.ttf"),
		"Outfit-Regular": require("../assets/fonts/Outfit-Regular.ttf"),
		"Outfit-SemiBold": require("../assets/fonts/Outfit-SemiBold.ttf"),
		"Outfit-Thin": require("../assets/fonts/Outfit-Thin.ttf"),
	})

	useEffect(() => {
		if (loaded || error) {
			SplashScreen.hideAsync();
		}
	}, [loaded, error]);

	if (!loaded && !error) {
		return null;
	}

	return (
		<AuthProvider>
			<ButtonStateProvider>
				<GestureHandlerRootView style={{ flex: 1 }}>
					<DrawerLayout />
				</GestureHandlerRootView>
			</ButtonStateProvider>
		</AuthProvider>
	)
};

export default RootLayout;