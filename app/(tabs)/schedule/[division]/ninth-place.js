// app/schedule/[division]/ninth-place.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import GameComponent from '../../../../components/GameComponent';
import CustomHeader from '../../../../components/CustomHeader';
import { ms } from 'react-native-size-matters';

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
                    {() => <GameComponent roundId={10} datetimeId={1} division={code} title="9th Place Quarters" />}
                </Tab.Screen>
                <Tab.Screen name="NinthSemis" options={{ title: '9 SF' }}>
                    {() => <GameComponent roundId={11} datetimeId={1} division={code} title="9th Place Semis" />}
                </Tab.Screen>
                <Tab.Screen name="NinthFinal" options={{ title: '9th' }}>
                    {() => <GameComponent roundId={12} datetimeId={1} division={code} title="9th Place Final" />}
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