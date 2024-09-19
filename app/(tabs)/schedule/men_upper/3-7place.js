import { View, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import GameComponent from '../../../../components/GameComponent';
import CustomHeader from '../../../../components/CustomHeader';

const Tab = createMaterialTopTabNavigator();

const ThirdToSeventhPlace = () => {
  return (
    <View style={styles.container}>
      <CustomHeader title='Placement Games' />
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#EA1D25',
          tabBarInactiveTintColor: '#8F8DAA',
          tabBarItemStyle: { borderBottomColor: '#8F8DAA' },
          tabBarLabelStyle: { fontFamily: 'Outfit-Semibold' },
          tabBarIndicatorStyle: { backgroundColor: '#EA1D25', }
        }}
      >
        <Tab.Screen
          name="3rd Place"
          options={{ title: '3rd' }}
          children={() => <GameComponent roundId={6} datetimeId={4} division="MU" title="3rd Place" />}
        />
        <Tab.Screen
          name="5th Place Semi"
          options={{ title: '5 SF' }}
          children={() => <GameComponent roundId={7} datetimeId={5} division="MU" title="5th Place Semis" />}
        />
        <Tab.Screen
          name="5th Place"
          options={{ title: '5th' }}
          children={() => <GameComponent roundId={8} datetimeId={6} division="MU" title="5th Place" />}
        />
        <Tab.Screen
          name="7th Place"
          options={{ title: '7th' }}
          children={() => <GameComponent roundId={9} datetimeId={7} division="MU" title="7th Place" />}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default ThirdToSeventhPlace;