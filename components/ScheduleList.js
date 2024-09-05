import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const scheduleOptions = [
  { title: 'Pool Play', route: 'pool-play', icon: 'sun', iconColor: '#2A9D8F', bgColor: '#2A9D8F1A' },
  { title: 'Championship Bracket', route: 'championship-bracket', icon: 'trophy', iconColor: '#CF3A3A', bgColor: '#CF3A3A1A' },
  { title: '3rd Place', route: '3rd-place', icon: 'medal', iconColor: '#FB8B24', bgColor: '#FB8B241A' },
  { title: '5th Place Bracket', route: '5th-place-bracket', icon: 'award', iconColor: '#DC580E', bgColor: '#DC580E1A' },
  { title: '7th Place', route: '7th-place', icon: 'award', iconColor: '#B0A00F', bgColor: '#B0A00F1A' },
  { title: '9th Place Bracket', route: '9th-place-bracket', icon: 'award', iconColor: '#7C8514', bgColor: '#7C85141A' },
];

const ScheduleList = () => {
  const router = useRouter();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.optionButton, { backgroundColor: item.bgColor }]}
      onPress={() => router.push(`/schedule/mixed/${item.route}`)}
      activeOpacity={0.6}
    >
      <FontAwesome6 name={item.icon} size={22} color={item.iconColor} style={styles.icon} />
      <Text style={[styles.optionButtonText, { color: item.iconColor }]}>{item.title}</Text>
      <FontAwesome6 name="chevron-right" size={20} color={item.iconColor} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={scheduleOptions}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 25
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 12,
    borderRadius: 12
  },
  icon: {
    marginRight: 15,
  },
  optionButtonText: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Outfit-SemiBold',
  },
});

export default ScheduleList;