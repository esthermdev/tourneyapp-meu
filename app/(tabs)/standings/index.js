import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DivisionButton from '../../../buttons/DivisionButton';
import { ScrollView } from 'react-native-gesture-handler';
import { ms } from 'react-native-size-matters';

const StandingsScreen = () => {
  const divisions = [
    { title: 'Men - Upper', route: 'men_upper', color: '#2871FF', disabled: false },
    { title: 'Women - Upper', route: 'women_upper', color: '#FF026C', disabled: false },
    { title: 'Men - Middle', route: 'men_middle', color: '#0AB359', disabled: false },
    { title: 'Women - Lower', route: 'women_lower', color: '#BD41F2', disabled: false },
    { title: 'Men - Lower', route: 'men_lower', color: '#F2A541', disabled: false },
    { title: 'Mixed', route: 'mixed', color: '#FF7429', disabled: false },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header} maxFontSizeMultiplier={1}>Standings</Text>
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.buttonContainer}>
          {divisions.map((division, index) => (
            <DivisionButton
              key={index}
              title={division.title}
              route={`standings/${division.route}`}
              color={division.color}
              disabled={division.disabled}
              icon='ranking-star'
            />
          ))}
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
    fontSize: ms(35),
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