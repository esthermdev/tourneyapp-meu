import { View, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import GameComponent from '../../../../components/GameComponent';
import CustomHeader from '../../../../components/CustomHeader';

const Tab = createMaterialTopTabNavigator();

const PoolPlay = () => {
  return (
    <View style={styles.container}>
      <CustomHeader title="Pool Play" />
      <Tab.Navigator>
        <Tab.Screen 
          name="Round1" 
          options={{ title: 'R1' }}
          children={() => <GameComponent roundId={1} poolIds={[7, 8, 9, 10]} title="Round 1" />}
        />
        <Tab.Screen 
          name="Round2" 
          options={{ title: 'R2' }}
          children={() => <GameComponent roundId={2} poolIds={[7, 8, 9, 10]} title="Round 2" />}
        />
        <Tab.Screen 
          name="Round3" 
          options={{ title: 'R3' }}
          children={() => <GameComponent roundId={3} poolIds={[7, 8, 9, 10]} title="Round 3" />}
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

export default PoolPlay;