// app/schedule/[division]/pool-play.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import GameComponent from '../../../../components/GameComponent';
import CustomHeader from '../../../../components/CustomHeader';
import { ms } from 'react-native-size-matters';

const Tab = createMaterialTopTabNavigator();

export default function PoolPlay() {
    const { division, code } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <CustomHeader title="Pool Play" route={`/schedule/${division}`} />
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: '#EA1D25',
                    tabBarInactiveTintColor: '#8F8DAA',
                    tabBarLabelStyle: { fontFamily: 'Outfit-Semibold', fontSize: ms(12) },
                    tabBarIndicatorStyle: { backgroundColor: '#EA1D25' },
                }}
            >
                <Tab.Screen name="Round1" options={{ title: 'R1' }}>
                    {() => <GameComponent roundId={1} datetimeId={1} division={code} title="Round 1" />}
                </Tab.Screen>
                <Tab.Screen name="Round2" options={{ title: 'R2' }}>
                    {() => <GameComponent roundId={1} datetimeId={2} division={code} title="Round 2" />}
                </Tab.Screen>
                <Tab.Screen name="Round3" options={{ title: 'R3' }}>
                    {() => <GameComponent roundId={1} datetimeId={3} division={code} title="Round 3" />}
                </Tab.Screen>
                <Tab.Screen name="Round4" options={{ title: 'R4' }}>
                    {() => <GameComponent roundId={1} datetimeId={4} division={code} title="Round 4" />}
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