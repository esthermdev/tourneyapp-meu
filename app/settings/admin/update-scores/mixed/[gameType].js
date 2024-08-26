import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import UpdateScoresComponent from '../../../../../components/UpdateScoresComponent';

const DynamicGameScreen = () => {
	const { gameType, poolId, roundId } = useLocalSearchParams();

	const getTitle = () => {
		if (gameType === 'pool') {
			return `Pool ${String.fromCharCode(65 + parseInt(poolId) - 7)} Games`;
		}
		const bracketTitles = {
			'4': 'Crossovers',
			'5': 'Quarter Finals',
			'6': 'Semi Finals',
			'7': 'Finals',
			'8': '3rd Place Games',
		};
		return bracketTitles[roundId] || 'Games';
	};

	return (
		<UpdateScoresComponent
			poolId={gameType === 'pool' ? parseInt(poolId) : undefined}
			roundId={gameType === 'bracket' ? parseInt(roundId) : undefined}
			title={getTitle()}
		/>
	);
};

export default DynamicGameScreen;