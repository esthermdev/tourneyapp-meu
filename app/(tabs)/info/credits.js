import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import CustomHeader from '../../../components/CustomHeader';
import { Link } from 'expo-router';
import { ms } from 'react-native-size-matters';

const RulesAndSOTG = () => {
  return (
    <View style={styles.container}>
      <CustomHeader title='Credits' route='info' />
      <ScrollView
        style={styles.scrollview}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.content}>
          This app was developed by <Link href='https://www.linkedin.com/in/esther-devadas-6ab90a20b/' style={styles.linkStyle}>Esther Devadas</Link>.
          Design credits go to Deborah Devadas.
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
  },
  linkStyle: {
    textDecorationLine: 'underline',
    color: 'blue'
  }
});

export default RulesAndSOTG;