import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomHeader from '../../../components/CustomHeader';
import { ms } from 'react-native-size-matters';

const RefundPolicyScreen = () => {
	return (
		<View style={styles.container}>
			<CustomHeader title='Refund Policy' route='info' />
			<ScrollView
				style={styles.scrollview}
				contentContainerStyle={styles.contentContainer}
			>
				<Text style={styles.contentHeader}>Tournament Refund Policy</Text>
				<Text style={styles.content}>
					• A 50% refund will be issued if cancellation is made 2 weeks or more before tournament date, unless a replacement team is secured.
					{'\n\n'}
					• No refund will be issued if cancellation is made less than 2 weeks before tournament date.
				</Text>

				<Text style={styles.contentHeader}>What If The Tournament Is Cancelled or Shortened?</Text>
				<Text style={styles.content}>
					There are various reasons that may cause Maine Ultimate to cancel an event. Factors influencing refunds include, but are not limited to, the timing of event cancellation, the cause(s) of cancellation, the ability of the Maine Ultimate to recover event expenses, and the scope of the cancellation. Maine Ultimate will assess their financial obligations on a case by case basis and determine refunds at that time.
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
	scrollview: {
		flex: 1,
	},
	contentContainer: {
		padding: 15,
	},
	contentHeader: {
		fontFamily: 'Outfit-Bold',
		fontSize: ms(20),
		color: '#EA1D25',
		marginBottom: ms(10),
		marginTop: ms(15),
	},
	content: {
		fontFamily: 'Outfit-Regular',
		fontSize: ms(16),
		color: '#333',
		lineHeight: ms(22),
	},
});

export default RefundPolicyScreen;