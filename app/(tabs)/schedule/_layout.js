import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

const GamesSchedule = () => {

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Schedule</Text>
      </View>
      <Stack>
        <Stack.Screen name='index' options={{headerShown: false}}/>
        <Stack.Screen name='open' options={{headerShown: false}}/>
        <Stack.Screen name='women' options={{headerShown: false}}/>
        <Stack.Screen name='mixed' options={{headerShown: false}}/>
      </Stack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  headerContainer: {
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  }, 
  header: {
    fontFamily: 'Outfit-Bold',
    fontSize: 35,
    color: '#EA1D25'
  },
});

export default GamesSchedule;
