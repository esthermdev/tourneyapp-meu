import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { ListItem, Avatar } from '@rneui/base';
import { supabase } from '../../utils/supabase';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ListItemContent } from '@rneui/base/dist/ListItem/ListItem.Content';

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
      .from('pool_standings')
      .select(`
        wins,
        losses,
        pool_id,
        team_id,
        pools (pool_name),
        teams (name)
      `)
      .order('pool_id')

    if (error) {
      console.error('Error fetching teams:', error);
    } else {
      setStandings(data);
      separateStandingsByPool(data);
    }
  };

  const separateStandingsByPool = (data) => {
    setPoolAStandings(data.filter(team => team.pool_id === 1));
    setPoolBStandings(data.filter(team => team.pool_id === 2));
    setPoolCStandings(data.filter(team => team.pool_id === 3));
    setPoolDStandings(data.filter(team => team.pool_id === 4));
  };

  const renderStandings = (standings, poolName) => (
    <View style={styles.poolContainer}>
      <Text style={styles.poolHeader}>Pool {poolName}</Text>
      <FlashList
        data={standings}
        renderItem={({ item }) => (
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{item.teams.name}</ListItem.Title>
              <Text>{item.wins} - {item.losses}</Text>
            </ListItem.Content>
          </ListItem>
        )}
        estimatedItemSize={100}
        keyExtractor={(item) => item.team_id.toString()}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Standings</Text>
      </View>
      <View style={styles.standingsContainer}>
        {renderStandings(poolAStandings, 'A')}
        {renderStandings(poolBStandings, 'B')}
        {renderStandings(poolCStandings, 'C')}
        {renderStandings(poolDStandings, 'D')}
      </View>
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
  },
  listContentContainer: {
    flexGrow: 1,
  },
});
