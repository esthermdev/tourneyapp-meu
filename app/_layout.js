import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DrawerLayout from '../components/DrawerLayout';
import { useFonts } from 'expo-font';
import { SplashScreen, useRouter } from 'expo-router';
import { AuthProvider } from '../context/AuthProvider';
import 'expo-dev-client';
import 'react-native-gesture-handler';
import { StatusBar, Linking } from 'react-native';

// Call this function when your app starts
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
	const router = useRouter();

	useEffect(() => {
		const handleDeepLink = ({ url }) => {
			console.log('Received deep link:', url);
			if (url.path === 'auth/reset-password') {
				router.push({
					pathname: '/auth/reset-password',
					params: url.queryParams
				});
			}
		};

		Linking.addEventListener('url', handleDeepLink);

		// Check for initial URL
		Linking.getInitialURL().then(url => {
			if (url) {
				console.log('Initial URL:', url);
				handleDeepLink({ url });
			}
		});

		return () => {
			Linking.removeEventListener('url', handleDeepLink);
		};
	}, [router]);

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
			<StatusBar barStyle='#fff' backgroundColor='#000' />
			<GestureHandlerRootView style={{ flex: 1 }}>
				<DrawerLayout />
			</GestureHandlerRootView>
		</AuthProvider>
	)
};

export default RootLayout;