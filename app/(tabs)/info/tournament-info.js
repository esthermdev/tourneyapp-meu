import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomHeader from '../../../components/CustomHeader';
import { ms } from 'react-native-size-matters';

const TournamentInfo = () => {
	return (
		<View style={styles.container}>
			<CustomHeader title='Tournament Info' route='info' />
			<ScrollView
				style={styles.scrollview}
				contentContainerStyle={styles.contentContainer}
			>
				<Text style={styles.content}><Text className='font-outfitbold text-primary'>Maine Ultimate</Text> in conjunction with the City of South Portland and Tyler Technologies is looking to host the 	Lobster Pot on October 18/19 at the Wainwright Fields in South Portland, Maine.
					{'\n\n'}
					The Lobster Pot hopes to have  3 college men's divisions this year.  Upper, Lower and Developmental, 2 college women's divisions, upper and lower and a college mixed division. Each division will be playing for $1000, with $1000 being paid out to the first place winner. Cost per team is $600 If your program has a second team, the cost for that team is $400.
					{'\n\n'}
					Think your team is traveling the farthest? Let us know and if it’s true, you’ll get in for free!
				</Text>
				<Text style={styles.contentHeader}>{'\n'}Here is what you get:{'\n'}</Text>
				<Text style={styles.content}>
					<Text style={styles.contentSubHeader}>2 days of some really good ultimate!</Text>
					{'\n\n'}
					<Text style={styles.contentSubHeader}>Trainers{'\n\n'}</Text>
					<Text style={styles.contentSubHeader}>Food{'\n'}</Text>
					Tourney Food. The Ghost Energy team will be there all weekend long with samples.  We will also have bananas, apples and granola bars.
					{'\n\n'}
					Multiple Food Trucks: PB&Me, El Rodeo, Eighty8 Donuts
					{'\n\n'}
					<Text style={styles.contentSubHeader}>Accomodation{'\n'}</Text>
					The Alouette Beach and Resort located in Old Orchard and about 20 minutes from the field, is the official hotel of the Lobster Pot.  Right on the Atlantic Ocean.
					{'\n\n'}
					Merchandise tents filled with product from ultimate companies, Lobster Pot branded merchandise, Maine Ultimate branded merchandise, BreakMark, BE Ultimate, Portland Rising and Boston Glory merchandise.
					{'\n\n'}
					The LL Bean Boot is scheduled to make an appearance.
					{'\n\n'}
					Shield Health and Fitness will be there to answer questions, hand out products and swag
					{'\n\n'}
					The Maine Ultimate Livestream crew is back and this year we plan on livestreaming 2 games per round!  Thanks to Revision Energy for supplying all of the power for the weekend.  All Solar!!!
					{'\n\n'}
					We know It's such a long walk!! This year, we are going to have more golf carts to get you to and from the parking lots, to the fields and all over the facility.
					{'\n\n'}
					Did you miss getting your picture taken with Clawdious?  He’s back this year and don’t forget to take a picture in our photo booth.
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

export default TournamentInfo;