import { Drawer } from 'expo-router/drawer';
import CustomDrawerContent from '../components/CustomDrawerContent';

const DrawerLayout = () => {

	return (
		<Drawer
			screenOptions={{
				headerShown: false,
				drawerItemStyle: { marginHorizontal: 30 },
				drawerLabelStyle: { fontFamily: 'Outfit-Regular', fontSize: 18, color: '#333243' },
				drawerActiveTintColor: '#EA1D25',
			}}
			drawerContent={(props) => <CustomDrawerContent {...props} />}
		>
		</Drawer>
	);
};

export default DrawerLayout;