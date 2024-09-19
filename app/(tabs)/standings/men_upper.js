import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native';
import { Card } from '@rneui/base';
import { supabase } from '../../../utils/supabase';
import CustomHeader from '../../../components/CustomHeader';

const OpenStandings = () => {
  const [poolAStandings, setPoolAStandings] = useState([]);
  const [poolBStandings, setPoolBStandings] = useState([]);
  const [poolCStandings, setPoolCStandings] = useState([]);
  const [poolDStandings, setPoolDStandings] = useState([]);
  const [poolEStandings, setPoolEStandings] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchStandings();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchStandings().then(() => setRefreshing(false));
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
      .order('team_id')

    if (error) {
      console.error('Error fetching teams:', error);
    } else {
      separateStandingsByPool(data);
    }
  };

  const separateStandingsByPool = (data) => {
    setPoolAStandings(data.filter(team => team.teams.pool_id === 1));
    setPoolBStandings(data.filter(team => team.teams.pool_id === 2));
    setPoolCStandings(data.filter(team => team.teams.pool_id === 3));
    setPoolDStandings(data.filter(team => team.teams.pool_id === 4));
    setPoolEStandings(data.filter(team => team.teams.pool_id === 5));
  };

  const renderStandings = (standings, poolName) => (
    <Card containerStyle={styles.poolCard}>
      <View style={styles.poolHeaderContainer}>
        <Text style={styles.poolHeader}>Pool {poolName}</Text>
        <Text style={styles.wlHeader}>W–L</Text>
      </View>
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
      <CustomHeader title='Men - Upper' route='standings' />
      <ScrollView
        contentContainerStyle={styles.standingsContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#EA1D25']} // This sets the color of the refresh spinner
          />
        }
      >
        {renderStandings(poolAStandings, 'A')}
        {renderStandings(poolBStandings, 'B')}
        {renderStandings(poolCStandings, 'C')}
        {renderStandings(poolDStandings, 'D')}
        {renderStandings(poolEStandings, 'E')}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  standingsContainer: {
    paddingTop: 20
  },
  poolCard: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 0,
    marginBottom: 12,
    marginHorizontal: 20,
    padding: 10
  },
  poolHeaderContainer: {
    flexDirection: 'row',
    backgroundColor: '#EA1D25',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 7,
    padding: 12
  },
  poolHeader: {
    fontFamily: 'Outfit-Bold',
    fontSize: 18,
    color: 'white',
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
    marginTop: 0,
    padding: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#CBC9E1',
  },
  teamName: {
    fontFamily: 'Outfit-Medium',
    fontSize: 16,
    color: '#333243',
    flex: 1,
  },
  recordText: {
    fontFamily: 'Outfit-Medium',
    fontSize: 16,
    color: '#333243',
    width: 50,
    textAlign: 'right',
  },
  backButton: {
    marginRight: 15,
  },
});

export default OpenStandings;