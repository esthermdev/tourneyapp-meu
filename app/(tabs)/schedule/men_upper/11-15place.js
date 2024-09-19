import { View, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import GameComponent from '../../../../components/GameComponent';
import CustomHeader from '../../../../components/CustomHeader';

const Tab = createMaterialTopTabNavigator();

const EleventhToFifteenthPlace = () => {
  return (
    <View style={styles.container}>
      <CustomHeader title='Placement Games' route='schedule/men_upper' />
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
          name="11th Place"
          options={{ title: '11th' }}
          children={() => (
            <View style={styles.container}>
              <GameComponent roundId={13} datetimeId={7} division="MU" title="11th Place" />
            </View>
          )}
        />
        <Tab.Screen
          name="13th Place Semi"
          options={{ title: '13 SF' }}
          children={() => (
            <View style={styles.container}>
              <GameComponent roundId={14} datetimeId={7} division="MU" title="13th Place Semis" />
            </View>
          )}
        />
        <Tab.Screen
          name="13th Place"
          options={{ title: '13th' }}
          children={() => (
            <View style={styles.container}>
              <GameComponent roundId={15} datetimeId={7} division="MU" title="13th Place" />
            </View>
          )}
        />
        <Tab.Screen
          name="15th Place"
          options={{ title: '15th' }}
          children={() => (
            <View style={styles.container}>
              <GameComponent roundId={16} datetimeId={7} division="MU" title="15th Place" />
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

export default EleventhToFifteenthPlace;