import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SectionList, Linking, ActivityIndicator } from 'react-native';
import CustomHeader from '../../../components/CustomHeader';
import { ms } from 'react-native-size-matters';
import { supabase } from '../../../utils/supabase';

const RestaurantsHotelsScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRestaurantsHotels();
  }, []);

  const fetchRestaurantsHotels = async () => {
    try {
      const { data, error } = await supabase
        .from('restaurants')
        .select('*')
        .order('name');

      if (error) throw error;

      // Group the data by category
      const groupedData = data.reduce((acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
      }, {});

      // Convert to the format needed for SectionList
      const sectionListData = Object.keys(groupedData).map(category => ({
        title: category,
        data: groupedData[category]
      }));

      setData(sectionListData);
    } catch (error) {
      console.error('Error fetching restaurants and hotels:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemName}>{item.name}</Text>
      {item.website && (
        <Text
          style={styles.itemWebsite}
          onPress={() => Linking.openURL(item.website)}
        >
          Website
        </Text>
      )}
      {item.discount && <Text style={styles.itemDiscount}><Text className='text-gray-500'>Discount: </Text>{item.discount}</Text>}
    </View>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#EA1D25" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomHeader title='Restaurants & Hotels' route='info' />
      <SectionList
        sections={data}
        keyExtractor={(item, index) => item.name + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  itemName: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: ms(16),
    color: '#333',
  },
  itemWebsite: {
    fontFamily: 'Outfit-Regular',
    fontSize: ms(14),
    color: '#2871FF',
    marginTop: 5,
  },
  itemDiscount: {
    fontFamily: 'Outfit-Medium',
    fontSize: ms(14),
    color: '#EA1D25',
    marginTop: 5,
  },
  sectionHeader: {
    backgroundColor: '#EA1D25',
    padding: 10,
  },
  sectionHeaderText: {
    fontFamily: 'Outfit-Bold',
    fontSize: ms(20),
    color: '#fff',
  },
});

export default RestaurantsHotelsScreen;