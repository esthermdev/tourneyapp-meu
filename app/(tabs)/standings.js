import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { ListItem } from '@rneui/base';
import { supabase } from '../../utils/supabase';
import { ScrollView } from 'react-native-gesture-handler';

const Standings = () => {
  const [standings, setStandings] = useState([]);
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
        teams (name, pool_id)
      `)
      .order('pool_rank')

    if (error) {
      console.error('Error fetching teams:', error);
    } else {
      setStandings(data);
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
    <View style={styles.poolContainer}>
      <Text style={styles.poolHeader}>Pool {poolName}</Text>
      {
        standings.map((team, i) => (
          <ListItem key={i} bottomDivider>
            <ListItem.Content>
              <View style={styles.rowContainer}>
                <Text style={styles.rankNumber}>{i + 1}</Text>
                <View style={styles.teamInfo}>
                  <ListItem.Title>{team.teams.name}</ListItem.Title>
                  <Text>{team.wins} - {team.losses}</Text>
                </View>
              </View>
            </ListItem.Content>
          </ListItem>
        ))
      }
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Standings</Text>
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

export default Standings;

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
  },
  poolContainer: {
    flex: 1,
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  poolHeader: {
    fontFamily: 'Outfit-Bold',
    fontSize: 25,
    color: '#EA1D25',
    marginBottom: 5,
    textAlign: 'center'
  },
  listContentContainer: {
    flexGrow: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    width: 20,
    textAlign: 'center',
  },
  teamInfo: {
    flex: 1,
  },
});
