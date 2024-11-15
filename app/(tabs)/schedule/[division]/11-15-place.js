import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CustomHeader from '../../../../components/CustomHeader';
import { ms } from 'react-native-size-matters';
import GameComponentByRound from '../../../../components/GameComponentByRound';

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
                    {() => <GameComponentByRound roundId={13} division={code} title="11th Place" />}
                </Tab.Screen>
                <Tab.Screen name="ThirteenthSemis" options={{ title: '13 SF' }}>
                    {() => <GameComponentByRound roundId={14} division={code} title="13th Place Semis" />}
                </Tab.Screen>
                <Tab.Screen name="ThirteenthFinal" options={{ title: '13th' }}>
                    {() => <GameComponentByRound roundId={15} division={code} title="13th Place Final" />}
                </Tab.Screen>
                <Tab.Screen name="FifteenthPlace" options={{ title: '15th' }}>
                    {() => <GameComponentByRound roundId={16} division={code} title="15th Place" />}
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