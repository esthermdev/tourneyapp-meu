// app/schedule/[division]/ninth-place.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CustomHeader from '../../../../components/CustomHeader';
import { ms } from 'react-native-size-matters';
import GameComponentByRound from '../../../../components/GameComponentByRound';

const Tab = createMaterialTopTabNavigator();

export default function NinthPlace() {
    const { division, code } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <CustomHeader title="9th Place" route={`/schedule/${division}`} />
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: '#EA1D25',
                    tabBarInactiveTintColor: '#8F8DAA',
                    tabBarLabelStyle: { fontFamily: 'Outfit-Semibold', fontSize: ms(12) },
                    tabBarIndicatorStyle: { backgroundColor: '#EA1D25' },
                }}
            >
                <Tab.Screen name="NinthQuarters" options={{ title: '9 Q' }}>
                    {() => <GameComponentByRound roundId={10} division={code} title="9th Place Quarters" />}
                </Tab.Screen>
                <Tab.Screen name="NinthSemis" options={{ title: '9 SF' }}>
                    {() => <GameComponentByRound roundId={11} division={code} title="9th Place Semis" />}
                </Tab.Screen>
                <Tab.Screen name="NinthFinal" options={{ title: '9th' }}>
                    {() => <GameComponentByRound roundId={12} division={code} title="9th Place Final" />}
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