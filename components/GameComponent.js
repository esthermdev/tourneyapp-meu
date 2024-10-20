import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, RefreshControl } from 'react-native';
import { supabase } from '../utils/supabase';
import { FlashList } from '@shopify/flash-list';
import { Card, Avatar, Icon } from '@rneui/base';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { formatDate } from '../utils/formatDate';
import { formatTime } from '../utils/formatTime';
import { ms } from 'react-native-size-matters';

const GameComponent = ({ poolId, division, title }) => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getGames(poolId, division);
  }, [poolId, division]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getGames(poolId, division).then(() => setRefreshing(false));
  }, [poolId, division]);

  const getGames = async (poolId, division) => {
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
      .eq('pool_id', poolId)
      .order('datetime_id')
      .order('id')

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching games:', error);
    } else {
      const filteredGames = data.filter(game => game.team1 !== null && game.team2 !== null);
      setGames(filteredGames);
    }
    setIsLoading(false);
  };

  const renderItem = ({ item }) => (
    <Card containerStyle={styles.card}>
      <View style={styles.dateTimeContainer}>
        <Text style={styles.dateTime}>
          {formatDate(item.datetime.date)} - {formatTime(item.datetime.time)}
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
      <View style={styles.fieldInfoContainer}>
        <FontAwesome6 name="location-dot" size={12} color="#8F8DAA" style={styles.locationIcon} />
        <Text style={styles.fieldTitle} maxFontSizeMultiplier={1.2}>
          Field {item.field?.name || 'Number'}
        </Text>
      </View>
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

export default GameComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#D9D9D9',
    paddingTop: 10
  },
  title: {
    fontFamily: 'Outfit-Bold',
    fontSize: ms(24),
    color: '#EA1D25',
    textAlign: 'center',
    marginVertical: 10,
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
    padding: 12,
  },
  dateTimeContainer: {
    backgroundColor: '#EA1D25',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  dateTime: {
    fontFamily: 'Outfit-Bold',
    fontSize: ms(14),
    color: 'white',
    textAlign: 'center',
  },
  fieldInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  fieldTitle: {
    fontFamily: 'Outfit-Regular',
    fontSize: ms(14),
    color: '#8F8DAA'
  },
  locationIcon: {
    marginRight: 3
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  teamContainer: {
    flex: 1,
    marginTop: 5,
    alignItems: 'center',
  },
  avatarContainer: {
    borderColor: '#EA1D25',
    borderWidth: 1,
    marginBottom: 5,
  },
  teamName: {
    textAlign: 'center',
    fontFamily: 'Outfit-Bold',
    fontSize: ms(14),
    paddingHorizontal: 2,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  score: {
    fontSize: ms(30),
    fontFamily: 'Outfit-SemiBold',
  },
  colon: {
    fontSize: ms(30),
    marginHorizontal: 5,
    marginBottom: 7,
    fontFamily: 'Outfit-Medium',
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