import { Tabs } from 'expo-router';
import { Image, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import { icons } from '../../constants';

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={{ 
        header: () => (<Header />),
        headerShown: true,
        tabBarInactiveTintColor: '#8F8DAA',
        tabBarActiveTintColor: '#EA1D25',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Image 
              source={icons.home}
              style={{ width: 25, height: 25, marginVertical: 10, tintColor: color }}
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
              style={{ width: 25, height: 25, tintColor: color }}
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
              style={{ width: 32, height: 32, tintColor: color }}
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
    flex: 0.08
  },
  tabBarLabel: {
    fontSize: 12,
    fontFamily: 'Outfit-Light',
  }
});