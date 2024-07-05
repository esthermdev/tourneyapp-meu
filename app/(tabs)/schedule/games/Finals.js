import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Finals = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Finals</Text>
      {/* Your content for Finals3 */}
    </View>
  );
};

export default Finals;

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
