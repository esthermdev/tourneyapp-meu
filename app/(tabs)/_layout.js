import { Tabs } from 'expo-router';
import { Image, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import { icons } from '../../constants';

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={{ 
        header: () => (<Header />),
        tabBarActiveTintColor: '#EA1D25',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel 
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Image 
              source={icons.home}
              style={{ width: 25, height: 25, tintColor: color, marginTop: 15 }}
            />
          )
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: 'Schedule',
          tabBarIcon: ({ color }) => (
            <Image 
              source={icons.calender}
              style={{ width: 25, height: 25, tintColor: color, marginTop: 15 }}
            />
          )
        }}
      />
      <Tabs.Screen
        name="teams"
        options={{
          title: 'Teams',
          tabBarIcon: ({ color }) => (
            <Image 
              source={icons.team}
              style={{ width: 32, height: 32, tintColor: color, marginTop: 15 }}
              resizeMode='contain'
            />
          )
        }}
      />     
    </Tabs>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#333243',
    height: 100
  },
  tabBarLabel: {
    fontSize: 12,
    fontFamily: 'Outfit-Light',
  }
});