// app/schedule/[division]/championship-bracket.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CustomHeader from '../../../../components/CustomHeader';
import { ms } from 'react-native-size-matters';
import GameComponentByRound from '../../../../components/GameComponentByRound';

const Tab = createMaterialTopTabNavigator();

export default function PlacementGames() {
    const { division, code } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <CustomHeader title="3rd to 7th Place" route={`/schedule/${division}`} />
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: '#EA1D25',
                    tabBarInactiveTintColor: '#8F8DAA',
                    tabBarLabelStyle: { fontFamily: 'Outfit-Semibold', fontSize: ms(12) },
                    tabBarIndicatorStyle: { backgroundColor: '#EA1D25' },
                }}
            >
                <Tab.Screen name="3rd Place" options={{ title: '3rd' }}>
                    {() => <GameComponentByRound roundId={6} division={code} title="3rd Place" />}
                </Tab.Screen>
                <Tab.Screen name="5th Place Semi" options={{ title: '5 SF' }}>
                    {() => <GameComponentByRound roundId={7} division={code} title="5th Semi Finals" />}
                </Tab.Screen>
                <Tab.Screen name="5th Place" options={{ title: '5th' }}>
                    {() => <GameComponentByRound roundId={8} division={code} title="5th Place" />}
                </Tab.Screen>
                <Tab.Screen name="7th Place" options={{ title: '7th' }}>
                    {() => <GameComponentByRound roundId={9} division={code} title="7th Place" />}
                </Tab.Screen>
            </Tab.Navigator>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});