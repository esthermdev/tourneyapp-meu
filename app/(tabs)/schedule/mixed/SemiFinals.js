import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SemiFinals = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SemiFinals</Text>
      {/* Your content for SemiFinals */}
    </View>
  );
};

export default SemiFinals;

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
