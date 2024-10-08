import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import ScheduleList from '../../../../components/ScheduleList';
import CustomHeader from '../../../../components/CustomHeader';
import { capitalizeWords } from '../../../../utils/capitalizeWords';

export default function DivisionScheduleIndex() {
	const { division } = useLocalSearchParams();

	return (
		<View style={styles.container}>
			<CustomHeader title={capitalizeWords(division.replace('_', ' - '))} route='schedule' />
			<ScheduleList division={division} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
}); 