import { Drawer } from 'expo-router/drawer';
import CustomDrawerContent from '../components/CustomDrawerContent';
import Ionicon from '@expo/vector-icons/Ionicons';

const DrawerLayout = () => {

	return (
		<Drawer
			screenOptions={{
				headerShown: false,
				drawerItemStyle: {marginHorizontal: 30},
				drawerLabelStyle: {fontFamily: 'Outfit-Regular', fontSize: 18, color: '#333243'},
				drawerActiveTintColor: '#EA1D25',
			}}
			drawerContent={(props) => <CustomDrawerContent {...props} />}
		>
			<Drawer.Screen 
				name='index'
				options={{
					headerShown: false,
					drawerLabel: 'Welcome',
				}}
			/>
			<Drawer.Screen 
				name='(tabs)'
				options={{
					headerShown: false,
					drawerLabel: 'Home',
					drawerIcon: () => <Ionicon name='home' />
				}}
			/>
			<Drawer.Screen 
				name='auth'
				options={{
					headerShown: false,
					drawerLabel: 'My Account',
					drawerIcon: () => <Ionicon name='person' />
				}}
			/>
			<Drawer.Screen 
				name="settings"
				options={{
					drawerLabel: () => null,
					drawerItemStyle: { display: 'none' }
				}}
			/>
		</Drawer>
	);
};

export default DrawerLayout;