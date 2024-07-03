import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Round1 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Round 1</Text>
      {/* Your content for Round 1 */}
    </View>
  );
};

export default Round1;

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
