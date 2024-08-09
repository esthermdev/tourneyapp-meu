// components/MixedScheduleList.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

const scheduleOptions = [
  { title: 'Pool Play', route: 'pool-play', icon: 'play-outline' },
  { title: 'Championship Bracket', route: 'championship-bracket', icon: 'trophy-outline' },
  { title: '3rd Place', route: '3rd-place', icon: 'medal-outline' },
  { title: '5th Place Bracket', route: '5th-place-bracket', icon: 'ribbon-outline' },
  { title: '7th Place', route: '7th-place', icon: 'ribbon-outline' },
  { title: '9th Place Bracket', route: '9th-place-bracket', icon: 'ribbon-outline' },
];

const MixedScheduleList = () => {
  const router = useRouter();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.optionButton}
      onPress={() => router.push(`/schedule/mixed/${item.route}`)}
      activeOpacity={0.6}
    >
      <Ionicons name={item.icon} size={24} color="#EA1D25" style={styles.icon} />
      <Text style={styles.optionButtonText}>{item.title}</Text>
      <Ionicons name="chevron-forward-outline" size={24} color="#EA1D25" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={scheduleOptions}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  icon: {
    marginRight: 15,
  },
  optionButtonText: {
    flex: 1,
    fontSize: 18,
    color: '#333',
    fontFamily: 'Outfit-SemiBold',
  },
});

export default MixedScheduleList;