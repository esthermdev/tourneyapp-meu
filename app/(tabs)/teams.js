import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, RefreshControl } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { ListItem, Avatar } from '@rneui/base';
import { supabase } from '../../utils/supabase';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState('All');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchTeams();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchTeams().then(() => setRefreshing(false));
  }, []);

  const fetchTeams = async () => {
    const { data, error } = await supabase
      .from('teams')
      .select(
        `id, 
        name, 
        pool:pool_id (
          division
        ),
        avatar_uri, 
        color`
      );

    if (error) {
      console.error('Error fetching teams:', error);
    } else {
      const sortedTeams = data.sort((a, b) => a.name.localeCompare(b.name))
      setTeams(sortedTeams);
    }
  };

  let filteredTeams;
  if (selectedDivision === 'All') {
    filteredTeams = teams;
  } else {
    filteredTeams = teams.filter(team => team.pool.division === selectedDivision);
  };

  const renderLabel = (team) => {
    switch (team.pool.division) {
      case 'MU':
        return 'Men - Upper';
      case 'ML':
        return 'Men - Lower';
      case 'MM':
        return 'Men - Middle';
      case 'WU':
        return 'Women - Upper';
      case 'WL':
        return 'Women - Lower';
      case 'X':
        return 'Mixed';
      default:
        return team.pool.division; // fallback to the original division if it's not O, X, or W
    }
  };

  const renderItem = ({ item }) => (
    <ListItem style={{ paddingHorizontal: 20 }} bottomDivider>
      <Avatar
        size={50}
        rounded
        source={{ uri: item?.avatar_uri }} // replace with actual avatar URLs if available
        title={item.name[0]}
        avatarStyle={{ borderColor: 'lightgray', borderWidth: 1, resizeMode: 'contain' }} // use the first letter of the team name as the title if no image is available
      />
      <ListItem.Content>
        <ListItem.Title className='font-outfitbold text-lg'>{item.name}</ListItem.Title>
        <View className={`rounded-full px-1.5 py-0.5`} style={{ backgroundColor: item.color }}>
          <ListItem.Subtitle className='font-outfitlight' style={styles.division}>{renderLabel(item)}</ListItem.Subtitle>
        </View>
      </ListItem.Content>
    </ListItem>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Teams</Text>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', margin: 10 }}>
        <Text className='font-outfitlight text-gray-500'>Filters: </Text>
        <TouchableOpacity className='bg-[#917120] rounded-full py-0.5 px-[7] mx-1 mb-2' onPress={() => setSelectedDivision('All')}>
          <Text style={styles.filterByText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity className='bg-[#2871FF] rounded-full py-0.5 px-[7] mx-1' onPress={() => setSelectedDivision('MU')}>
          <Text style={styles.filterByText}>Men - Upper</Text>
        </TouchableOpacity>
        <TouchableOpacity className='bg-[#0AB359] rounded-full py-0.5 px-[7] mx-1' onPress={() => setSelectedDivision('MM')}>
          <Text style={styles.filterByText}>Men - Middle</Text>
        </TouchableOpacity>
        <TouchableOpacity className='bg-[#efaa34] rounded-full py-0.5 px-[7] mx-1' onPress={() => setSelectedDivision('ML')}>
          <Text style={styles.filterByText}>Men - Lower</Text>
        </TouchableOpacity>
        <TouchableOpacity className='bg-[#FF026C] rounded-full py-0.5 px-[7] mx-1' onPress={() => setSelectedDivision('WU')}>
          <Text style={styles.filterByText}>Women - Upper</Text>
        </TouchableOpacity>
        <TouchableOpacity className='bg-[#BD41F2] rounded-full py-0.5 px-[7] mx-1' onPress={() => setSelectedDivision('WL')}>
          <Text style={styles.filterByText}>Women - Lower</Text>
        </TouchableOpacity>
        <TouchableOpacity className='bg-[#f77732] rounded-full py-0.5 px-[7] mx-1' onPress={() => setSelectedDivision('X')}>
          <Text style={styles.filterByText}>Mixed</Text>
        </TouchableOpacity>
      </View>
      <FlashList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#EA1D25']} // This sets the color of the refresh spinner
          />
        }
        data={filteredTeams}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        estimatedItemSize={50}
      />
    </View>
  );
};

export default Teams;

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
  teamName: {
    fontSize: 18,
    paddingVertical: 10,
  },
  division: {
    color: 'white', // white text
    fontSize: 10, // text size
    textAlign: 'center', // center the text 
  },
  filterByText: {
    fontFamily: 'Outfit-Light',
    fontSize: 12,
    color: '#fff'
  }
});
