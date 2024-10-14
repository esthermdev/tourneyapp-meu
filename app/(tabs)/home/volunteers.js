import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator } from 'react-native';
import { Avatar } from '@rneui/base';
import CustomHeader from '../../../components/CustomHeader';
import { supabase } from '../../../utils/supabase';
import { ms } from 'react-native-size-matters';

const Volunteers = () => {
	const [volunteers, setVolunteers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchVolunteers();
	}, []);

	const fetchVolunteers = async () => {
		setIsLoading(true);
		try {
			const { data, error } = await supabase
				.from('volunteers')
				.select(`
					id,
					badge,
					role,
					avatar_uri
				`)
				.order('badge');

			if (error) {
				console.error('Error fetching volunteers:', error);
			} else {
				setVolunteers(data);
			}
		} catch (error) {
			console.error('Error fetching volunteers:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const renderItem = ({ item }) => (
		<View style={styles.itemContainer}>
			<Avatar
				containerStyle={styles.avatar}
				size={ms(60)}
				rounded
				source={item.avatar_uri ? { uri: item.avatar_uri } : require('../../../assets/icons/placeholder_user.png')}
				placeholderStyle={{ backgroundColor: 'transparent' }}
				onError={() => console.log(`Failed to load image for ${item.badge}`)}
			/>
			<Text style={styles.badgeText}>{item.badge}</Text>
			<Text style={styles.roleText}>{item.role}</Text>
		</View>
	);

	return (
		<View style={styles.container}>
			<CustomHeader title='Volunteers' route='home' />
			{isLoading ? (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color="#EA1D25" />
					<Text style={styles.loadingText}>Loading volunteers...</Text>
				</View>
			) : (
				<FlatList
					data={volunteers}
					renderItem={renderItem}
					keyExtractor={(item) => item.id.toString()}
					numColumns={3}
				/>
			)}
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
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	loadingText: {
		fontFamily: 'Outfit-Regular',
		fontSize: ms(16),
		marginTop: ms(10),
		color: '#333',
	},
});

export default Volunteers;