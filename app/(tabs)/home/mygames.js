import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Modal } from 'react-native';
import { supabase } from '../../../utils/supabase';
import { Card, Avatar, Icon } from '@rneui/base';
import { FlashList } from '@shopify/flash-list';
import { formatTime } from '../../../utils/formatTime';
import { useAuth } from '../../../context/AuthProvider';
import { Dropdown } from 'react-native-element-dropdown';

const MyGamesScreen = () => {
  const { profile } = useAuth();

  const [games, setGames] = useState([]);
  const [team1Scores, setTeam1Scores] = useState({});
  const [team2Scores, setTeam2Scores] = useState({});
  const [selectedDate, setSelectedDate] = useState('2024-07-04');
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentGame, setCurrentGame] = useState(null);

  useEffect(() => {
    if (profile && profile.team_id) {
      getGamesByTeamIdandDate(profile.team_id, selectedDate);
    }
  }, [profile, selectedDate, team1Scores, team2Scores]);

  const getGamesByTeamIdandDate = async (teamId, date) => {
    const { data, error } = await supabase
      .from('full_game_set')
      .select(`
        id,
        date,
        time,
        team1_id,
        team1_name,
        team1_email,
        team1_score,
        team1_avatar,
        team2_id,
        team2_name,
        team2_email,
        team2_score,
        team2_avatar
      `)
      .or(`team1_id.eq.${teamId}, team2_id.eq.${teamId}`)
      .eq('date', date)
     
    if (error) {
      console.error('Error fetching games:', error);
    } else {
      setGames(data);
    }
  }

  const handleUpdateScore = async (gameId) => {
    if (currentGame) {
      const { error } = await supabase
      .from('full_game_set')
      .update({
        team1_score: team1Scores[currentGame.id],
        team2_score: team2Scores[currentGame.id]
      })
      .eq('id', currentGame.id)
      .select()

      if (error) {
        console.error('Error updating score:', error);
      } else {
        alert('Scores updated successfully');
        setModalVisible(false);
        getGamesByTeamIdandDate(profile.team_id, selectedDate);
        setupRealtimeListeners();
      }
    }
  }

  const openModal = (game) => {
    setCurrentGame(game);
    setModalVisible(true);
  }

  const setupRealtimeListeners = () => {
    const subscription = supabase.channel('update-scores-channel')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'scores' },
        (payload) => {
          console.log('Change received!', payload);
          const updatedGameId = payload.new.game_id;
          setTeam1Scores(prevScores => ({
            ...prevScores,
            [updatedGameId]: payload.new.team1_score
          }));
          setTeam2Scores(prevScores => ({
            ...prevScores,
            [updatedGameId]: payload.new.team2_score
          }));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    }
  }

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
        <TextInput 
          style={styles.scoreInput}
          value={team1Scores[item.id]}
          onChangeText={(text) => setTeam1Scores({...team1Scores, [item.id]: parseInt(text)})}
          keyboardType='numeric'
        />
        <Text>Game ID:{item.id}, Score:{item.team1_score}</Text>
      </View>
      <View style={styles.vsContainer}>
        <Text className='font-outfitregular text-base text-[#BAB8CB] mb-1'>vs</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.teamContainer}>
        <Avatar className='flex-none' rounded source={{ uri: item.team2_avatar }}/>
        <Text className='flex-1 font-outfitbold'>{item.team2_name}</Text>
        <TextInput 
          style={styles.scoreInput}
          value={team2Scores[item.id]}
          onChangeText={(text) => setTeam2Scores({...team2Scores, [item.id]: parseInt(text) })}
          keyboardType='numeric'
        />
        <Text>Game ID:{item.id}, Score:{item.team2_score}</Text>
      </View>
      <TouchableOpacity
        style={styles.updateButton}
        onPress={() => openModal(item)}
      >
        <Text style={styles.updateButtonText}>Update Score</Text>
      </TouchableOpacity>
    </Card> 
  );

  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        itemTextStyle={{ color: 'black' }}
        activeColor='purple'
        itemContainerStyle={{ backgroundColor: 'lightgray' }}
        data={[
          { label: 'Saturday, July 4, 2024', value: '2024-07-04' },
          { label: 'Sunday, July 5, 2024', value: '2024-07-05' }
        ]}
        labelField='label'
        valueField='value'
        placeholder='Select a date'
        value={selectedDate}
        onChange={item => setSelectedDate(item.value)}
      />
      <FlashList 
        data={games}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        estimatedItemSize={10}
      />
      <Modal visible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Update Scores</Text>
          {currentGame && (
            <>
              <View style={styles.teamContainer}>
                <Avatar className='flex-none' rounded source={{ uri: currentGame.team1_avatar }} />
                <Text className='flex-1 font-outfitbold'>{currentGame.team1_name}</Text>
                <TextInput 
                  style={styles.scoreInput}
                  value={team1Scores[currentGame.id]?.toString()}
                  onChangeText={(text) => setTeam1Scores({ ...team1Scores, [currentGame.id]: parseInt(text) })}
                  keyboardType='numeric'
                />
              </View>
              <View style={styles.teamContainer}>
                <Avatar className='flex-none' rounded source={{ uri: currentGame.team2_avatar }} />
                <Text className='flex-1 font-outfitbold'>{currentGame.team2_name}</Text>
                <TextInput 
                  style={styles.scoreInput}
                  value={team2Scores[currentGame.id]?.toString()}
                  onChangeText={(text) => setTeam2Scores({ ...team2Scores, [currentGame.id]: parseInt(text) })}
                  keyboardType='numeric'
                />
              </View>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default MyGamesScreen;

const styles = StyleSheet.create({
  scoreInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flex: 0.3,
    textAlign: 'right',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  cardContainer: {
    padding: 24,
  },
  dropdown: {
    marginTop: 20,
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: 'white',
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
  },
  updateButton: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  updateButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});