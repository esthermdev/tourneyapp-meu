import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { supabase } from '../../../../utils/supabase';
import { FlashList } from '@shopify/flash-list';
import { Card, Avatar, Icon } from '@rneui/base';

const Quarters = () => {

  const renderPlaceholder = () => (
    <View style={styles.placeholderContainer}>
      <Icon
        type='ionicon'
        name='time-outline'
        size={60}
        color='#EA1D25'
      />
      <Text style={styles.placeholderTitle}>Quarter Finals Coming Soon!</Text>
      <Text style={styles.placeholderText}>
        Quarter Final matchups will be available here once Pool Play is completed.
      </Text>
      <Text style={styles.placeholderText}>
        Stay tuned for exciting knockout stage action!
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
        {renderPlaceholder()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#D9D9D9',
  },
  timeContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5
  }, 
  time: {
    textAlign: 'center',
    fontFamily: 'Outfit-Bold',
    fontSize: 20,
    color: '#EA1D25'
  },
  cardContainer: {
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#CBCAD8',
    padding: 24,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationIcon: {
    marginRight: 3,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'top',
  },
  teamContainer: {
    flex: 1,
    alignItems: 'center',
  },
  avatarContainer: {
    borderColor: '#EA1D25',
    borderWidth: 1,
    marginBottom: 5,
  },
  teamName: {
    textAlign: 'center',
    fontFamily: 'Outfit-Bold',
    fontSize: 14,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12
  },
  score: {
    fontSize: 40,
    fontFamily: 'Outfit-Medium',
  },
  colon: {
    fontSize: 40,
    marginHorizontal: 10,
    marginBottom: 8,
    fontFamily: 'Outfit-Medium',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  placeholderTitle: {
    fontFamily: 'Outfit-Bold',
    fontSize: 24,
    color: '#EA1D25',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  placeholderText: {
    fontFamily: 'Outfit-Regular',
    fontSize: 16,
    color: '#8F8DAA',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default Quarters;