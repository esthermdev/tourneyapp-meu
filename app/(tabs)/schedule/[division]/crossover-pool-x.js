// app/schedule/[division]/ninth-place.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CustomHeader from '../../../../components/CustomHeader';
import { ms } from 'react-native-size-matters';
import GameComponentByRound from '../../../../components/GameComponentByRound';

const Tab = createMaterialTopTabNavigator();

export default function MixedCrossovers() {
    const { division, code } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <CustomHeader title="Crossovers" route={`/schedule/${division}`} />
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: '#EA1D25',
                    tabBarInactiveTintColor: '#8F8DAA',
                    tabBarLabelStyle: { fontFamily: 'Outfit-Semibold', fontSize: ms(12) },
                    tabBarIndicatorStyle: { backgroundColor: '#EA1D25' },
                }}
            >
                <Tab.Screen name="Crossover" options={{ title: 'CP' }}>
                    {() => <GameComponentByRound roundId={2} division={code} title="Crossovers" />}
                </Tab.Screen>
                <Tab.Screen name="Crossover Pool BC" options={{ title: 'CP Pools B&C' }}>
                    {() => <GameComponentByRound roundId={26} division={code} title="Crossover Pool B&C" />}
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