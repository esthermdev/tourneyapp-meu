import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { ms } from 'react-native-size-matters';

const scheduleOptions = [
  { title: 'Pool Play', route: 'pool-play', icon: 'sun', iconColor: '#2A9D8F', bgColor: '#2A9D8F1A' },
  { title: 'Championship Bracket', route: 'championship-bracket', icon: 'trophy', iconColor: '#CF3A3A', bgColor: '#CF3A3A1A' },
  { title: '3rd to 7th Place', route: '3-7place', icon: 'medal', iconColor: '#FB8B24', bgColor: '#FB8B241A' },
  { title: '9th Place', route: '9place', icon: 'award', iconColor: '#DC580E', bgColor: '#DC580E1A' },
  { title: '11th to 15th Place', route: '11-15place', icon: 'award', iconColor: '#B0A00F', bgColor: '#B0A00F1A' },
];

const ScheduleList = ({ division }) => {
  const router = useRouter();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.optionButton, { backgroundColor: item.bgColor }]}
      onPress={() => router.push(`/schedule/${division}/${item.route}`)}
      activeOpacity={0.6}
    >
      <FontAwesome6 name={item.icon} size={22} color={item.iconColor} style={styles.icon} />
      <Text style={[styles.optionButtonText, { color: item.iconColor }]} maxFontSizeMultiplier={1}>{item.title}</Text>
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
    fontSize: ms(18),
    fontFamily: 'Outfit-SemiBold',
  },
});

export default ScheduleList;