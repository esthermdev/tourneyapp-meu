import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DivisionButton from '../../../buttons/DivisionButton';
import { ScrollView } from 'react-native-gesture-handler';


const StandingsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Standings</Text>
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.buttonContainer}>
          <DivisionButton
            title='Men - Upper'
            route='standings/men_upper'
            color='#2871FF'
            disabled={false}
            icon='ranking-star'
          />
          <DivisionButton
            title='Men - Middle'
            route='standings/men_lower'
            color='#0AB359'
            disabled={true}
            icon='ranking-star'
          />
          <DivisionButton
            title='Men - Lower'
            route='standings/men_middle'
            color='#F2A541'
            disabled={true}
            icon='ranking-star'
          />
          <DivisionButton
            title='Women - Upper'
            route='standings/women_upper'
            color='#FF026C'
            disabled={true}
            icon='ranking-star'
          />
          <DivisionButton
            title='Women - Lower'
            route='standings/women_lower'
            color='#BD41F2'
            disabled={true}
            icon='ranking-star'
          />
          <DivisionButton
            title='Mixed'
            route='standings/mixed'
            color='#FF7429'
            disabled={true}
            icon='ranking-star'
          />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  header: {
    fontFamily: 'Outfit-Bold',
    fontSize: 35,
    color: '#EA1D25'
  },
  buttonContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    gap: 15,  // Changed from 'center'
    justifyContent: 'center',  // Changed from 'center'
    padding: 25,
    paddingBottom: 50,  // Add some extra padding at the bottom
  },
});

export default StandingsScreen;