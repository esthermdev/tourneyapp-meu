// app/schedule/[division]/11-15-place.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import GameComponent from '../../../../components/GameComponent';
import CustomHeader from '../../../../components/CustomHeader';
import { ms } from 'react-native-size-matters';

const Tab = createMaterialTopTabNavigator();

export default function EleventhToFifteenthPlace() {
    const { division, code } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <CustomHeader title="11th to 15th Place" route={`/schedule/${division}`} />
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: '#EA1D25',
                    tabBarInactiveTintColor: '#8F8DAA',
                    tabBarLabelStyle: { fontFamily: 'Outfit-Semibold', fontSize: ms(12) },
                    tabBarIndicatorStyle: { backgroundColor: '#EA1D25' },
                }}
            >
                <Tab.Screen name="EleventhPlace" options={{ title: '11th' }}>
                    {() => <GameComponent roundId={13} datetimeId={1} division={code} title="11th Place" />}
                </Tab.Screen>
                <Tab.Screen name="ThirteenthSemis" options={{ title: '13 SF' }}>
                    {() => <GameComponent roundId={14} datetimeId={1} division={code} title="13th Place Semis" />}
                </Tab.Screen>
                <Tab.Screen name="ThirteenthFinal" options={{ title: '13th' }}>
                    {() => <GameComponent roundId={15} datetimeId={1} division={code} title="13th Place Final" />}
                </Tab.Screen>
                <Tab.Screen name="FifteenthPlace" options={{ title: '15th' }}>
                    {() => <GameComponent roundId={16} datetimeId={1} division={code} title="15th Place" />}
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