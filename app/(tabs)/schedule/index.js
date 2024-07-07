import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const ScheduleByDivision = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Schedule by Division</Text>
      <Button title='Open' onPress={() => router.push('schedule/open')} />
      <Button title='Women' onPress={() => router.push('schedule/women')} />
      <Button title='Mixed' onPress={() => router.push('schedule/mixed')} />
    </View>
  );
};

export default ScheduleByDivision;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});
