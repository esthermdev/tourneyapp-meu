import { View, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import GameComponent from '../../../../components/GameComponent';
import CustomHeader from '../../../../components/CustomHeader';
import { ms } from 'react-native-size-matters';

const Tab = createMaterialTopTabNavigator();

const NinthPlace = () => {
  return (
    <View style={styles.container}>
      <CustomHeader title='Placement Games' route='schedule/men_upper' />
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#EA1D25',
          tabBarInactiveTintColor: '#8F8DAA',
          tabBarItemStyle: { borderBottomColor: '#8F8DAA' },
          tabBarLabelStyle: { fontFamily: 'Outfit-Semibold', fontSize: ms(12) },
          tabBarIndicatorStyle: { backgroundColor: '#EA1D25', }
        }}
      >
        <Tab.Screen
          name="9th Place Quarter"
          options={{ title: '9 Q' }}
          children={() => <GameComponent roundId={10} datetimeId={4} division="MU" title="9th Place Quarters" />}
        />
        <Tab.Screen
          name="9th Place Semi"
          options={{ title: '9 SF' }}
          children={() => <GameComponent roundId={11} datetimeId={5} division="MU" title="9th Place Semis" />}
        />
        <Tab.Screen
          name="9th Place"
          options={{ title: '9th' }}
          children={() => <GameComponent roundId={12} datetimeId={6} division="MU" title="9th Place" />}
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

export default NinthPlace;