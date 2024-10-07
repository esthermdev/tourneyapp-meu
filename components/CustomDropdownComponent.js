import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { s, vs, ms } from 'react-native-size-matters';

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
			<Text style={styles.listItem} maxFontSizeMultiplier={1}>{item}</Text>
		</TouchableOpacity>
	);

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.button} onPress={toggleDropdown}>
				<Text style={styles.buttonText} maxFontSizeMultiplier={1.1}>
					{selectedValue || label}
				</Text>
				<Ionicons name={visible ? "caret-up" : "caret-down"} size={20} color="#333" />
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
		marginBottom: 8,
	},
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 15,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 8,
	},
	buttonText: {
		fontFamily: 'Outfit-Regular',
		fontSize: ms(16),
	},
	overlay: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	dropdown: {
		backgroundColor: 'white',
		width: '60%',
		maxHeight: '50%',
		borderRadius: 12,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	item: {
		paddingVertical: 15,
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
		marginHorizontal: 10,
		alignItems: 'center'
	},
	listItem: {
		fontFamily: 'Outfit-Regular',
		fontSize: ms(18),
	}
});

export default Dropdown;