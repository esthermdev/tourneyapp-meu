// app/schedule/[division]/pool-play.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CustomHeader from '../../../../components/CustomHeader';
import { ms } from 'react-native-size-matters';
import GameComponentByRound from '../../../../components/GameComponentByRound';

const Tab = createMaterialTopTabNavigator();

export default function NinthPlacePool() {
  const { division, code } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <CustomHeader title="9th Place Pool" route={`/schedule/${division}`} />
      <GameComponentByRound roundId={20} division={code} title="9th Place Pool" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});