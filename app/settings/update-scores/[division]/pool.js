import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomAdminHeader from '../../../../components/CustomAdminHeader';
import UpdateScoresComponent from '../../../../components/UpdateScoresComponent';
import { StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';

const Tab = createMaterialTopTabNavigator();

const PoolPlay = () => {
	const { title, pools, code, division } = useLocalSearchParams();
	const poolsArray = pools ? JSON.parse(pools) : [];


	return (
		<SafeAreaView style={styles.container}>
			<CustomAdminHeader title={title} route={`/settings/update-scores/${division}/`} />
			<Tab.Navigator
				screenOptions={{
					tabBarActiveTintColor: '#EA1D25',
					tabBarInactiveTintColor: '#8F8DAA',
					tabBarLabelStyle: {
						fontFamily: 'Outfit-Semibold',
						fontSize: ms(12),
					},
					tabBarStyle: {
						backgroundColor: '#262537',
						borderBottomWidth: 1,
						borderBottomColor: '#8F8DAA',
					},
					tabBarIndicatorStyle: {
						backgroundColor: '#EA1D25',
						height: 3,
					},
				}}
			>
				{poolsArray.map((pool, index) => (
					<Tab.Screen
						key={pool.id}
						name={pool.name}
						children={() => <UpdateScoresComponent poolId={pool.id} title={pool.name} division={code} />}
					/>
				))}
			</Tab.Navigator>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1E2A3A',
	},
});

export default PoolPlay;