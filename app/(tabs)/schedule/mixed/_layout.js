import { View, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Round1 from './Round1';
import Round2 from './Round2';
import Round3 from './Round3';
import Crossovers from './Crossovers';
import Quarters from './Quarters';
import SemiFinals from './SemiFinals';
import Finals from './Finals';


const MixedSchedule = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <View style={styles.container}>
      <Tab.Navigator 
        screenOptions={{ 
          tabBarActiveTintColor: '#EA1D25', 
          tabBarInactiveTintColor: '#8F8DAA',
          tabBarIndicatorStyle: {
            borderBottomColor: '#EA1D25', // Customize your border color
            borderBottomWidth: 2,         // Customize your border width
          },
          tabBarLabelStyle: { fontFamily: 'Outfit-SemiBold' }
        }}
      >
        <Tab.Screen name="R1" component={Round1} />
        <Tab.Screen name="R2" component={Round2} />
        <Tab.Screen name="R3" component={Round3} />
        <Tab.Screen name="CP" component={Crossovers} />
        <Tab.Screen name="Q" component={Quarters} />
        <Tab.Screen name="SF" component={SemiFinals} />
        <Tab.Screen name="F" component={Finals} />
        {/* Add more screens for additional rounds */}
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  headerContainer: {
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  }, 
  header: {
    fontFamily: 'Outfit-Bold',
    fontSize: 35,
    color: '#EA1D25'
  },
});

export default MixedSchedule;
