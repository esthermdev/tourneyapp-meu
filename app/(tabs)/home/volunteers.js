import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text, Dimensions } from 'react-native';
import { Avatar } from '@rneui/base';
import CustomHeader from '../../../components/CustomHeader';
import { supabase } from '../../../utils/supabase';
import { ms } from 'react-native-size-matters';

const Volunteers = () => {
	const [volunteers, setVolunteers] = useState([]);

	useEffect(() => {
		fetchVolunteers();
	}, []);

	const fetchVolunteers = async () => {
		const { data, error } = await supabase
			.from('volunteers')
			.select(`
				badge,
				role
			`)
			.order('badge');

		if (error) {
			console.error('Error fetching volunteers:', error);
		} else {
			setVolunteers(data);
		}
	};

	const renderItem = ({ item }) => (
		<View style={styles.itemContainer}>
			<Avatar
				containerStyle={styles.avatar}
				size={ms(50)}
				rounded
				title={item.badge[0]}
				source={{ uri: "data:image/png" }}
				placeholderStyle={{ backgroundColor: 'transparent' }}
			/>
			<Text style={styles.badgeText}>{item.badge}</Text>
			<Text style={styles.roleText}>{item.role}</Text>
		</View>
	);

	return (
		<View style={styles.container}>
			<CustomHeader title='Volunteers' route='home' />
			<FlatList
				data={volunteers}
				renderItem={renderItem}
				keyExtractor={(item, index) => index.toString()}
				numColumns={3}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	listContainer: {
		paddingTop: 10,
		paddingHorizontal: 10,
		flexDirection: 'row',
	},
	itemContainer: {
		flex: 1,
		width: 100,
		alignItems: 'center',
		margin: 10
	},
	avatar: {
		backgroundColor: 'orange',
		marginBottom: ms(5),
	},
	badgeText: {
		fontFamily: 'Outfit-Medium',
		fontSize: ms(16),
		textAlign: 'center',
		marginBottom: ms(2),
	},
	roleText: {
		fontFamily: 'Outfit-Regular',
		fontSize: ms(13),
		textAlign: 'center',
		color: '#666',
	},
});

export default Volunteers;