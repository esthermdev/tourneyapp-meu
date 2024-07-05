import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Round4 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Round 4</Text>
      {/* Your content for Round 4 */}
    </View>
  );
};

export default Round4;

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
