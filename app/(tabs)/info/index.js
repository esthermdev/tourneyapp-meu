import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ms } from 'react-native-size-matters';

const InfoScreen = () => {
	const router = useRouter();

	const infoItems = [
		{ title: 'Tournament Info', route: 'tournament-info' },
		{ title: 'Rules', route: 'rules-sotg' },
		{ title: 'Vendors', route: 'vendors' },
		{ title: 'Emergency', route: 'emergency' },
		{ title: 'Credits', route: 'credits' },
	];

	const renderInfoItem = (item, index) => (
		<TouchableOpacity
			key={index}
			style={styles.infoItem}
			onPress={() => router.push(`/info/${item.route}`)}
		>
			<Text style={styles.infoItemText} maxFontSizeMultiplier={1.2}>{item.title}</Text>
			<Ionicons name="chevron-forward" size={24} color="#333" />
		</TouchableOpacity>
	);

	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<Text style={styles.header} maxFontSizeMultiplier={1}>Information</Text>
			</View>
			<ScrollView style={styles.content}>
				{infoItems.map(renderInfoItem)}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	headerContainer: {
		borderBottomColor: '#D9D9D9',
		borderBottomWidth: 1,
		paddingHorizontal: 15,
		paddingVertical: 5,
	},
	header: {
		fontFamily: 'Outfit-Bold',
		fontSize: ms(35),
		color: '#EA1D25'
	},
	content: {
		flex: 1,
		paddingHorizontal: 25,
	},
	infoItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 25,
		borderBottomWidth: 1,
		borderBottomColor: '#D9D9D9',
	},
	infoItemText: {
		fontFamily: 'Outfit-Bold',
		fontSize: ms(18),
		color: '#333',
	},
});

export default InfoScreen;