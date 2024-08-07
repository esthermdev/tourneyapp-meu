import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { supabase } from '../../../../../utils/supabase';
import { Card} from '@rneui/base';
import { formatTime } from '../../../../../utils/formatTime';
import { FlatList } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';

const Finals = () => {
  const [games, setGames] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentGame, setCurrentGame] = useState(null);
  const [team1Score, setTeam1Score] = useState('');
  const [team2Score, setTeam2Score] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getGamesByRoundId(7);
    setupRealtimeListeners();
  }, []);

  const getGamesByRoundId = async (roundId) => {
    setIsLoading(true);
    const { data, error } = await supabase
    .from('games')
    .select(`
      id,
      rounds!inner (
        date, time
      ),
      team1:team1_id (
        name, avatar_uri
      ),
      team2:team2_id (
        name, avatar_uri
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
    .eq('round_id', roundId)

    if (error) {
      console.error('Error fetching games:', error);
    } else {
      console.log('Fetched games data:', JSON.stringify(data, null, 2));
      setGames(data);
    }
    setIsLoading(false);
  };

  const setupRealtimeListeners = () => {
    const subscription = supabase.channel('update-scores-channel')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'scores' },
        (payload) => {
          const updatedGameId = payload.new.game_id;
          setTeam1Score(prevScores => ({
            ...prevScores,
            [updatedGameId]: payload.new.team1_score,
          }));
          setTeam2Score(prevScores => ({
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
  
  const openModal = (game) => {
    setCurrentGame(game);
    setTeam1Score(game.scores?.team1_score?.toString() || '0');
    setTeam2Score(game.scores?.team2_score?.toString() || '0');
    setModalVisible(true);
  }

  const handleUpdateScore = async () => {
    if (currentGame) {
      const { error } = await supabase
        .from('scores')
        .update({
          team1_score: parseInt(team1Score),
          team2_score: parseInt(team2Score),
        })
        .eq('game_id', currentGame.id);
  
      if (error) {
        console.error('Error updating score:', error);
        Alert.alert('Error', 'Failed to update score');
      } else {
        Alert.alert('Success', 'Score updated successfully');
        setModalVisible(false);
        getGamesByRoundId(7); // Refresh the games data
      }
    }
  }

  const handleMarkAsFinished = async () => {
    if (currentGame) {
      const { error } = await supabase
        .from('scores')
        .update({
          is_finished: true
        })
        .eq('game_id', currentGame.id);

      if (error) {
        console.error('Error marking game as finished:', error);
        Alert.alert('Error', 'Failed to mark game as finished');
      } else {
        Alert.alert('Success', 'Game marked as finished');
        setModalVisible(false);
      }
    }
  }

  const handleResetAllGames = async () => {
    Alert.alert(
      "Reset All Games",
      "Are you sure you want to reset all scores to 0 and mark all games as unfinished for Finals?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Yes, Reset All",
          onPress: async () => {
            const { error } = await supabase
              .rpc('reset_bracket_scores', { round_id_param: 7 });
  
            if (error) {
              console.error('Error resetting games:', error);
              Alert.alert('Error', 'Failed to reset games');
            } else {
              Alert.alert('Success', 'All Final Games have been reset');
              getGamesByRoundId(7);
            }
          }
        }
      ]
    );
  }

  const renderItem = ({ item }) => (
    <Card containerStyle={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <View style={styles.teamsContainer}>
          <Text style={styles.teamName}>{item.team1?.name}</Text>
          <Text style={styles.scoreText}>{item.scores[0]?.team1_score || '0'}</Text>
        </View>
        <View style={styles.teamsContainer}>
          <Text style={styles.teamName}>{item.team2?.name}</Text>
          <Text style={styles.scoreText}>{item.scores[0]?.team2_score || '0'}</Text>
        </View>
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.fieldText}>{formatTime(item.time)} - Wainright {item.field_id || 'Number'}</Text>
        <Text style={styles.statusText}>{item.scores[0]?.is_finished ? 'Final' : 'In Progress'}</Text>
        <TouchableOpacity onPress={() => openModal(item)}>
          <Ionicons name="pencil" size={20} color="#EA1D25" />
        </TouchableOpacity>
      </View>
    </Card>
  );

  const renderPlaceholder = () => (
    <View style={styles.placeholderContainer}>
      <Text style={styles.placeholderText}>
        Finals will be available after Finals are completed.
      </Text>
      <Text style={styles.placeholderSubText}>
        Please check back later when all Finals are finished.
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text className='font-outfitbold text-2xl text-center m-5'>Finals</Text>
      {isLoading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : games.length > 0 ? (
        <>
          <FlatList 
            data={games}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            estimatedItemSize={200}
          />
          <TouchableOpacity style={styles.resetButton} onPress={handleResetAllGames}>
            <Text style={styles.resetButtonText}>Reset All Games</Text>
          </TouchableOpacity>
        </>
      ) : (
        renderPlaceholder()
      )}
      <Modal 
        visible={isModalVisible}
        animationType='fade'
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Finals</Text>
            {currentGame && (
              <>
                <View style={styles.modalTeamContainer}>
                  <Text style={styles.modalTeamName}>{currentGame.team1.name}</Text>
                  <TextInput 
                    style={styles.scoreInput}
                    value={team1Score}
                    onChangeText={setTeam1Score}
                    keyboardType='numeric'
                  />
                </View>
                <View style={styles.modalTeamContainer}>
                  <Text style={styles.modalTeamName}>{currentGame.team2.name}</Text>
                  <TextInput 
                    style={styles.scoreInput}
                    value={team2Score}
                    onChangeText={setTeam2Score}
                    keyboardType='numeric'
                  />
                </View>
              </>
            )}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleUpdateScore}
            >
              <Text style={styles.submitButtonText}>Update Score</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.finishButton}
              onPress={handleMarkAsFinished}
            >
              <Text style={styles.submitButtonText}>Mark as Finished</Text>
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  generateButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  generateButtonText: {
    color: 'white',
    fontFamily: 'Outfit-Bold',
    fontSize: 16,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  placeholderText: {
    fontFamily: 'Outfit-Bold',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  placeholderSubText: {
    fontFamily: 'Outfit-Regular',
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  loadingText: {
    fontFamily: 'Outfit-Regular',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
  resetButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  resetButtonText: {
    color: 'white',
    fontFamily: 'Outfit-Bold',
    fontSize: 16,
  },
  finishButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  cardContainer: {
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 15,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#CBCAD8',
  },
  cardHeader: {
    flexDirection: 'column',
    marginBottom: 8,
  },
  teamsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  teamName: {
    fontFamily: 'Outfit-Bold',
    fontSize: 16,
    color: '#333243',
  },
  scoreText: {
    fontFamily: 'Outfit-Medium',
    fontSize: 16,
    color: '#333243',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  fieldText: {
    fontFamily: 'Outfit-Regular',
    fontSize: 14,
    color: '#8F8DAA',
  },
  statusText: {
    fontFamily: 'Outfit-Medium',
    fontSize: 14,
    color: '#4CAF50',
  },
  updateButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#2871FF',
    borderRadius: 5,
    alignItems: 'center',
  },
  updateButtonText: {
    color: 'white',
    fontFamily: 'Outfit-Regular',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  disabledButtonText: {
    color: '#666',
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
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Outfit-Bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalTeamContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTeamName: {
    flex: 1,
    marginLeft: 10,
    fontFamily: 'Outfit-Bold',
    fontSize: 16,
  },
  scoreInput: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    width: 50,
    textAlign: 'center',
    fontFamily: 'Outfit-Regular',
    fontSize: 18,
  },
  submitButton: {
    backgroundColor: '#2871FF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  submitFinalButton: {
    backgroundColor: '#EA1D25',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontFamily: 'Outfit-Bold',
    fontSize: 16,
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
    fontFamily: 'Outfit-Regular',
    fontSize: 16,
  },
});

export default Finals;