// app/schedule/[division]/pool-play.js
import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import GameComponent from '../../../../components/GameComponent';
import CustomHeader from '../../../../components/CustomHeader';
import { ms } from 'react-native-size-matters';

const Tab = createMaterialTopTabNavigator();

export default function PoolPlay() {
    const { division, code } = useLocalSearchParams();

    // Define pool IDs for each division
    const poolIds = {
        MU: [1, 2, 3, 4],  // Men's Upper
        MM: [5, 6, 7, 8],  // Men's Middle
        ML: [11, 12, 13, 14],  // Men's Lower
        WU: [15, 16, 17, 18],  // Women's Upper
        WL: [19, 20, 21, 22],  // Women's Lower
        X: [23, 24, 25]  // Mixed
    };

    const divisionPools = poolIds[code] || [];

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
                {divisionPools.map((poolId, index) => (
                    <Tab.Screen
                        key={poolId}
                        name={`Pool${index + 1}`}
                        options={{ title: `P${index + 1}` }}
                    >
                        {() => <GameComponent poolId={poolId} division={code} title={`Pool ${index + 1}`} />}
                    </Tab.Screen>
                ))}
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