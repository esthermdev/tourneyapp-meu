import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Alert, SafeAreaView } from 'react-native';
import { supabase } from '../../../../../utils/supabase';
import { Card, Avatar} from '@rneui/base';
import { formatTime } from '../../../../../utils/formatTime';
import { FlatList } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';

const PoolDGamesScreen = () => {
  const [games, setGames] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentGame, setCurrentGame] = useState(null);
  const [team1Score, setTeam1Score] = useState('');
  const [team2Score, setTeam2Score] = useState('');

  useEffect(() => {
    getGamesByPoolId(10);
    setupRealtimeListeners();
  }, []);

  const getGamesByPoolId = async (poolId) => {
    const { data, error } = await supabase
      .from('full_gameview')
      .select('*')
      .eq('pool_id', poolId)
      .order('time');

    if (error) {
      console.error('Error fetching games:', error);
    } else {
      setGames(data);
    }
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
    setTeam1Score(game.team1_score?.toString() || '0');
    setTeam2Score(game.team2_score?.toString() || '0');
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
        getGamesByPoolId(10);
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
        getGamesByPoolId(10);
      }
    }
  }

  const handleResetAllGames = async () => {
    Alert.alert(
      "Reset All Games",
      "Are you sure you want to reset all scores and standings to 0 and mark all games as unfinished for Pool D?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Yes, Reset All",
          onPress: async () => {
            const { error } = await supabase
              .rpc('reset_pool_scores', { pool_id_param: 10 });
  
            if (error) {
              console.error('Error resetting games:', error);
              Alert.alert('Error', 'Failed to reset games');
            } else {
              Alert.alert('Success', 'All games in Pool D have been reset');
              getGamesByPoolId(10);
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
          <Text style={styles.teamName}>{item.team1_name}</Text>
          <Text style={styles.scoreText}>{item.team1_score}</Text>
        </View>
        <View style={styles.teamsContainer}>
          <Text style={styles.teamName}>{item.team2_name}</Text>
          <Text style={styles.scoreText}>{item.team2_score}</Text>
        </View>
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.fieldText}>{formatTime(item.time)} - Wainright {item.field_id || 'Number'}</Text>
        <Text style={styles.statusText}>{item.is_finished ? 'Final' : 'In Progress'}</Text>
        <TouchableOpacity onPress={() => openModal(item)}>
          <Ionicons name="pencil" size={20} color="#EA1D25" />
        </TouchableOpacity>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text className='font-outfitbold text-2xl text-center m-3'>Pool D Games</Text>
        <FlatList 
          data={games}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          estimatedItemSize={200}
          contentContainerStyle={styles.listContentContainer}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.resetButton} onPress={handleResetAllGames}>
            <Text style={styles.buttonText}>Reset All Games</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal 
        visible={isModalVisible}
        animationType='fade'
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Game</Text>
            {currentGame && (
              <>
                <View style={styles.modalTeamContainer}>
                  <Avatar rounded source={{ uri: currentGame.team1_avatar }} size={40} />
                  <Text style={styles.modalTeamName}>{currentGame.team1_name}</Text>
                  <TextInput 
                    style={styles.scoreInput}
                    value={team1Score}
                    onChangeText={setTeam1Score}
                    keyboardType='numeric'
                  />
                </View>
                <View style={styles.modalTeamContainer}>
                  <Avatar rounded source={{ uri: currentGame.team2_avatar }} size={40} />
                  <Text style={styles.modalTeamName}>{currentGame.team2_name}</Text>
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
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listContentContainer: {
    padding: 10,
    paddingBottom: 120,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#CBCAD8',
  },
  resetButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Outfit-Bold',
    fontSize: 16,
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
  timeText: {
    fontFamily: 'Outfit-Regular',
    fontSize: 14,
    color: '#8F8DAA',
    marginBottom: 5,
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
  finishButton: {
    backgroundColor: '#4CAF50',
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

export default PoolDGamesScreen;