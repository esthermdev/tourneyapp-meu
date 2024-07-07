import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Round3 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Round3</Text>
      {/* Your content for SemiFinals */}
    </View>
  );
};

export default Round3;

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
