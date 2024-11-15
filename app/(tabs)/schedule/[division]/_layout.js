import React from 'react';
import { Stack } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { divisionScheduleConfig } from '../../../../utils/divisionScheduleConfig';

export default function DivisionLayout() {
	const { division } = useLocalSearchParams();
	const config = divisionScheduleConfig[division];

	if (!config) {
		return null;
	}

	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					title: config.title,
					headerShown: false
				}}
			/>
			{config.scheduleOptions.map((option) => (
				<Stack.Screen
					key={option.route}
					name={option.route}
					options={{
						title: option.title,
						headerShown: false
					}}
				/>
			))}
		</Stack>
	);
}