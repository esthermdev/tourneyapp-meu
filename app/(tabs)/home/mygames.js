import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Modal } from 'react-native';
import { supabase } from '../../../utils/supabase';
import { Card, Avatar, Icon, Button } from '@rneui/base';
import { FlashList } from '@shopify/flash-list';
import { formatTime } from '../../../utils/formatTime';
import { useAuth } from '../../../context/AuthProvider';
import { Dropdown } from 'react-native-element-dropdown';

const MyGamesScreen = () => {
  const { profile } = useAuth();

  const [games, setGames] = useState([]);
  const [currentGame, setCurrentGame] = useState(null);
  const [team1Scores, setTeam1Scores] = useState({});
  const [team2Scores, setTeam2Scores] = useState({});
  const [dateOptions, setDateOptions] = useState([]);
  const [selectedDate, setSelectedDate] = useState('2024-08-03');
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (profile && profile.team_id) {
      fetchDateOptions(profile.team_id);
    }
  }, [profile]);

  useEffect(() => {
    if (profile && profile.team_id && selectedDate) {
      getGamesByTeamIdandDate(profile.team_id, selectedDate);
    }
  }, [profile, selectedDate]);

  const fetchDateOptions = async (teamId) => {
    const { data, error } = await supabase
      .from('full_gameview')
      .select('date')
      .or(`team1_id.eq.${teamId},team2_id.eq.${teamId}`)
      .order('date');

    if (error) {
      console.error('Error fetching date options:', error);
    } else {
      const uniqueDates = [...new Set(data.map(item => item.date))];
      const options = uniqueDates.map(date => ({
        label: new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        value: date
      }));
      setDateOptions(options);
      if (options.length > 0) {
        setSelectedDate(options[0].value);
      }
    }
  };

  const getGamesByTeamIdandDate = async (teamId, date) => {
    const { data, error } = await supabase
      .from('full_gameview')
      .select(`
        id,
        date,
        time,
        team1_id,
        team1_name,
        team1_score,
        team1_avatar,
        team2_id,
        team2_name,
        team2_score,
        team2_avatar,
        is_finished
      `)
      .or(`team1_id.eq.${teamId}, team2_id.eq.${teamId}`)
      .eq('date', date)
      .order('time', { ascending: true })
     
    if (error) {
      console.error('Error fetching games:', error);
    } else {
      setGames(data);
    }
  }

  const handleUpdateScore = async () => {
    if (currentGame) {
      const { error } = await supabase
      .from('scores')
      .update({
        team1_score: team1Scores[currentGame.id],
        team2_score: team2Scores[currentGame.id],
      })
      .eq('game_id', currentGame.id)
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

  const handleSubmitFinalScore = async () => {
    const { data: { user } } = await supabase.auth.getUser()
  
    if (!user) {
      console.log('No authenticated user found');
      alert('You must be logged in to update scores');
      return;
    }
  
    console.log('Current user ID:', user.id);
    
    if (currentGame) {
      console.log('Current game:', currentGame);

      const { error } = await supabase
        .from('scores')
        .update({
          is_finished: true
        })
        .eq('game_id', currentGame.id)
        .select()
  
      if (error) {
        console.error('Error updating final score:', error);
        console.log('Update payload:', {
          team1_score: team1Scores[currentGame.id],
          team2_score: team2Scores[currentGame.id],
          is_finished: true,
          game_id: currentGame.id
        });
        alert(`Failed to submit final score. Error: ${error.message}`);
      } else {
        alert('Final score submitted successfully');
        setModalVisible(false);
        getGamesByTeamIdandDate(profile.team_id, selectedDate);
        setupRealtimeListeners();
      }
    }
  }

  const openModal = (game) => {
    setCurrentGame(game);
    setTeam1Scores({ ...team1Scores, [game.id]: game.team1_score });
    setTeam2Scores({ ...team2Scores, [game.id]: game.team2_score });
    setModalVisible(true);
  }

  const setupRealtimeListeners = () => {
    const subscription = supabase.channel('update-scores-channel')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'scores' },
        (payload) => {
          const updatedGameId = payload.new.game_id;
          setTeam1Scores(prevScores => ({
            ...prevScores,
            [updatedGameId]: payload.new.team1_score,
          }));
          setTeam2Scores(prevScores => ({
            ...prevScores,
            [updatedGameId]: payload.new.team2_score,
          }));
        }
      )
      .subscribe();
  
    return () => {
      supabase.removeChannel(subscription);
    }
  }

  const renderItem = ({ item }) => (
    <Card containerStyle={styles.cardContainer}>
      <View style={styles.timeFieldContainer}>
        <Text className='flex-1 font-outfitregular text-[#8F8DAA]'>{formatTime(item.time)}</Text>
        <View style={styles.fieldContainer}>
          <Icon className='font-outfitregular' type='ionicon' name='location-outline' size={12} color='#8F8DAA' />
          <Text className='ml-1 text-[#8F8DAA] font-outfitregular'>Field Number</Text>
        </View>
      </View>
      <View className='mt-4' style={styles.teamContainer}>
        <Avatar className='flex-none' rounded source={{ uri: item.team1_avatar }}/>
        <Text className='flex-1 font-outfitbold text-lg'>{item.team1_name}</Text>
        <Text className='font-outfitregular text-lg'>{item.team1_score}</Text>
      </View>
      <View style={styles.vsContainer}>
        <Text className='font-outfitregular text-base text-[#BAB8CB] mb-1'>vs</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.teamContainer}>
        <Avatar className='flex-none' rounded source={{ uri: item.team2_avatar }}/>
        <Text className='flex-1 font-outfitbold text-lg'>{item.team2_name}</Text>
        <Text className='font-outfitregular text-lg'>{item.team2_score}</Text>
      </View>
      <TouchableOpacity
        style={[styles.updateButton, item.is_finished && styles.disabledButton]}
        onPress={() => openModal(item)}
        disabled={item.is_finished}
      >
        <Text style={[styles.updateButtonText, item.is_finished && styles.disabledButtonText]}>
          {item.is_finished ? 'Game Finished' : 'Update Score'}
        </Text>
      </TouchableOpacity>
    </Card> 
  );

  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        itemTextStyle={styles.dropdownItemText}
        data={dateOptions}
        labelField='label'
        valueField='value'
        value={selectedDate}
        onChange={item => {
          setSelectedDate(item.value);
        }}
        selectedTextStyle={styles.dropdownSelectedText}
      />
      <FlashList 
        data={games}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        estimatedItemSize={50}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
      <Modal 
        visible={isModalVisible}
        animationType='fade'
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Scores</Text>
            {currentGame && (
              <>
                <View style={styles.teamContainer}>
                  <Avatar className='flex-none' rounded source={{ uri: currentGame.team1_avatar }} />
                  <Text className='flex-1 font-outfitbold text-base'>{currentGame.team1_name}</Text>
                  <TextInput 
                    style={styles.scoreInput}
                    value={team1Scores[currentGame.id]?.toString()}
                    onChangeText={(text) => {
                      const value = text === '' ? '' : parseInt(text);
                      setTeam1Scores({...team1Scores, [currentGame.id]: value })
                    }}
                    keyboardType='numeric'
                  />
                </View>
                <View style={styles.teamContainer}>
                  <Avatar className='flex-none' rounded source={{ uri: currentGame.team2_avatar }} />
                  <Text className='flex-1 font-outfitbold text-base'>{currentGame.team2_name}</Text>
                  <TextInput 
                    style={styles.scoreInput}
                    value={team2Scores[currentGame.id]?.toString()}
                    onChangeText={(text) => {
                      const value = text === '' ? '' : parseInt(text);
                      setTeam2Scores({...team2Scores, [currentGame.id]: value })
                    }}
                    keyboardType='numeric'
                  />
                </View>
              </>
            )}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleUpdateScore}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.submitFinal}
              onPress={handleSubmitFinalScore}
            >
              <Text style={styles.submitButtonText}>Submit Final Score</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    borderRadius: 20,
    shadowRadius: 5
  },
  dropdown: {
    height: 50,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    marginTop: 10,
    marginHorizontal: 24
  },
  dropdownItemText: {
    fontSize: 18,
    fontFamily: 'Outfit-Regular',
    color: '#333243',
  },
  dropdownSelectedText: {
    color: '#EA1D25',
    fontFamily: 'Outfit-Regular',
    fontSize: 18,
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
    marginVertical: 10
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
  updateButtonText: {
    marginTop: 14,
    fontSize: 16,
    color: '#2871FF',
    textAlign: 'center',
    fontFamily: 'Outfit-Regular',
    textDecorationLine: 'underline'
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    width: '70%',
    alignSelf: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Outfit-Bold',
    marginBottom: 12,
    textDecorationLine: 'underline'
  },
  closeButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    fontFamily: 'Outfit-Regular',
    color: 'white',
    fontSize: 16,
  },
  scoreInput: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    borderColor: '#EA1D25',
    flex: 0.3,
    textAlign: 'center',
    fontFamily: 'Outfit-Regular',
    fontSize: 20
  },
  submitButton: {
    backgroundColor: '#EA1D25',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    alignItems: 'center',
  },
  submitFinal: {
    backgroundColor: 'darkblue',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    fontFamily: 'Outfit-Regular',
    color: 'white',
    fontSize: 16,
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledButtonText: {
    color: 'gray',
  },
});