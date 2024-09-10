import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import Header from '../../components/Header';
import TabBar from '../../components/TabBar';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function TabLayout() {

  return (
    <SafeAreaView style={styles.safeArea}>
      <Tabs
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{
          header: () => <Header />
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
          }}
        />
        <Tabs.Screen
          name="schedule"
          options={{
            title: 'Schedule',
          }}
        />
        <Tabs.Screen
          name="standings"
          options={{
            title: 'Standings',
          }}
        />
        <Tabs.Screen
          name="teams"
          options={{
            title: 'Teams',
          }}
        />
        <Tabs.Screen
          name="info"
          options={{
            title: 'Info',
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabBar: {
    backgroundColor: '#fff',
    height: 56
  },
  tabBarLabel: {
    fontSize: 12,
    fontFamily: 'Outfit-Light',
    paddingBottom: 5
  }
});