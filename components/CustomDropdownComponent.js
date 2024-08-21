import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export const Dropdown = ({ label, data, onSelect, selectedValue }) => {
	const [visible, setVisible] = useState(false);

	const toggleDropdown = () => {
		setVisible(!visible);
	};

	const renderItem = ({ item }) => (
		<TouchableOpacity style={styles.item} onPress={() => {
			onSelect(item);
			setVisible(false);
		}}>
			<Text style={styles.listItem}>{item}</Text>
		</TouchableOpacity>
	);

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.button} onPress={toggleDropdown}>
				<Text style={styles.buttonText}>
					{selectedValue || label}
				</Text>
				<Ionicons name={visible ? "chevron-up" : "chevron-down"} size={24} color="#333" />
			</TouchableOpacity>
			<Modal visible={visible} transparent animationType="none">
				<TouchableOpacity
					style={styles.overlay}
					onPress={() => setVisible(false)}
				>
					<View style={styles.dropdown}>
						<FlatList
							data={data}
							renderItem={renderItem}
							keyExtractor={(item) => item.toString()}
						/>
					</View>
				</TouchableOpacity>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginBottom: 20,
	},
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: 50,
		paddingHorizontal: 10,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 5,
		marginTop: 8
	},
	buttonText: {
		fontFamily: 'Outfit-Regular',
		fontSize: 18,
	},
	overlay: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	dropdown: {
		backgroundColor: 'white',
		width: '50%',
		maxHeight: 300,
		borderRadius: 5,
		padding: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	item: {
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
		alignItems: 'center'
	},
	listItem: {
		fontFamily: 'Outfit-Regular',
		fontSize: 16,
	}
});

export default Dropdown;