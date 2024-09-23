import { View, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import GameComponent from '../../../../components/GameComponent';
import CustomHeader from '../../../../components/CustomHeader';
import { ms } from 'react-native-size-matters';

const Tab = createMaterialTopTabNavigator();

const ChampionshipBracket = () => {
  return (
    <View style={styles.container}>
      <CustomHeader title='Championship Bracket' route='schedule/men_upper' />
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
          name="Crossover"
          options={{ title: 'CP' }}
          children={() => <GameComponent roundId={2} datetimeId={4} division="MU" title="Crossover" />}
        />
        <Tab.Screen
          name="Quarters"
          options={{ title: 'Q' }}
          children={() => <GameComponent roundId={3} datetimeId={5} division="MU" title="Quarter Finals" />}
        />
        <Tab.Screen
          name="Semis"
          options={{ title: 'SF' }}
          children={() => <GameComponent roundId={4} datetimeId={6} division="MU" title="Semi Finals" />}
        />
        <Tab.Screen
          name="Finals"
          options={{ title: 'F' }}
          children={() => (
            <View style={styles.container}>
              <GameComponent roundId={5} datetimeId={7} division="MU" title="Finals" />
            </View>
          )}
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

export default ChampionshipBracket;