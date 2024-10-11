import React from 'react';
import { Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomAdminHeader from '../../../components/CustomAdminHeader';

const divisions = [
  { id: 'men_upper', title: 'Men - Upper' },
  { id: 'men_middle', title: 'Men - Middle' },
  { id: 'men_lower', title: 'Men - Lower' },
  { id: 'women_upper', title: 'Women - Upper' },
  { id: 'women_lower', title: 'Women - Lower' },
  { id: 'mixed', title: 'Mixed' },
];

const UpdateScoresScreen = () => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.divisionButton}
      onPress={() => router.push(`/settings/update-scores/${item.id}`)}
    >
      <MaterialIcons name="groups" size={24} color="#fff" />
      <Text maxFontSizeMultiplier={1.2} style={styles.divisionText}>{item.title}</Text>
      <MaterialIcons name="arrow-right" size={24} color="#fff" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomAdminHeader title="Update Scores" route='settings' />
      <FlatList
        data={divisions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333243',
  },
  content: {
    padding: 20,
  },
  divisionButton: {
    backgroundColor: '#FF9821',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row'
  },
  divisionText: {
    flex: 1,
    marginHorizontal: 10,
    color: '#fff',
    fontFamily: 'Outfit-SemiBold',
    fontSize: 18,
    textAlign: 'left',
  },
});

export default UpdateScoresScreen;