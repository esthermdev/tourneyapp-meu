import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, RefreshControl } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { ListItem, Avatar } from '@rneui/base';
import { supabase } from '../../../utils/supabase';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { router } from 'expo-router';
import { s, ms } from 'react-native-size-matters';
import { SearchBar } from '@rneui/themed';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState('All');
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  // Apply search filter
  filteredTeams = filteredTeams.filter(team =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => router.push(`/teams/${item.id}?teamName=${item.name}`)}>
      <ListItem style={{ paddingHorizontal: 15 }} bottomDivider>
        <Avatar
          size={50}
          rounded
          source={{ uri: item?.avatar_uri }} // replace with actual avatar URLs if available
          title={item.name[0]}
          avatarStyle={{ borderColor: 'lightgray', borderWidth: 1, resizeMode: 'contain' }} // use the first letter of the team name as the title if no image is available
        />
        <ListItem.Content style={{ gap: s(5) }}>
          <ListItem.Title className='font-outfitbold' style={styles.teamName} maxFontSizeMultiplier={1.2}>{item.name}</ListItem.Title>
          <View className='rounded-full px-[8] py-0.5' style={{ backgroundColor: item.color }}>
            <ListItem.Subtitle className='font-outfitlight' maxFontSizeMultiplier={1.2} style={styles.division}>{renderLabel(item)}</ListItem.Subtitle>
          </View>
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header} maxFontSizeMultiplier={1}>Teams</Text>
      </View>
      <SearchBar
        placeholder="Search teams..."
        onChangeText={handleSearch}
        value={searchQuery}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
        inputStyle={styles.searchBarInput}
        round={true}
        lightTheme={true}
        clearIcon={{ color: '#86939e' }}
      />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5, padding: 15 }}>
        <Text maxFontSizeMultiplier={1.2} className='font-outfitlight text-gray-500 mt-0.3' style={styles.filterTitle}>Filters: </Text>
        <TouchableOpacity className='bg-[#917120] rounded-full py-0.5 px-[8]' onPress={() => setSelectedDivision('All')}>
          <Text maxFontSizeMultiplier={1.2} style={styles.filterByText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity className='bg-[#2871FF] rounded-full py-0.5 px-[8]' onPress={() => setSelectedDivision('MU')}>
          <Text maxFontSizeMultiplier={1.2} style={styles.filterByText}>Men - Upper</Text>
        </TouchableOpacity>
        <TouchableOpacity className='bg-[#0AB359] rounded-full py-0.5 px-[8]' onPress={() => setSelectedDivision('MM')}>
          <Text maxFontSizeMultiplier={1.2} style={styles.filterByText}>Men - Middle</Text>
        </TouchableOpacity>
        <TouchableOpacity className='bg-[#efaa34] rounded-full py-0.5 px-[8]' onPress={() => setSelectedDivision('ML')}>
          <Text maxFontSizeMultiplier={1.2} style={styles.filterByText}>Men - Lower</Text>
        </TouchableOpacity>
        <TouchableOpacity className='bg-[#FF026C] rounded-full py-0.5 px-[8]' onPress={() => setSelectedDivision('WU')}>
          <Text maxFontSizeMultiplier={1.2} style={styles.filterByText}>Women - Upper</Text>
        </TouchableOpacity>
        <TouchableOpacity className='bg-[#BD41F2] rounded-full py-0.5 px-[8]' onPress={() => setSelectedDivision('WL')}>
          <Text maxFontSizeMultiplier={1.2} style={styles.filterByText}>Women - Lower</Text>
        </TouchableOpacity>
        <TouchableOpacity className='bg-[#f77732] rounded-full py-0.5 px-[8]' onPress={() => setSelectedDivision('X')}>
          <Text maxFontSizeMultiplier={1.2} style={styles.filterByText}>Mixed</Text>
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
        estimatedItemSize={100}
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
    paddingVertical: 5,
  },
  header: {
    fontFamily: 'Outfit-Bold',
    fontSize: ms(35),
    color: '#EA1D25'
  },
  teamName: {
    fontSize: ms(16),
  },
  division: {
    color: 'white', // white text
    fontSize: ms(10), // text size
    textAlign: 'center', // center the text 
  },
  filterTitle: {
    fontSize: ms(12)
  },
  filterByText: {
    fontFamily: 'Outfit-Light',
    fontSize: ms(12),
    color: '#fff'
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    paddingHorizontal: 15,
  },
  searchBarInputContainer: {
    backgroundColor: '#F0F0F0',
  },
  searchBarInput: {
    fontFamily: 'Outfit-Regular',
    fontSize: ms(14),
  },
});
