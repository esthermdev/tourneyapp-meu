import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { supabase } from '../../../utils/supabase';
import { formatTime } from '../../../utils/formatTime';
import { Card } from '@rneui/base';
import { s, ms } from 'react-native-size-matters';

const TeamGames = () => {
    const { id, teamName } = useLocalSearchParams();
    const [games, setGames] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchTeamGames();
    }, [id]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchTeamGames().then(() => setRefreshing(false));
    }, [id]);

    const fetchTeamGames = async () => {
        const { data, error } = await supabase
            .from('games')
            .select(`
        id,
        datetime: datetime_id (
          date, time
        ),
        team1:team1_id (
          id, name
        ),
        team2:team2_id (
          id, name
        ),
        scores!inner (
          team1_score,
          team2_score,
          is_finished
        ),
        field: field_id (
          name
        )
      `)
            .or(`team1_id.eq.${id},team2_id.eq.${id}`)
            .order('datetime_id');

        if (error) {
            console.error('Error fetching team games:', error);
        } else {
            setGames(data);
        }
    };

    const renderGameItem = ({ item }) => (
        <Card containerStyle={styles.cardContainer}>
            <View style={styles.gameInfoContainer}>
                <Text style={styles.timeText}>{formatTime(item?.datetime?.time)}</Text>
                <Text style={styles.fieldText}>Field {item?.field?.name}</Text>
            </View>
            <View style={styles.teamsContainer}>
                <Text style={[styles.teamTextLeft, item?.team1?.id == id && styles.highlightedTeam]}>{item.team1.name}</Text>
                <Text style={styles.scoreText}>{item?.scores[0]?.team1_score}  -  {item?.scores[0]?.team2_score}</Text>
                <Text style={[styles.teamTextRight, item?.team2?.id == id && styles.highlightedTeam]}>{item.team2.name}</Text>
            </View>
            {item?.scores[0]?.is_finished && (
                <Text style={styles.finishedText}>Final</Text>
            )}
        </Card>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={games}
                renderItem={renderGameItem}
                keyExtractor={(item) => item.id.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#EA1D25']}
                    />
                }
                ListEmptyComponent={() => (
                    <Text style={styles.noGamesText}>No games scheduled for this team.</Text>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 5
    },
    cardContainer: {
        borderRadius: 10,
        padding: 15,
    },
    gameInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    timeText: {
        fontFamily: 'Outfit-Bold',
        fontSize: ms(16),
        color: '#333243',
    },
    fieldText: {
        fontFamily: 'Outfit-Regular',
        fontSize: ms(14),
        color: '#8F8DAA',
    },
    teamsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    teamTextLeft: {
        fontFamily: 'Outfit-Medium',
        fontSize: ms(14),
        color: '#333243',
        flex: 1,
        textAlign: 'center',
        backgroundColor: 'whitesmoke'
    },
    teamTextRight: {
        fontFamily: 'Outfit-Medium',
        fontSize: ms(14),
        color: '#333243',
        flex: 1,
        textAlign: 'center',
        backgroundColor: 'whitesmoke'
    },
    highlightedTeam: {
        fontFamily: 'Outfit-Bold',
        color: '#EA1D25',
    },
    scoreText: {
        fontFamily: 'Outfit-Bold',
        fontSize: ms(18),
        color: '#333243',
        flex: 0.8,
        textAlign: 'center'
    },
    finishedText: {
        fontFamily: 'Outfit-Regular',
        fontSize: ms(12),
        color: '#4CAF50',
        textAlign: 'right',
        marginTop: 5,
    },
    noGamesText: {
        fontFamily: 'Outfit-Regular',
        fontSize: ms(16),
        color: '#8F8DAA',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default TeamGames;