import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { images } from '../constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Constants from 'expo-constants';

const Header = () => {
	const navigation = useNavigation();

	return (
		<>
		<View style={styles.container}>
			<View style={styles.content}>
				<TouchableOpacity style={styles.button} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
					<Ionicons name='menu' size={25}/>
				</TouchableOpacity>		
				<Image 
					source={images.logoW}
					style={styles.logo}
				/>
				<TouchableOpacity style={styles.button} onPress={() => router.push('auth/account')}>
					<Ionicons name='person' 
						size={25}
						color='#EA1D25'
					/>
				</TouchableOpacity>	
			</View>
		</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		height: 56,
		width: '100%'
	},
	content: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	button: {
		paddingHorizontal: 20
	},
	logo: {
		width: 40,
		height: 40
	}
});

export default Header;
