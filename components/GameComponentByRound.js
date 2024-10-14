import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, RefreshControl } from 'react-native';
import { supabase } from '../utils/supabase';
import { FlashList } from '@shopify/flash-list';
import { Card, Avatar, Icon } from '@rneui/base';
import { formatDate } from '../utils/formatDate';
import { formatTime } from '../utils/formatTime';
import { ms, s } from 'react-native-size-matters';

const GameComponentByRound = ({ division, roundId, title }) => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getGames(division, roundId);
  }, [division, roundId]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getGames(division, roundId).then(() => setRefreshing(false));
  }, [division, roundId]);

  const getGames = async (division, roundId) => {
    let query = supabase
      .from('games')
      .select(`
        id,
        division,
        pool:pool_id (
          id,
          name
        ),
        round_id,
        datetime:datetime_id (
          id, date, time
        ),
        team1:team1_id (
          name, avatar_uri
        ),
        team2:team2_id (
          name, avatar_uri
        ),
        scores!inner (
          team1_score,
          team2_score
        ),
        field: field_id (
          name
        )
      `)
      .eq('division', division)
      .eq('round_id', roundId)
      .order('pool_id')
      .order('id');

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching games:', error);
    } else {
      const filteredGames = data.filter(game => game.team1 !== null || game.team2 !== null);
      setGames(filteredGames);
    }
    setIsLoading(false);
  };

  const renderItem = ({ item }) => (
    <Card containerStyle={styles.card}>
      <View style={styles.dateTimeContainer}>
        <Text style={styles.dateTimeText} maxFontSizeMultiplier={1.2}>
          {formatDate(item.datetime.date)}
        </Text>
        <View style={styles.fieldInfoContainer}>
          <Icon type='ionicon' name='location-sharp' size={14} color='#8F8DAA' style={styles.icon} />
          <Text style={styles.fieldTitle} maxFontSizeMultiplier={1.2}>
            Field {item.field?.name || 'Number'}
          </Text>
        </View>
      </View>
      <View style={styles.dateTimeContainer}>
        <Text style={styles.dateTimeText} maxFontSizeMultiplier={1.2}>
          {formatTime(item.datetime.time)}
        </Text>
      </View>
      <View style={styles.content}>
        <View style={styles.teamContainer}>
          <Avatar
            size={50}
            rounded
            source={{ uri: item.team1?.avatar_uri }}
            containerStyle={styles.avatarContainer}
          />
          <Text style={styles.teamName} maxFontSizeMultiplier={1.1}>{item.team1?.name}</Text>
        </View>
        <View style={styles.scoreContainer}>
          <Text style={styles.score} maxFontSizeMultiplier={1.1}>{item.scores[0].team1_score}</Text>
          <Text style={styles.colon} maxFontSizeMultiplier={1.1}>:</Text>
          <Text style={styles.score} maxFontSizeMultiplier={1.1}>{item.scores[0].team2_score}</Text>
        </View>
        <View style={styles.teamContainer}>
          <Avatar
            size={50}
            rounded
            source={{ uri: item.team2?.avatar_uri }}
            containerStyle={styles.avatarContainer}
          />
          <Text style={styles.teamName} maxFontSizeMultiplier={1.1}>{item.team2?.name}</Text>
        </View>
      </View>
      {item.pool && item.pool.name && (
        <Text style={styles.poolName} maxFontSizeMultiplier={1.2}>
          Pool {item.pool.name}
        </Text>
      )}
    </Card>
  );

  const renderPlaceholder = () => (
    <View style={styles.placeholderContainer}>
      <Icon
        type='ionicon'
        name='time-outline'
        size={60}
        color='#EA1D25'
      />
      <Text style={styles.placeholderTitle}>{title} Coming Soon!</Text>
      <Text style={styles.placeholderText}>
        {title} matchups will be available here once games are scheduled.
      </Text>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {games.length > 0 ? (
        <FlashList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#EA1D25']}
            />
          }
          data={games}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          estimatedItemSize={10}
        />
      ) : renderPlaceholder()}
    </View>
  );
};

export default GameComponentByRound;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#D9D9D9',
    paddingTop: 10
  },
  card: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#CBCAD8',
    marginTop: 0,
    marginBottom: 12,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  dateTimeText: {
    fontFamily: 'Outfit-Medium',
    fontSize: ms(14),
    color: '#8F8DAA',
  },
  fieldInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  icon: {
    marginRight: 4,
  },
  fieldTitle: {
    fontFamily: 'Outfit-Regular',
    fontSize: ms(14),
    color: '#8F8DAA'
  },
  content: {
    flex: 1,
    marginTop: 10,
    flexDirection: 'row'
  },
  avatarContainer: {
    borderColor: '#EA1D25',
    borderWidth: 1,
  },
  teamContainer: {
    flex: 1,
    alignItems: 'center',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  score: {
    fontSize: ms(28),
    fontFamily: 'Outfit-SemiBold',
  },
  colon: {
    fontSize: ms(28),
    marginHorizontal: 5,
    marginBottom: 5,
    fontFamily: 'Outfit-Medium',
  },
  teamName: {
    textAlign: 'center',
    fontFamily: 'Outfit-Bold',
    fontSize: ms(16),
    marginTop: 5
  },
  poolName: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: ms(12),
    color: '#EA1D25',
    textAlign: 'center',
    marginTop: 5,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  placeholderTitle: {
    fontFamily: 'Outfit-Bold',
    fontSize: ms(24),
    color: '#EA1D25',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  placeholderText: {
    fontFamily: 'Outfit-Regular',
    fontSize: ms(16),
    color: '#8F8DAA',
    textAlign: 'center',
    marginBottom: 10,
  },
  loadingText: {
    fontFamily: 'Outfit-Regular',
    fontSize: ms(18),
    color: '#8F8DAA',
    textAlign: 'center',
    marginTop: 20,
  },
});