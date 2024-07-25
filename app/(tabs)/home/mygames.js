import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Modal, LayoutAnimation } from 'react-native';
import { supabase } from '../../../utils/supabase';
import { Card, Avatar, Icon, Button } from '@rneui/base';
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
  }, [profile, selectedDate]);

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
          console.log('Change received!', payload);
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
        style={styles.updateButton}
        onPress={() => openModal(item)}
      >
        <Text style={styles.updateButtonText}>Update Score</Text>
      </TouchableOpacity>
    </Card> 
  );

  const renderDropdownItem = (item) => (
    <View style={styles.dropdownItem}>
      <Text style={styles.dropdownItemText}>{item.label}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        data={[
          { label: 'Saturday, August 3, 2024', value: '2024-07-04' },
          { label: 'Sunday, August 4, 2024', value: '2024-07-05' }
        ]}
        labelField='label'
        valueField='value'
        value={selectedDate}
        onChange={item => {
          setSelectedDate(item.value);
        }}
        selectedTextStyle={{ fontFamily: 'Outfit-SemiBold', fontSize: 20 }}
        renderItem={renderDropdownItem}
      />
      <FlashList 
        data={games}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        estimatedItemSize={10}
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
                  <Text className='flex-1 font-outfitbold'>{currentGame.team1_name}</Text>
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
                  <Text className='flex-1 font-outfitbold'>{currentGame.team2_name}</Text>
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
            <Button 
              title='Submit final score'
              
            />
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
    padding: 10,
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.8,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  dropdownItemText: {
    color: 'black',
    fontFamily: 'Outfit-Regular',
    fontSize: 20,
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
    marginVertical: 5
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
  },
  closeButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  closeButtonText: {
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
    marginTop: 20,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
});