import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { supabase } from '../../../utils/supabase';
import { Card, Avatar, Icon } from '@rneui/base';
import { FlashList } from '@shopify/flash-list';
import { formatTime } from '../../../utils/formatTime';
import { useAuth } from '../../../context/AuthProvider';

const MyGamesScreen = () => {
  const [games, setGames] = useState([]);
  const { user } = useAuth();

  console.log(user.email);

  useEffect(() => {
    getGamesByEmailandDate('shadeulti@gmail.com', '2024-07-04');
  }, []);



  const getGamesByEmailandDate = async (email, date) => {
    const { data, error } = await supabase
      .from('full_game_set')
      .select(`
        id,
        date,
        time,
        team1_name,
        team1_email,
        team1_score,
        team1_avatar,
        team2_name,
        team2_email,
        team2_score,
        team2_avatar
      `)
      .or(`team1_email.eq.${email}, team2_email.eq.${email}`)
      .eq('date', date)
     
    if (error) {
      console.error('Error fetching games:', error);
    } else {
      setGames(data);
    }
  }

  console.log(JSON.stringify(games, null, 2));

  const renderItem = ({ item }) => (
    <Card style={styles.cardContainer}>
      <View style={styles.timeFieldContainer}>
        <Text className='flex-1 font-outfitregular text-[#8F8DAA]'>{formatTime(item.time)}</Text>
        <View style={styles.fieldContainer}>
          <Icon className='font-outfitregular' type='ionicon' name='location-outline' size={12} color='#8F8DAA' />
          <Text className='ml-1 text-[#8F8DAA] font-outfitregular'>Field Number</Text>
        </View>
      </View>
      <View className='mt-4' style={styles.teamContainer}>
        <Avatar className='flex-none' rounded source={{ uri: item.team1_avatar }}/>
        <Text className='flex-1 font-outfitbold'>{item.team1_name}</Text>
        <Text className='flex-1 text-right '>{item.team1_score}</Text>
      </View>
      <View style={styles.vsContainer}>
        <Text className='font-outfitregular text-base text-[#BAB8CB] mb-1'>vs</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.teamContainer}>
        <Avatar className='flex-none' rounded source={{ uri: item.team2_avatar }}/>
        <Text className='flex-1 font-outfitbold'>{item.team2_name}</Text>
        <Text className='flex-1 text-right'>{item.team2_score}</Text>
      </View>
    </Card> 
  );

  return (
    <View style={styles.container}>
      <FlashList 
        data={games}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        estimatedItemSize={10}
      />
    </View>
  );
};

export default MyGamesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  cardContainer: {
    padding: 24,
  },
  timeFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  timeFieldFontStyle: {
    fontFamily: 'Outfit-Regular',
    color: '#8F8DAA'
  },  
  fieldContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },  
  teamContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  vsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingLeft: 44,
    marginVertical: 5,
  },  
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#BAB8CB',
  }
});