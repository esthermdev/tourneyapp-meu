import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Card } from '@rneui/base';
import { supabase } from '../../../utils/supabase';

const MixedStandings = () => {
  const [poolAStandings, setPoolAStandings] = useState([]);
  const [poolBStandings, setPoolBStandings] = useState([]);
  const [poolCStandings, setPoolCStandings] = useState([]);
  const [poolDStandings, setPoolDStandings] = useState([]);

  useEffect(() => {
    fetchStandings();
  }, []);

  const fetchStandings = async () => {
    const { data, error } = await supabase
      .from('rankings')
      .select(`
        wins,
        losses,
        team_id,
        pool_rank,
        teams (name, pool_id, seed)
      `)
      .order('pool_rank')

    if (error) {
      console.error('Error fetching teams:', error);
    } else {
      separateStandingsByPool(data);
    }
  };

  const separateStandingsByPool = (data) => {
    setPoolAStandings(data.filter(team => team.teams.pool_id === 7));
    setPoolBStandings(data.filter(team => team.teams.pool_id === 8));
    setPoolCStandings(data.filter(team => team.teams.pool_id === 9));
    setPoolDStandings(data.filter(team => team.teams.pool_id === 10));
  };

  const renderStandings = (standings, poolName) => (
    <Card containerStyle={styles.poolCard}>
      <View style={styles.poolHeaderContainer}>
        <Text style={styles.poolHeader}>Pool {poolName}</Text>
        <Text style={styles.wlHeader}>W–L</Text>
      </View>
      <Card.Divider />
      {standings.map((team, i) => (
        <View key={i} style={styles.teamRow}>
          <Text style={styles.teamName}>{team.teams.name} ({team.teams.seed})</Text>
          <Text style={styles.recordText}>{team.wins}–{team.losses}</Text>
        </View>
      ))}
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Mixed</Text>
      </View>
      <ScrollView style={styles.standingsContainer}>
        {renderStandings(poolAStandings, 'A')}
        {renderStandings(poolBStandings, 'B')}
        {renderStandings(poolCStandings, 'C')}
        {renderStandings(poolDStandings, 'D')}
      </ScrollView>
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
  standingsContainer: {
    flex: 1,
    padding: 10,
  },
  poolCard: {
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  poolHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  poolHeader: {
    fontFamily: 'Outfit-Bold',
    fontSize: 24,
    color: '#EA1D25',
  },
  wlHeader: {
    fontFamily: 'Outfit-Bold',
    fontSize: 18,
    color: '#EA1D25',
  },
  teamRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  teamName: {
    fontFamily: 'Outfit-Medium',
    fontSize: 16,
    color: '#333243',
    flex: 1,
  },
  recordText: {
    fontFamily: 'Outfit-Regular',
    fontSize: 16,
    color: '#333243',
    width: 50,
    textAlign: 'right',
  },
});

export default MixedStandings;