import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, SectionList, RefreshControl } from 'react-native';
import { supabase } from '../../../utils/supabase';
import { Card, Avatar, Icon } from '@rneui/base';
import { formatTime } from '../../../utils/formatTime';
import { useAuth } from '../../../context/AuthProvider';
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomHeader from '../../../components/CustomHeader';
import { ms } from 'react-native-size-matters';
import { formatDateToLocalString } from '../../../utils/formatDateToLocalString';

const Placeholder = () => (
  <View style={styles.placeholderContainer}>
    <Ionicons name="people-outline" size={ms(60)} color="#EA1D25" />
    <Text style={styles.placeholderTitle}>No Team Selected</Text>
    <Text style={styles.placeholderText}>
      To view games, please choose a team on your account page.
    </Text>
    <Text style={styles.placeholderSubText}>
      If you're not a player, that's okay! You can still explore other sections of the app.
    </Text>
  </View>
);

const MyGamesScreen = () => {
  const { profile } = useAuth();
  console.log(profile)

  const [games, setGames] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentGame, setCurrentGame] = useState(null);
  const [team1Score, setTeam1Score] = useState('');
  const [team2Score, setTeam2Score] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (profile && profile.team_id) {
      fetchGames(profile.team_id);
    }
  }, [profile]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchGames(profile.team_id).then(() => setRefreshing(false));
  }, [profile]);

  const fetchGames = async (teamId) => {
    const { data, error } = await supabase
      .from('games')
      .select(`
        id,
        datetime: datetime_id (
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
      .or(`team1_id.eq.${teamId},team2_id.eq.${teamId}`)
      .order('datetime_id')

    if (error) {
      console.error('Error fetching games:', error);
    } else {
      // Group games by date
      const groupedGames = data.reduce((acc, game) => {

        const utcDate = new Date(game.datetime.date);

        // Format the date string
        const dateString = formatDateToLocalString(utcDate);
        console.log(dateString)

        if (!acc[dateString]) acc[dateString] = [];
        acc[dateString].push(game);
        return acc;
      }, {});

      // Convert to array format for SectionList
      const sectionsData = Object.entries(groupedGames).map(([date, data]) => ({
        title: date,
        data: data
      }));

      setGames(sectionsData);
    }
  };

  const openModal = (game) => {
    if (!game.is_finished) {
      setCurrentGame(game);
      setTeam1Score(game.scores[0].team1_score.toString());
      setTeam2Score(game.scores[0].team2_score.toString());
      setModalVisible(true);
    }
  };

  const handleUpdateScore = async () => {
    if (currentGame) {
      const { error } = await supabase
        .from('scores')
        .update({
          team1_score: parseInt(team1Score),
          team2_score: parseInt(team2Score)
        })
        .eq('game_id', currentGame.id);

      if (error) {
        console.error('Error updating score:', error);
      } else {
        setModalVisible(false);
        fetchGames(profile.team_id);
      }
    }
  };

  const GameCard = ({ game, openModal }) => (
    <Card containerStyle={styles.cardContainer}>
      <View style={styles.timeFieldContainer}>
        <Text style={styles.timeText} maxFontSizeMultiplier={1.2}>{formatTime(game.datetime.time)}</Text>
        <View style={styles.fieldContainer}>
          <Icon name="location" type="ionicon" size={12} color="#8F8DAA" />
          <Text style={styles.fieldText}>Field {game.field?.name}</Text>
        </View>
      </View>
      <View style={styles.teamContainer}>
        <Avatar rounded size={40} avatarStyle={{ borderWidth: 1, borderColor: '#000' }} source={{ uri: game.team1.avatar_uri }} />
        <Text style={styles.teamName} maxFontSizeMultiplier={1.2}>{game.team1?.name}</Text>
        <Text style={styles.scoreText} maxFontSizeMultiplier={1.2}>{game.scores[0].team1_score}</Text>
      </View>
      <View style={styles.vsContainer}>
        <Text style={styles.vsText} maxFontSizeMultiplier={1.2}>vs</Text>
        <View style={styles.vsLine} />
      </View>
      <View style={styles.teamContainer}>
        <Avatar rounded size={40} avatarStyle={{ borderWidth: 1, borderColor: '#000' }} source={{ uri: game.team2.avatar_uri }} />
        <Text style={styles.teamName} maxFontSizeMultiplier={1.2}>{game.team2?.name}</Text>
        <Text style={styles.scoreText} maxFontSizeMultiplier={1.2}>{game.scores[0].team2_score}</Text>
      </View>

      {game.scores[0].is_finished ? (
        <TouchableOpacity
          style={[styles.updateButton, game.is_finished && styles.disabledButton]}
          onPress={() => openModal(game)}
          disabled={game.scores[0].is_finished}
        >
          <Text maxFontSizeMultiplier={1.2} style={[styles.updateButtonText, game.scores[0].is_finished && styles.disabledButtonText]}>
            Game Finished
          </Text>
          <Ionicons name='checkmark-circle' size={15} color='#8F8DAA' />
        </TouchableOpacity>
      ) : profile?.is_team_captain && !game.scores[0].is_finished ? (
        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => openModal(game)}
        >
          <Text maxFontSizeMultiplier={1.2} style={styles.updateButtonText}>Update Score</Text>
          <Ionicons name='create' size={15} color='#2871FF' />
        </TouchableOpacity>
      ) : (<></>)}
    </Card>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeaderContainer}>
      <Ionicons name="calendar-clear" size={24} color="#EA1D25" />
      <Text style={styles.sectionHeader} maxFontSizeMultiplier={1}>{title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomHeader title='My Games' route='home' />
      {profile && profile.team_id ? (
        <SectionList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#EA1D25']}
            />
          }
          sections={games}
          keyExtractor={(item, index) => item.id.toString() + index}
          renderItem={({ item }) => (
            <GameCard game={item} openModal={openModal} />
          )}
          renderSectionHeader={renderSectionHeader}
        />
      ) : (
        <Placeholder />
      )}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle} maxFontSizeMultiplier={1.1}>Update Score</Text>
            <Text style={styles.modalSubtitle} maxFontSizeMultiplier={1.1}>If needed, please check with the other team if there are any score discrepancies before submitting.</Text>
            <View style={styles.scoreInputContainer}>
              <Text style={styles.teamNameScoreInput} maxFontSizeMultiplier={1.1}>{currentGame?.team1.name}</Text>
              <TextInput
                style={styles.scoreInput}
                value={team1Score}
                onChangeText={setTeam1Score}
                keyboardType="numeric"
                maxLength={2}
              />
            </View>
            <View style={styles.scoreInputContainer}>
              <Text style={styles.teamNameScoreInput} maxFontSizeMultiplier={1.1}>{currentGame?.team2.name}</Text>
              <TextInput
                style={styles.scoreInput}
                value={team2Score}
                onChangeText={setTeam2Score}
                keyboardType="numeric"
                maxLength={2}
              />
            </View>
            <TouchableOpacity style={styles.updateScoreButton} onPress={handleUpdateScore}>
              <Text style={styles.buttonText} maxFontSizeMultiplier={1.1}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText} maxFontSizeMultiplier={1.1}>Close</Text>
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
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledButtonText: {
    color: '#888',
    textDecorationLine: 'none',
  },
  sectionHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginBottom: 12,
    marginTop: 12,
    backgroundColor: '#FFF0F0',
  },
  sectionHeader: {
    fontFamily: 'Outfit-Bold',
    fontSize: ms(20),
    color: '#EA1D25',
    marginLeft: 10,
  },
  cardContainer: {
    borderRadius: 12,
    marginTop: 0,
    marginHorizontal: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  timeFieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  timeText: {
    fontFamily: 'Outfit-Regular',
    fontSize: ms(14),
    color: '#8F8DAA',
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fieldText: {
    fontFamily: 'Outfit-Regular',
    fontSize: ms(14),
    color: '#8F8DAA',
    marginLeft: 5,
  },
  teamContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 0,
  },
  teamName: {
    fontFamily: 'Outfit-Bold',
    fontSize: ms(16),
    color: '#333243',
    flex: 1,
    marginLeft: 10,
  },
  scoreText: {
    fontFamily: 'Outfit-Bold',
    fontSize: ms(18),
    color: '#333243',
  },
  vsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    marginLeft: 50
  },
  vsText: {
    fontFamily: 'Outfit-Regular',
    fontSize: ms(14),
    color: '#BAB8CB',
    marginRight: 10,
    marginBottom: 3
  },
  vsLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#BAB8CB',
  },
  updateButton: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  updateButtonText: {
    fontFamily: 'Outfit-Regular',
    fontSize: ms(15),
    color: '#2871FF',
    textDecorationLine: 'underline',
    marginRight: 5,
    marginBottom: 1
  },
  disabledButton: {
    opacity: 0.5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    width: '80%',
  },
  modalTitle: {
    fontSize: ms(20),
    fontFamily: 'Outfit-Bold',
    marginBottom: 4
  },
  modalSubtitle: {
    fontFamily: 'Outfit-Regular',
    fontSize: ms(14)
  },
  scoreInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8
  },
  teamNameScoreInput: {
    fontFamily: 'Outfit-Regular',
    fontSize: ms(16)
  },
  scoreInput: {
    width: 50,
    borderWidth: 1,
    borderColor: '#333243',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    textAlign: 'center',
    fontFamily: 'Outfit-Regular',
    fontSize: ms(16)
  },
  updateScoreButton: {
    backgroundColor: '#6ECC34',
    padding: 10,
    borderRadius: 100,
    marginTop: 12
  },
  closeButton: {
    backgroundColor: '#EA1D25',
    padding: 10,
    borderRadius: 100,
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Outfit-Bold',
    textAlign: 'center',
    fontSize: ms(16)
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
    fontSize: ms(18),
    color: '#333243',
    textAlign: 'center',
    marginBottom: 10,
  },
  placeholderSubText: {
    fontFamily: 'Outfit-Regular',
    fontSize: ms(16),
    color: '#8F8DAA',
    textAlign: 'center',
  },
});

export default MyGamesScreen;