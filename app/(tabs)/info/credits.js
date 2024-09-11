import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import CustomHeader from '../../../components/CustomHeader';
import { Link } from 'expo-router';

const RulesAndSOTG = () => {
  return (
    <View style={styles.container}>
      <CustomHeader title='Credits' />
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
    fontSize: 18,
    color: '#333',
  },
  contentHeader: {
    fontFamily: 'Outfit-Bold',
    fontSize: 20,
    color: '#333',
  },
  contentSubHeader: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 18,
    color: '#333',
  },
  linkStyle: {
    textDecorationLine: 'underline',
    color: 'blue'
  }
});

export default RulesAndSOTG;