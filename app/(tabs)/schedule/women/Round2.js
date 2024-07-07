import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Round2 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Round2</Text>
      {/* Your content for SemiFinals */}
    </View>
  );
};

export default Round2;

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
