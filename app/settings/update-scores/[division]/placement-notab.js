import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomAdminHeader from '../../../../components/CustomAdminHeader';
import UpdateScoresComponent from '../../../../components/UpdateScoresComponent';
import { StyleSheet } from 'react-native';

const Tab = createMaterialTopTabNavigator();

const PlacementGames = () => {
	const { title, rounds, code, division } = useLocalSearchParams();
	const roundsArray = rounds ? JSON.parse(rounds) : [];

	return (
		<SafeAreaView style={styles.container}>
			<CustomAdminHeader title={title} route={`/settings/update-scores/${division}/`} />
			{roundsArray.map((round) => (
				<UpdateScoresComponent key={round.id} roundId={round.id} title={round.title} division={code} />
			))}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#333243',
	},
});

export default PlacementGames;