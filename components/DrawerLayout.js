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
					drawerLabel: 'Welcome',
				}}
			/>
			<Drawer.Screen 
				name='(tabs)'
				options={{
					drawerLabel: 'Home',
					drawerIcon: () => <Ionicon name='home' size={25} color={'#333243'}/>
				}}
			/>
			<Drawer.Screen 
				name='auth'
				options={{
					drawerLabel: 'My Account',
					drawerIcon: () => <Ionicon name='person' size={25} color={'#333243'}/>
				}}
			/>
			<Drawer.Screen 
				name="admin"
				options={{
					drawerLabel: 'Admin',
					drawerIcon: () => <Ionicon name='settings' size={25} color={'#333243'}/>
				}}
			/>
		</Drawer>
	);
};

export default DrawerLayout;