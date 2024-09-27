import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DivisionButton from '../../../buttons/DivisionButton';
import { ScrollView } from 'react-native-gesture-handler';
import { ms } from 'react-native-size-matters';
import { divisionScheduleConfig } from '../../../utils/divisionScheduleConfig';

const ScheduleScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header} maxFontSizeMultiplier={1}>Schedule</Text>
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.buttonContainer}>
          {Object.entries(divisionScheduleConfig).map(([key, division]) => (
            <DivisionButton
              key={key}
              title={division.title}
              route={`/schedule/${key}`}
              color={division.color}
              icon={division.icon}
              disabled={division.disabled}
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

export default ScheduleScreen;