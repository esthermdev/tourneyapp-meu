import { View, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import GameComponent from '../../../../components/GameComponent';
import CustomHeader from '../../../../components/CustomHeader';

const Tab = createMaterialTopTabNavigator();

const ChampionshipBracket = () => {
  return (
    <View style={styles.container}>
      <CustomHeader title='Championship Bracket' />
      <Tab.Navigator>
        <Tab.Screen
          name="Crossover"
          options={{ title: 'CP' }}
          children={() => <GameComponent roundId={2} datetimeId={4} division="X" title="Crossover" />}
        />
        <Tab.Screen
          name="Quarters"
          options={{ title: 'Q' }}
          children={() => (
            <View style={styles.container}>
              <GameComponent roundId={3} datetimeId={5} division="X" title="Quarter Finals" />
            </View>
          )}
        />
        <Tab.Screen
          name="Semis"
          options={{ title: 'SF' }}
          children={() => (
            <View style={styles.container}>
              <GameComponent roundId={4} datetimeId={6} division="X" title="Semi Finals" />
            </View>
          )}
        />
        <Tab.Screen
          name="Finals"
          options={{ title: 'F' }}
          children={() => (
            <View style={styles.container}>
              <GameComponent roundId={5} datetimeId={7} division="X" title="Finals" />
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