// app/schedule/[division]/championship-bracket.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import GameComponent from '../../../../components/GameComponent';
import CustomHeader from '../../../../components/CustomHeader';
import { ms } from 'react-native-size-matters';

const Tab = createMaterialTopTabNavigator();

export default function ChampionshipBracket() {
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
                <Tab.Screen name="Crossover" options={{ title: 'CP' }}>
                    {() => <GameComponent roundId={2} division={code} datetimeId={1} title="Crossover" />}
                </Tab.Screen>
                <Tab.Screen name="Quarters" options={{ title: 'Q' }}>
                    {() => <GameComponent roundId={3} division={code} datetimeId={1} title="Quarter Finals" />}
                </Tab.Screen>
                <Tab.Screen name="Semis" options={{ title: 'SF' }}>
                    {() => <GameComponent roundId={4} division={code} datetimeId={1} title="Semi Finals" />}
                </Tab.Screen>
                <Tab.Screen name="Finals" options={{ title: 'F' }}>
                    {() => <GameComponent roundId={5} division={code} datetimeId={1} title="Finals" />}
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