import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { supabase } from '../utils/supabase';
import { Card } from '@rneui/base';
import { formatTime } from '../utils/formatTime';
import { FlatList } from 'react-native-gesture-handler';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const UpdateScoresComponent = ({ roundId, poolId, title, division }) => {
	const [games, setGames] = useState([]);
	const [isModalVisible, setModalVisible] = useState(false);
	const [currentGame, setCurrentGame] = useState(null);
	const [team1Score, setTeam1Score] = useState('');
	const [team2Score, setTeam2Score] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getGames();
		setupRealtimeListeners();
	}, []);

	const getGames = async () => {
		setIsLoading(true);
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
          team2_score,
					is_finished
        ),
        field: field_id (
          name
        )
      `)
			.eq('division', division)

		if (roundId) {
			query = query.eq('round_id', roundId)
		} else if (poolId) {
			query = query.eq('pool_id', poolId).order('id');
		}

		const { data, error } = await query;

		if (error) {
			console.error('Error fetching games:', error);
		} else {
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
					setGames(prevGames => prevGames.map(game =>
						game.id === updatedGameId
							? { ...game, scores: [{ ...game.scores[0], ...payload.new }] }
							: game
					));
				}
			)
			.subscribe();

		return () => {
			supabase.removeChannel(subscription);
		}
	}

	const openModal = (game) => {
		setCurrentGame(game);
		setTeam1Score(game.scores[0]?.team1_score?.toString() || '0');
		setTeam2Score(game.scores[0]?.team2_score?.toString() || '0');
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
				getGames();
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
				getGames();
			}
		}
	}

	const handleMarkAllAsFinished = async () => {
		Alert.alert(
			"Mark All Games as Finished",
			`Are you sure you want to mark all games as finished for ${poolId ? 'this pool' : 'this round'}?`,
			[
				{
					text: "Cancel",
					style: "cancel"
				},
				{
					text: "Yes, Mark All as Finished",
					onPress: async () => {
						try {
							// Step 1: Fetch game IDs
							let { data: gameIds, error: fetchError } = await supabase
								.from('games')
								.select('id')
								.eq(poolId ? 'pool_id' : 'round_id', poolId || roundId);

							if (fetchError) throw fetchError;

							if (!gameIds || gameIds.length === 0) {
								Alert.alert('Info', 'No games found to update.');
								return;
							}

							// Extract just the IDs
							const ids = gameIds.map(game => game.id);

							// Step 2: Update scores for these games
							const { data, error: updateError } = await supabase
								.from('scores')
								.update({ is_finished: true })
								.in('game_id', ids);

							if (updateError) throw updateError;

							Alert.alert('Success', 'All games marked as finished');
							getGames();
						} catch (error) {
							console.error('Error marking all games as finished:', error);
							Alert.alert('Error', 'Failed to mark all games as finished');
						}
					}
				}
			]
		);
	};

	const handleResetAllPoolPlayGames = async () => {
		Alert.alert(
			"Reset All Games",
			`Are you sure you want to reset all scores to 0 and mark all games as unfinished for ${title}?`,
			[
				{
					text: "Cancel",
					style: "cancel"
				},
				{
					text: "Yes, Reset All",
					onPress: async () => {
						const { error } = await supabase
							.rpc('reset_pool_scores', { pool_id_param: poolId });

						if (error) {
							console.error('Error resetting games:', error);
							Alert.alert('Error', 'Failed to reset games');
						} else {
							Alert.alert('Success', `All ${title} games have been reset`);
							getGames();
						}
					}
				}
			]
		);
	}

	const handleResetAllBracketGames = async () => {
		Alert.alert(
			"Reset All Games",
			`Are you sure you want to reset all scores to 0 and mark all games as unfinished for ${title}?`,
			[
				{
					text: "Cancel",
					style: "cancel"
				},
				{
					text: "Yes, Reset All",
					onPress: async () => {
						const { error } = await supabase
							.rpc('reset_bracket_scores', { round_id_param: roundId });

						if (error) {
							console.error('Error resetting games:', error);
							Alert.alert('Error', 'Failed to reset games');
						} else {
							Alert.alert('Success', `All ${title} games have been reset`);
							getGames();
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
					<Text style={styles.teamName} maxFontSizeMultiplier={1.1}>{item.team1?.name}</Text>
					<Text style={styles.scoreText} maxFontSizeMultiplier={1.1}>{item.scores[0]?.team1_score || '0'}</Text>
				</View>
				<View style={styles.teamsContainer}>
					<Text style={styles.teamName} maxFontSizeMultiplier={1.1}>{item.team2?.name}</Text>
					<Text style={styles.scoreText} maxFontSizeMultiplier={1.1}>{item.scores[0]?.team2_score || '0'}</Text>
				</View>
			</View>
			<View style={styles.cardFooter}>
				<Text style={styles.fieldText} maxFontSizeMultiplier={1.1}>{formatTime(item.datetime?.time)} - Wainright {item.field?.name || 'Number'}</Text>
				<Text style={styles.statusText} maxFontSizeMultiplier={1.1}>{item.scores[0]?.is_finished ? 'Final' : 'In Progress'}</Text>
				<TouchableOpacity onPress={() => openModal(item)}>
					<MaterialIcons name="edit-square" size={24} color="#EA1D25" />
				</TouchableOpacity>
			</View>
		</Card>
	);

	const renderPlaceholder = () => (
		<View style={styles.placeholderContainer}>
			<Text style={styles.placeholderText}>
				{title} will be available after previous games are completed.
			</Text>
			<Text style={styles.placeholderSubText}>
				Please check back later when all previous games are finished.
			</Text>
		</View>
	);

	return (
		<View style={styles.container}>
			{isLoading ? (
				<Text style={styles.loadingText}>Loading...</Text>
			) : games.length > 0 ? (
				<>
					<FlatList
						data={games}
						keyExtractor={(item) => item.id.toString()}
						renderItem={renderItem}
						estimatedItemSize={200}
						contentContainerStyle={styles.listContentContainer}
					/>
					{poolId || roundId ? (
						<>
							<TouchableOpacity style={styles.resetButton} onPress={poolId ? handleResetAllPoolPlayGames : handleResetAllBracketGames}>
								<Text style={styles.buttonText}>Reset All Games</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.allFinishButton} onPress={handleMarkAllAsFinished}>
								<Text style={styles.buttonText}>Mark All Games as Finished</Text>
							</TouchableOpacity>
						</>
					) : null}
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
						<Text maxFontSizeMultiplier={1.1} style={styles.modalTitle}>Update Score</Text>
						{currentGame && (
							<>
								<View style={styles.modalTeamContainer}>
									<Text maxFontSizeMultiplier={1.2} style={styles.modalTeamName}>{currentGame.team1.name}</Text>
									<TextInput
										style={styles.scoreInput}
										value={team1Score}
										onChangeText={setTeam1Score}
										keyboardType='numeric'
										maxLength={2}
									/>
								</View>
								<View style={styles.modalTeamContainer}>
									<Text maxFontSizeMultiplier={1.2} style={styles.modalTeamName}>{currentGame.team2.name}</Text>
									<TextInput
										style={styles.scoreInput}
										value={team2Score}
										onChangeText={setTeam2Score}
										keyboardType='numeric'
										maxLength={2}
									/>
								</View>
							</>
						)}
						<TouchableOpacity
							style={styles.submitButton}
							onPress={handleUpdateScore}
						>
							<Text style={styles.buttonText}>Update Score</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.finishButton}
							onPress={handleMarkAsFinished}
						>
							<Text style={styles.buttonText}>Mark as Finished</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.closeButton}
							onPress={() => setModalVisible(false)}
						>
							<Text style={styles.buttonText}>Close</Text>
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
		backgroundColor: '#333243',
	},
	listContentContainer: {
		padding: 10,
		paddingBottom: 120,
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
	allFinishButton: {
		backgroundColor: '#4CAF50',
		padding: 10,
		borderRadius: 5,
		marginHorizontal: 25,
		marginTop: 10,
		marginBottom: 15,
		alignItems: 'center',
	},
	resetButton: {
		backgroundColor: '#FF6347',
		padding: 10,
		borderRadius: 5,
		marginHorizontal: 25,
		marginTop: 10,
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
		textAlign: 'center',
		marginBottom: 17
	},
	modalTeamContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 8
	},
	modalTeamName: {
		flex: 1,
		marginLeft: 10,
		fontFamily: 'Outfit-Bold',
		fontSize: 16,
	},
	scoreInput: {
		borderWidth: 0.5,
		borderRadius: 8,
		paddingVertical: 8,
		paddingHorizontal: 12,
		width: 48,
		textAlign: 'center',
		fontFamily: 'Outfit-Regular',
		fontSize: 16,
	},
	submitButton: {
		backgroundColor: '#6ECC34',
		padding: 10,
		borderRadius: 100,
		alignItems: 'center',
		marginTop: 9
	},
	finishButton: {
		backgroundColor: '#2871FF',
		padding: 10,
		borderRadius: 100,
		marginTop: 8,
		alignItems: 'center',
	},
	closeButton: {
		backgroundColor: '#EA1D25',
		padding: 10,
		borderRadius: 100,
		marginTop: 8,
		alignItems: 'center',
	},
});

export default UpdateScoresComponent;