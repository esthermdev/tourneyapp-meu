import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import CustomHeader from '../../../components/CustomHeader';
import { ms } from 'react-native-size-matters';

const EmergencyScreen = () => {
  return (
    <View style={styles.container}>
      <CustomHeader title='Emergency' route='info' />
      <ScrollView
        style={styles.scrollview}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.content}>
          <Text style={styles.contentHeader}>Medical{'\n\n'}</Text>
          <Text style={styles.contentHeader}>Weather</Text>
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
    fontSize: ms(18),
    color: '#333',
  },
  contentHeader: {
    fontFamily: 'Outfit-Bold',
    fontSize: ms(20),
    color: '#333',
  },
  contentSubHeader: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: ms(18),
    color: '#333',
  }
});

export default EmergencyScreen;