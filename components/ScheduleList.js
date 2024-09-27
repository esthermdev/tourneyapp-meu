// components/ScheduleList.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { ms } from 'react-native-size-matters';
import { divisionScheduleConfig } from '../utils/divisionScheduleConfig';

const ScheduleList = ({ division }) => {
  const router = useRouter();
  const config = divisionScheduleConfig[division];

  if (!config) {
    return null; // or some error component
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.optionButton, { backgroundColor: item.bgColor }]}
      onPress={() => router.push({
        pathname: `schedule/${division}/${item.route}`,
        params: {
          code: item.code,
        }
      })}
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
        data={config.scheduleOptions}
        renderItem={renderItem}
        keyExtractor={(item) => item.route}
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