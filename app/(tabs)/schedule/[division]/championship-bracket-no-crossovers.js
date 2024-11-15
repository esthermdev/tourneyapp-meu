import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CustomHeader from '../../../../components/CustomHeader';
import { ms } from 'react-native-size-matters';
import GameComponentByRound from '../../../../components/GameComponentByRound';

const Tab = createMaterialTopTabNavigator();

export default function ChampionshipBracketWithoutCrossover() {
    const { division, code } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <CustomHeader title="Championship Bracket" route={`/schedule/${division}`} />
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: '#EA1D25',
                    tabBarInactiveTintColor: '#8F8DAA',
                    tabBarLabelStyle: { fontFamily: 'Outfit-Semibold', fontSize: ms(12) },
                    tabBarIndicatorStyle: { backgroundColor: '#EA1D25' },
                }}
            >
                <Tab.Screen name="Quarters" options={{ title: 'Q' }}>
                    {() => <GameComponentByRound roundId={3} division={code} title="Quarter Finals" />}
                </Tab.Screen>
                <Tab.Screen name="Semis" options={{ title: 'SF' }}>
                    {() => <GameComponentByRound roundId={4} division={code} title="Semi Finals" />}
                </Tab.Screen>
                <Tab.Screen name="Finals" options={{ title: 'F' }}>
                    {() => <GameComponentByRound roundId={5} division={code} title="Finals" />}
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