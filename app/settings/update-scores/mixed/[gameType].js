import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import UpdateScoresComponent from '../../../../components/UpdateScoresComponent';

const DynamicGameScreen = () => {
	const { gameType, poolId, roundId } = useLocalSearchParams();

	const getTitle = () => {
		if (gameType === 'pool') {
			return `Pool ${String.fromCharCode(65 + parseInt(poolId) - 7)} Games`;
		}
		const bracketTitles = {
			2: 'Crossovers',
			3: 'Quarter Finals',
			4: 'Semi Finals',
			5: 'Finals',
			6: '3rd Place Games',
		};
		return bracketTitles[roundId] || 'Games';
	};

	return (
		<UpdateScoresComponent
			poolId={gameType === 'pool' ? parseInt(poolId) : undefined}
			roundId={gameType === 'bracket' ? roundId : undefined}
			title={getTitle()}
			division='X'
		/>
	);
};

export default DynamicGameScreen;