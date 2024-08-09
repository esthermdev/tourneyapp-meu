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
          children={() => <GameComponent roundId={4} title="Crossover" />}
        />
        <Tab.Screen 
          name="Quarters" 
          options={{ title: 'Q' }}
          children={() => <GameComponent roundId={5} title="Quarter Finals" />}
        />
        <Tab.Screen 
          name="Semis" 
          options={{ title: 'SF' }}
          children={() => <GameComponent roundId={6} title="Semi Finals" />}
        />
        <Tab.Screen 
          name="Finals" 
          options={{ title: 'F' }}
          children={() => <GameComponent roundId={7} title="Finals" />}
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