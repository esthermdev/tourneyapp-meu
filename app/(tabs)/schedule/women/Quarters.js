import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Quarters = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Quarters</Text>
      {/* Your content for SemiFinals */}
    </View>
  );
};

export default Quarters;

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
