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
					All games are 80-minute games to 15; 2 TO/half.
					All games are soft capped (highest score plus 1) at 80 minutes and hard capped at 90 minutes.
					A point begins as soon as a goal is scored.
					The caps do NOT affect timeouts.
					{'\n\n'}
					<Text style={styles.contentHeader}>Spirit of the Game</Text>
					{'\n'}
					Here is the spirit info for Lobster Pot. Please assign a spirit captain to complete score reporting.
					{'\n\n'}
					<Link className='text-blue-600 font-outfitmedium' href='https://docs.google.com/forms/d/15NrrAtvd2mt_RGdpkTYDTYHGXHP0RTiIJEI0GXFwfp4/viewform?edit_requested=true'>Please report your spirit score using this link!</Link>
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