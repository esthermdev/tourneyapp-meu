// app/schedule/[division]/pool-play.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CustomHeader from '../../../../components/CustomHeader';
import { ms } from 'react-native-size-matters';
import GameComponentByRound from '../../../../components/GameComponentByRound';

const Tab = createMaterialTopTabNavigator();

export default function RoundRobin() {
    const { division, code } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <CustomHeader title="Consolation Round Robin" route={`/schedule/${division}`} />
            <GameComponentByRound roundId={21} division={code} title="Round Robin" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});