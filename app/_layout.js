import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DrawerLayout from '../components/DrawerLayout';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { AuthProvider } from '../context/AuthProvider';
import * as Updates from 'expo-updates';

// Call this function when your app starts
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
	const [fontsLoaded, error] = useFonts({
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
		async function prepareApp() {
			try {
				if (error) throw error;

				await checkForUpdates();

				if (fontsLoaded) {
					await SplashScreen.hideAsync();
				}
			} catch (e) {
				console.warn(e);
			}
		}
		prepareApp();
	}, [fontsLoaded, error]);

	async function checkForUpdates() {
		try {
			const update = await Updates.checkForUpdateAsync();
			if (update.isAvailable) {
				await Updates.fetchUpdateAsync();
				await Updates.reloadAsync();
			}
		} catch (error) {
			// Handle or log error
			console.error('Error checking for updates:', error);
		}
	}


	if (!fontsLoaded && !error) {
		return null;
	};

	return (
		<AuthProvider>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<DrawerLayout />
			</GestureHandlerRootView>
		</AuthProvider>
	)
};

export default RootLayout;