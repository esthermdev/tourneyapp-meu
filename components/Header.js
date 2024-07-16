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
					<FontAwesome name='bars' size={20}/>
				</TouchableOpacity>		
				<Image 
					source={images.logoW}
					style={{width: 40, height: 40}}
				/>
				<TouchableOpacity style={styles.button} onPress={() => router.push('auth/account')}>
					<Ionicons name='person' 
						size={30}
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
		flexDirection: 'column',
		paddingTop: Constants.statusBarHeight,
		height: 107
	},
	content: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	button: {
		marginHorizontal: 31,
	},
});

export default Header;
