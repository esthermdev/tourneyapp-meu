import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { supabase } from '../../../utils/supabase';
import { Button } from '@rneui/base';
import { FlatList } from 'react-native-gesture-handler';

const MyGamesScreen = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getGamesByEmailandDate('shadeulti@gmail.com', '2024-07-04');
  }, []);

  const getGamesByEmailandDate = async (email, date) => {
    const { data, error } = await supabase
      .from('full_game_data')
      .select(`
        date,
        team1_email,
        team2_email,
        team1_score,
        team2_score,
        team1_name,
        team2_name
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

  return (
    <View>
      <Text>My Games</Text>
    </View>
  );
};

export default MyGamesScreen;

const styles = StyleSheet.create({});