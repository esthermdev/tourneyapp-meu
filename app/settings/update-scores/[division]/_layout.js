import { Stack } from 'expo-router';

export default function DivisionLayout() {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Screen name="pool" options={{ headerShown: false }} />
			<Stack.Screen name="bracket" options={{ headerShown: false }} />
			<Stack.Screen name="placement" options={{ headerShown: false }} />
			<Stack.Screen name="placement-notab" options={{ headerShown: false }} />
		</Stack>
	);
}