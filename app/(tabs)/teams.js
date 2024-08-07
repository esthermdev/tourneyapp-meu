import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { ListItem, Avatar } from '@rneui/base';
import { supabase } from '../../utils/supabase';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState('All');

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    const { data, error } = await supabase
      .from('teams')
      .select('id, name, division, avatar_uri, color');

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
    filteredTeams = teams.filter(team => team.division === selectedDivision);
  };

  const renderItem = ({ item }) => (
    <ListItem style={{paddingHorizontal: 20}} bottomDivider>
      <Avatar
        size={60}
        rounded
        source={{ uri: item.avatar_uri }} // replace with actual avatar URLs if available
        title={item.name[0]} // use the first letter of the team name as the title if no image is available
      />
      <ListItem.Content>
        <ListItem.Title className='font-outfitbold text-lg'>{item.name}</ListItem.Title>
        <View className={`rounded-full px-1.5 py-0.5`} style={{ backgroundColor: item.color }}>
          <ListItem.Subtitle className='font-outfitlight' style={styles.division}>{item.division}</ListItem.Subtitle>
        </View>
      </ListItem.Content>
    </ListItem>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Teams</Text>
      </View>
      <View className='d-flex flex-row items-center px-5 h-12'>
        <Text className='font-outfitlight text-gray-500'>Filters: </Text>
        <TouchableOpacity className='bg-[#FA7930] rounded-full py-0.5 px-[7] mx-1' onPress={() => setSelectedDivision('All')}>
          <Text style={styles.filterByText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity className='bg-[#2871FF] rounded-full py-0.5 px-[7] mx-1' onPress={() => setSelectedDivision('Open')}>
          <Text style={styles.filterByText}>Open</Text>
        </TouchableOpacity>
        <TouchableOpacity className='bg-[#FF285C] rounded-full py-0.5 px-[7] mx-1' onPress={() => setSelectedDivision('Womens')}>
          <Text style={styles.filterByText}>Womens</Text>
        </TouchableOpacity>
        <TouchableOpacity className='bg-[#6D28FF] rounded-full py-0.5 px-[7] mx-1' onPress={() => setSelectedDivision('Mixed')}>
          <Text style={styles.filterByText}>Mixed</Text>
        </TouchableOpacity>
      </View>
      <FlashList
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
