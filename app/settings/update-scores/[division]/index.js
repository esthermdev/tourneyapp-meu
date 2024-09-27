import React from 'react';
import { Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { divisionUpdateScoreConfig } from '../../../../utils/divisionUpdateScoreConfig';
import CustomAdminHeader from '../../../../components/CustomAdminHeader';
import { capitalizeWords } from '../../../../utils/capitalizeWords';

const DivisionScreen = () => {
	const { division } = useLocalSearchParams();
	const gameTypes = divisionUpdateScoreConfig[division] || [];

	const renderItem = ({ item }) => (
		<TouchableOpacity
			style={[styles.gameTypeButton, { backgroundColor: item.bgColor }]}
			onPress={() => router.push({
				pathname: `/settings/update-scores/${division}/${item.type}`,
				params: {
					code: item.code,
					title: item.title,
					pools: item.pools,
					rounds: JSON.stringify(item.rounds),
				}
			})}
		>
			<FontAwesome6 name={item.icon} size={22} color='#fff' style={styles.icon} />
			<Text style={styles.gameTypeText}>{item.title}</Text>
			<FontAwesome6 name="chevron-right" size={20} color='#fff' />
		</TouchableOpacity>
	);

	return (
		<SafeAreaView style={styles.container}>
			<CustomAdminHeader title={`${capitalizeWords(division.replace('_', ' '))}`} route={'settings/update-scores'} />
			<FlatList
				data={gameTypes}
				renderItem={renderItem}
				keyExtractor={(item) => item.title}
				contentContainerStyle={styles.content}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1E2A3A',
	},
	content: {
		padding: 20,
	},
	gameTypeButton: {
		padding: 20,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		borderRadius: 10,
		marginBottom: 15,
	},
	gameTypeText: {
		flex: 1,
		color: '#fff',
		fontFamily: 'Outfit-SemiBold',
		fontSize: 18,
		textAlign: 'left',
	},
});

export default DivisionScreen;