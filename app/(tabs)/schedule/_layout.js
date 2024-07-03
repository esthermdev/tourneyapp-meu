import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Round1 from './games/Round1';
import Round2 from './games/Round2';
import Round3 from './games/Round3';

const ScheduleScreen = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="1" component={Round1} />
      <Tab.Screen name="2" component={Round2} />
      <Tab.Screen name="3" component={Round3} />
      {/* Add more screens for additional rounds */}
    </Tab.Navigator>
  );
};

export default ScheduleScreen;
