import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native';
import { Card } from '@rneui/base';
import { supabase } from '../utils/supabase';
import { s, ms } from 'react-native-size-matters';

const divisionPoolMapping = {
    men_upper: {
        poolIds: [1, 2, 3, 4],
        poolNames: ['A', 'B', 'C', 'D']
    },
    women_upper: {
        poolIds: [15, 16, 17, 18],
        poolNames: ['M', 'N', 'O', 'P']
    },
};

const StandingsComponent = ({ division }) => {
    const [standings, setStandings] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchStandings();
    }, [division]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchStandings().then(() => setRefreshing(false));
    }, [division]);

    const fetchStandings = async () => {
        const { poolIds } = divisionPoolMapping[division];

        const { data, error } = await supabase
            .from('rankings')
            .select(`
        wins,
        losses,
        pool_rank,
        teams!inner (pool_id, seed, name)
      `)
            .in('teams.pool_id', poolIds)
            .order('teams(pool_id)', { ascending: true })
            .order('pool_rank', { ascending: true });

        if (error) {
            console.error('Error fetching teams:', error);
        } else {
            const groupedStandings = groupStandingsByPool(data);
            setStandings(groupedStandings);
        }
    };

    const groupStandingsByPool = (data) => {
        return data.reduce((acc, team) => {
            const poolId = team.teams.pool_id;
            if (!acc[poolId]) {
                acc[poolId] = [];
            }
            acc[poolId].push(team);
            return acc;
        }, {});
    };

    const getPoolName = (poolId) => {
        const { poolIds, poolNames } = divisionPoolMapping[division];
        const index = poolIds.indexOf(poolId);
        return poolNames[index];
    };

    const renderStandings = (poolStandings, poolId) => {
        const poolName = getPoolName(parseInt(poolId));
        return (
            <Card containerStyle={styles.poolCard} key={poolId}>
                <View style={styles.poolHeaderContainer}>
                    <Text maxFontSizeMultiplier={1.2} style={styles.poolHeader}>Pool {poolName}</Text>
                    <Text maxFontSizeMultiplier={1.2} style={styles.wlHeader}>W–L</Text>
                </View>
                {poolStandings.map((team, i) => (
                    <View key={i} style={styles.teamRow}>
                        <Text maxFontSizeMultiplier={1.2} style={styles.teamName}>{team.teams.name} ({team.teams.seed})</Text>
                        <Text maxFontSizeMultiplier={1.2} style={styles.recordText}>{team.wins}–{team.losses}</Text>
                    </View>
                ))}
            </Card>
        );
    };

    return (
        <ScrollView
            contentContainerStyle={styles.standingsContainer}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={['#EA1D25']}
                />
            }
        >
            {Object.entries(standings).map(([poolId, poolStandings]) =>
                renderStandings(poolStandings, poolId)
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    standingsContainer: {
        paddingTop: 20
    },
    poolCard: {
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginTop: 0,
        marginBottom: 12,
        marginHorizontal: 20,
        padding: 10
    },
    poolHeaderContainer: {
        flexDirection: 'row',
        backgroundColor: '#EA1D25',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 7,
        padding: 12
    },
    poolHeader: {
        fontFamily: 'Outfit-Bold',
        fontSize: ms(18),
        color: 'white',
    },
    wlHeader: {
        fontFamily: 'Outfit-Bold',
        fontSize: ms(18),
        color: '#fff',
    },
    teamRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 0,
        padding: 12,
        borderBottomWidth: 0.5,
        borderBottomColor: '#CBC9E1',
    },
    teamName: {
        fontFamily: 'Outfit-Medium',
        fontSize: ms(16),
        color: '#333243',
        flex: 1,
    },
    recordText: {
        fontFamily: 'Outfit-Medium',
        fontSize: ms(16),
        color: '#333243',
        width: 50,
        textAlign: 'right',
    },
    backButton: {
        marginRight: 15,
    },
});

export default StandingsComponent;