import { Stack } from 'expo-router';

const InfoLayout = () => {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false, }} />
			<Stack.Screen name="tournament-info" options={{ headerShown: false }} />
			<Stack.Screen name="rules-sotg" options={{ headerShown: false }} />
			<Stack.Screen name="vendors" options={{ headerShown: false }} />
			<Stack.Screen name="emergency" options={{ headerShown: false }} />
			<Stack.Screen name="credits" options={{ headerShown: false }} />
			<Stack.Screen name="refund-policy" options={{ headerShown: false }} />
			<Stack.Screen name="feedback" options={{ headerShown: false }} />
		</Stack>
	);
};

export default InfoLayout;