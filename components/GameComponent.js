import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { supabase } from '../utils/supabase';
import { FlashList } from '@shopify/flash-list';
import { Card, Avatar, Icon } from '@rneui/base';
import { formatDate } from '../utils/formatDate';
import { formatTime } from '../utils/formatTime';

const GameComponent = ({ datetimeId, division, roundId, poolIds, title }) => {
  const [games, setGames] = useState([]);
  const [roundInfo, setRoundInfo] = useState({ date: '', time: '' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getGames(datetimeId, division, roundId, poolIds);
  }, [datetimeId, division, roundId, poolIds]);

  const getGames = async (datetimeId, division, roundId, poolIds) => {
    let query = supabase
      .from('games')
      .select(`
        id,
        pool_id,
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
      .eq('division', division).eq('round_id', roundId).eq('datetime_id', datetimeId)

    if (poolIds) {
      query = query.in('pool_id', poolIds)
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching games:', error);
    } else {
      const filteredGames = data.filter(game => game.team1 !== null || game.team2 !== null);
      setGames(filteredGames);
      if (filteredGames.length > 0) {
        setRoundInfo({
          date: formatDate(filteredGames[0].datetime.date),
          time: formatTime(filteredGames[0].datetime.time)
        });
      }
    }
    setIsLoading(false);
  };

  const renderItem = ({ item }) => (
    <Card containerStyle={styles.cardContainer}>
      <View style={styles.header}>
        <Icon type='ionicon' name='location-outline' size={12} color='#8F8DAA' containerStyle={styles.locationIcon} />
        <Text className='font-outfitregular text-[#8F8DAA]'>{ }
          Field {item.field?.name || 'Number'}
        </Text>
      </View>
      <View style={styles.content}>
        <View style={styles.teamContainer}>
          <Avatar
            size={75}
            rounded
            source={{ uri: item.team1.avatar_uri }}
            containerStyle={styles.avatarContainer}
          />
          <Text style={styles.teamName}>{item.team1.name}</Text>
        </View>
        <View style={styles.scoreContainer}>
          <Text style={styles.score}>{item.scores[0].team1_score}</Text>
          <Text style={styles.colon}>:</Text>
          <Text style={styles.score}>{item.scores[0].team2_score}</Text>
        </View>
        <View style={styles.teamContainer}>
          <Avatar
            size={75}
            rounded
            source={{ uri: item.team2.avatar_uri }}
            containerStyle={styles.avatarContainer}
          />
          <Text style={styles.teamName}>{item.team2.name}</Text>
        </View>
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
      <Text style={styles.placeholderText}>
        {title} matchups will be available here once previous games are completed.
      </Text>
      <Text style={styles.placeholderText}>
        Stay tuned for exciting knockout stage action!
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
        <>
          <View style={styles.timeContainer}>
            <Text style={styles.time}>{roundInfo.date}</Text>
            <Icon type='ionicon' name='time-outline' size={20} color='#EA1D25' />
            <Text style={styles.time}>{roundInfo.time}</Text>
          </View>
          <FlashList
            data={games}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            estimatedItemSize={10}
          />
        </>
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
  },
  title: {
    fontFamily: 'Outfit-Bold',
    fontSize: 24,
    color: '#EA1D25',
    textAlign: 'center',
    marginVertical: 10,
  },
  timeContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5
  },
  time: {
    textAlign: 'center',
    fontFamily: 'Outfit-Bold',
    fontSize: 20,
    color: '#EA1D25'
  },
  cardContainer: {
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#CBCAD8',
    padding: 24,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationIcon: {
    marginRight: 3,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'top',
  },
  teamContainer: {
    flex: 1,
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
    fontSize: 14,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12
  },
  score: {
    fontSize: 40,
    fontFamily: 'Outfit-Medium',
  },
  colon: {
    fontSize: 40,
    marginHorizontal: 10,
    marginBottom: 8,
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
    fontSize: 24,
    color: '#EA1D25',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  placeholderText: {
    fontFamily: 'Outfit-Regular',
    fontSize: 16,
    color: '#8F8DAA',
    textAlign: 'center',
    marginBottom: 10,
  },
  loadingText: {
    fontFamily: 'Outfit-Regular',
    fontSize: 18,
    color: '#8F8DAA',
    textAlign: 'center',
    marginTop: 20,
  },
});