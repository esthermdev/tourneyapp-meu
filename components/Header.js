import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { images } from '../constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

const Header = () => {
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<View style={styles.spacer}></View>
			<View style={styles.content}>
				<TouchableOpacity style={styles.button} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
					<FontAwesome name='bars' size={20}/>
				</TouchableOpacity>		
				<Image 
					source={images.logoW}
					style={{width: 40, height: 40}}
				/>
				<TouchableOpacity style={styles.button} onPress={() => router.push('login')}>
					<Ionicons name='person' 
						size={30}
						color='#EA1D25'
					/>
				</TouchableOpacity>	
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flexDirection: 'column',
		height: 100,
		borderBottomWidth: 0.2
	},
	spacer: {
		flex: 1,
	},
	content: {
		flex: 2,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	button: {
		marginHorizontal: 20,
	},
});

export default Header;
