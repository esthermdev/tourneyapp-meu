import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { supabase } from '../../../../utils/supabase';
import { FlashList } from '@shopify/flash-list';
import { Card, Avatar, Icon } from '@rneui/base';

const SemiFinals = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getGamesByRoundId(6);
  }, []);

  const getGamesByRoundId = async (roundId) => {
    const { data, error } = await supabase
      .from('games')
      .select(`
        id,
        round_id,
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
      .eq('round_id', roundId)

    if (error) {
      console.error('Error fetching games:', error);
    } else {
      const filteredGames = data.filter(game => game.team1_id !== null || game.team2_id !== null);
      setGames(filteredGames);
    }
  };

  console.log(JSON.stringify(games, null, 2));

  const renderItem = ({ item }) => (
    <Card containerStyle={styles.cardContainer}>
      <View style={styles.header}>
        <Icon type='ionicon' name='location-outline' size={12} color='#8F8DAA' containerStyle={styles.locationIcon} />
        <Text className='font-outfitregular text-[#8F8DAA]'>{}
          Field {item.field?.name || 'Number'}
        </Text>
      </View>
      <View style={styles.content}>
        <View style={styles.teamContainer}>
          <Avatar 
            size={75}
            rounded
            source={{ uri: item.team1?.avatar_uri }}
            containerStyle={styles.avatarContainer}
          />
          <Text style={styles.teamName}>{item.team1?.name || 'TBD'}</Text>
        </View>
        <View style={styles.scoreContainer}>
          <Text style={styles.score}>{item.scores[0]?.team1_score || '-'}</Text>
          <Text style={styles.colon}>:</Text>
          <Text style={styles.score}>{item.scores[0]?.team2_score || '-'}</Text>
        </View>
        <View style={styles.teamContainer}>
          <Avatar 
            size={75}
            rounded
            source={{ uri: item.team2?.avatar_uri }}
            containerStyle={styles.avatarContainer}
          />  
          <Text style={styles.teamName}>{item.team2?.name || 'TBD'}</Text>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        <Text style={styles.time}>8/4</Text>
        <Icon type='ionicon' name='time-outline' size={20} color='#EA1D25' />
        <Text style={styles.time}>11:00AM</Text>
      </View>
      <FlashList 
        data={games}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        estimatedItemSize={10}
      />
    </View>
  );
};

export default SemiFinals;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#D9D9D9',
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
});
