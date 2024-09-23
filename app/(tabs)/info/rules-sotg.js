import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import CustomHeader from '../../../components/CustomHeader';
import { Link } from 'expo-router';
import { ms } from 'react-native-size-matters';

const RulesAndSOTG = () => {
	return (
		<View style={styles.container}>
			<CustomHeader title='Rules' route='info' />
			<ScrollView
				style={styles.scrollview}
				contentContainerStyle={styles.contentContainer}
			>
				<Text style={styles.content}>
					<Text style={styles.contentHeader}>Game Rules{'\n'}</Text>
					All pools play 75-minute games to 15; 2 TO/half. 10min half-time unless otherwise discussed between captains.{'\n\n'}
					All games are hard capped. Hard cap means the team leading at the end of the current point when time is up, wins the game.{'\n\n'}
					If the teams are tied at the end of the point, play one more (universe) point.  A point begins as soon as a goal is scored.{'\n\n'}
					The hard cap does NOT affect timeouts.
					{'\n\n'}
					<Text style={styles.contentHeader}>Spirit of the Game</Text>
					{'\n'}
					Here is the spirit info for Lobster Pot. Please assign a spirit captain to complete score reporting.
					{'\n\n'}
					<Link className='text-blue-600 font-outfitmedium' href='https://docs.google.com/forms/d/16wUJRxu9JUVHVqNXIyrWex935ywue45AmLqrrgNjgtE/edit'>Please report your spirit score using this link!</Link>
					{'\n\n'}
					Here are some fun spirited activities for the weekend:
					{'\n'}
					- Please stop by the photobooth for a team picture!
					{'\n'}
					- Keep an eye out on instagram for the Lobster Pot Bucket List (new this year!) Try and complete the bucket list and tag @meultimate
				</Text>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	contentContainer: {
		padding: 15
	},
	content: {
		fontFamily: 'Outfit-Regular',
		fontSize: ms(16),
		color: '#333',
	},
	contentHeader: {
		fontFamily: 'Outfit-Bold',
		fontSize: ms(18),
		color: '#333',
	},
	contentSubHeader: {
		fontFamily: 'Outfit-SemiBold',
		fontSize: ms(16),
		color: '#333',
	}
});

export default RulesAndSOTG;