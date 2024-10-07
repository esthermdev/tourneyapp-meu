import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { StyleSheet, Text, View, RefreshControl, Keyboard, TouchableWithoutFeedback, FlatList, TouchableOpacity } from 'react-native';
import { ListItem, Avatar } from '@rneui/base';
import { supabase } from '../../../utils/supabase';
import { router } from 'expo-router';
import { s, ms } from 'react-native-size-matters';
import { SearchBar } from '@rneui/themed';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState('All');
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchTeams = useCallback(async () => {
    const { data, error } = await supabase
      .from('teams')
      .select(`id, name, pool:pool_id (division), avatar_uri, color`);

    if (error) {
      console.error('Error fetching teams:', error);
    } else {
      setTeams(data.sort((a, b) => a.name.localeCompare(b.name)));
    }
  }, []);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchTeams().then(() => setRefreshing(false));
  }, [fetchTeams]);

  const handleSearch = useCallback((text) => {
    setSearchQuery(text);
  }, []);

  const dismissKeyboard = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  const filteredTeams = useMemo(() => {
    return teams
      .filter(team => selectedDivision === 'All' || team.pool.division === selectedDivision)
      .filter(team => team.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [teams, selectedDivision, searchQuery]);

  const renderLabel = useCallback((team) => {
    switch (team.pool.division) {
      case 'MU': return 'Men - Upper';
      case 'ML': return 'Men - Lower';
      case 'MM': return 'Men - Middle';
      case 'WU': return 'Women - Upper';
      case 'WL': return 'Women - Lower';
      case 'X': return 'Mixed';
      default: return team.pool.division;
    }
  }, []);

  const renderItem = useCallback(({ item }) => (
    <TouchableOpacity onPress={() => router.push(`/teams/${item.id}?teamName=${item.name}`)}>
      <ListItem style={{ paddingHorizontal: 15 }} bottomDivider>
        <Avatar
          size={50}
          rounded
          title={item.name[0]}
          titleStyle={{ color: '#000' }}
          source={{ uri: item?.avatar_uri || null }}
          avatarStyle={{ borderColor: '#000', borderWidth: 0.5 }}
          containerStyle={{ backgroundColor: '#fff', }}
        />
        <ListItem.Content style={{ gap: s(5) }}>
          <ListItem.Title className='font-outfitbold' style={styles.teamName} maxFontSizeMultiplier={1.2}>{item.name}</ListItem.Title>
          <View className='rounded-full px-[8] py-0.5' style={{ backgroundColor: item.color }}>
            <ListItem.Subtitle className='font-outfitlight' maxFontSizeMultiplier={1.2} style={styles.division}>{renderLabel(item)}</ListItem.Subtitle>
          </View>
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  ), [renderLabel]);

  const FilterButton = ({ title, color, division }) => (
    <TouchableOpacity style={[styles.filterButton, { backgroundColor: color }]} onPress={() => setSelectedDivision(division)}>
      <Text maxFontSizeMultiplier={1.2} style={styles.filterByText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
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
          searchIcon={{ color: '#86939e' }}
          onSubmitEditing={dismissKeyboard}
          returnKeyType="done"
        />
        <View style={styles.filterContainer}>
          <Text maxFontSizeMultiplier={1.2} className='font-outfitlight text-gray-500 mt-0.3' style={styles.filterTitle}>Filters: </Text>
          <FilterButton title="All" color="#917120" division="All" />
          <FilterButton title="Men - Upper" color="#2871FF" division="MU" />
          <FilterButton title="Men - Middle" color="#0AB359" division="MM" />
          <FilterButton title="Men - Lower" color="#efaa34" division="ML" />
          <FilterButton title="Women - Upper" color="#FF026C" division="WU" />
          <FilterButton title="Women - Lower" color="#BD41F2" division="WL" />
          <FilterButton title="Mixed" color="#f77732" division="X" />
        </View>
        <FlatList
          data={filteredTeams}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#EA1D25']}
            />
          }
          contentContainerStyle={styles.listContent}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default React.memo(Teams);

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
    color: 'white',
    fontSize: ms(10),
    textAlign: 'center',
  },
  filterTitle: {
    fontSize: ms(12)
  },
  filterByText: {
    fontFamily: 'Outfit-Light',
    fontSize: ms(12),
    color: '#fff'
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    paddingHorizontal: 15,
    paddingBottom: 10
  },
  filterButton: {
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  listContent: {
    paddingBottom: 20,
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  searchBarInputContainer: {
    backgroundColor: '#F0F0F0',
  },
  searchBarInput: {
    fontFamily: 'Outfit-Regular',
    fontSize: ms(16),
  },
});