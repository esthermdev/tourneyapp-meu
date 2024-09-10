import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import CustomAdminHeader from '../../../../components/CustomAdminHeader';
import { SafeAreaView } from 'react-native-safe-area-context';

const AdminScoresIndex = () => {
  const gameTypes = [
    { title: 'Pool A', params: { gameType: 'pool', poolId: 7 } },
    { title: 'Pool B', params: { gameType: 'pool', poolId: 8 } },
    { title: 'Pool C', params: { gameType: 'pool', poolId: 9 } },
    { title: 'Pool D', params: { gameType: 'pool', poolId: 10 } },
    { title: 'Crossovers', params: { gameType: 'bracket', roundId: 2 } },
    { title: 'Quarters', params: { gameType: 'bracket', roundId: 3 } },
    { title: 'Semi Finals', params: { gameType: 'bracket', roundId: 4 } },
    { title: 'Finals', params: { gameType: 'bracket', roundId: 5 } },
    { title: '3rd Place', params: { gameType: 'bracket', roundId: 6 } },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <CustomAdminHeader title="Update Scores" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {gameTypes.map((game, index) => (
          <Link key={index} href={{ pathname: "/settings/update-scores/mixed/[gameType]", params: game.params }} asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>{game.title}</Text>
            </TouchableOpacity>
          </Link>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    padding: 20,
  },
  button: {
    backgroundColor: '#EA1D25',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Outfit-Bold',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default AdminScoresIndex;