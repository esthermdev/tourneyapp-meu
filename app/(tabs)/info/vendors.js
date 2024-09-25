import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { ListItem, Avatar } from '@rneui/base';
import CustomHeader from '../../../components/CustomHeader';
import { supabase } from '../../../utils/supabase';
import { ms } from 'react-native-size-matters';
import { Link } from 'expo-router';

const Vendors = () => {
	const [vendors, setVendors] = useState([]);

	useEffect(() => {
		fetchVendors();
	}, []);

	const fetchVendors = async () => {
		const { data, error } = await supabase
			.from('vendors')
			.select(`
				name,
        avatar_url,
				website
			`);

		if (error) {
			console.error('Error fetching vendors:', error);
		} else {
			setVendors(data);
		}
	};

	const renderItem = ({ item }) => (
		<ListItem key={item.id} bottomDivider>
			<Avatar containerStyle={{ backgroundColor: 'purple' }} size={50} rounded title={item.name[0]} source={{ uri: item?.avatar_url }} />
			<ListItem.Content>
				<ListItem.Title className='font-outfitmedium' style={{ fontSize: ms(16) }}>{item.name}</ListItem.Title>
				<ListItem.Subtitle>
					<Link href={`${item.website}`}>Link</Link>
				</ListItem.Subtitle>
			</ListItem.Content>
		</ListItem>
	)

	return (
		<View style={styles.container}>
			<CustomHeader title='Vendors' route='info' />
			<FlatList
				data={vendors}
				key={(item) => item.id}
				renderItem={renderItem}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	contentContainer: {
		padding: 15
	},
	content: {
		fontFamily: 'Outfit-Regular',
		fontSize: ms(18),
		color: '#333',
	},
	contentHeader: {
		fontFamily: 'Outfit-Bold',
		fontSize: ms(20),
		color: '#333',
	},
	contentSubHeader: {
		fontFamily: 'Outfit-SemiBold',
		fontSize: ms(18),
		color: '#333',
	}
});

export default Vendors;