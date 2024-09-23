import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DivisionButton from '../../../buttons/DivisionButton';
import { ScrollView } from 'react-native-gesture-handler';
import { ms } from 'react-native-size-matters';

const ScheduleScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header} maxFontSizeMultiplier={1}>Schedule</Text>
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.buttonContainer}>
          <DivisionButton
            title='Men - Upper'
            route='schedule/men_upper'
            color='#2871FF'
            disabled={false}
            icon='people-group'
          />
          <DivisionButton
            title='Men - Middle'
            route='schedule/men_lower'
            color='#0AB359'
            disabled={true}
            icon='people-group'
          />
          <DivisionButton
            title='Men - Lower'
            route='schedule/men_middle'
            color='#F2A541'
            disabled={true}
            icon='people-group'
          />
          <DivisionButton
            title='Women - Upper'
            route='schedule/women_upper'
            color='#FF026C'
            disabled={true}
            icon='people-group'
          />
          <DivisionButton
            title='Women - Lower'
            route='schedule/women_lower'
            color='#BD41F2'
            disabled={true}
            icon='people-group'
          />
          <DivisionButton
            title='Mixed'
            route='schedule/mixed'
            color='#FF7429'
            disabled={true}
            icon='people-group'
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

export default ScheduleScreen;