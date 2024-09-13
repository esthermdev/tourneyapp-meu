import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView, StyleSheet, Text, View, FlatList, Switch } from 'react-native';
import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase'; // Adjust the import path as needed
import TrainersList from '../../components/TrainersList'; // Import the existing TrainersList component
import CustomAdminHeader from '../../components/CustomAdminHeader';

const Tab = createMaterialTopTabNavigator();

const TrainerManagementScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CustomAdminHeader title="Trainer Management" />
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: styles.tabLabel,
          tabBarStyle: styles.tabBar,
          tabBarIndicatorStyle: styles.tabIndicator,
        }}
      >
        <Tab.Screen name="Requests" component={TrainersList} />
        <Tab.Screen name="Trainers" component={TrainerAvailabilityScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const TrainerAvailabilityScreen = () => {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('is_medical_staff', true)
        .order('full_name');

      if (error) throw error;
      setTrainers(data);
    } catch (error) {
      console.error('Error fetching trainers:', error);
    }
  };

  const toggleAvailability = async (trainerId, currentAvailability) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_available: !currentAvailability })
        .eq('id', trainerId);

      if (error) throw error;

      // Update local state
      setTrainers(trainers.map(trainer =>
        trainer.id === trainerId
          ? { ...trainer, is_available: !currentAvailability }
          : trainer
      ));
    } catch (error) {
      console.error('Error updating trainer availability:', error);
    }
  };

  const renderTrainerItem = ({ item }) => (
    <View style={styles.trainerItem}>
      <View style={styles.trainerInfo}>
        <Text style={styles.trainerName}>{item.full_name}</Text>
        <Text style={[styles.availabilityText,
        { color: item.is_available ? '#4CAF50' : '#FF5252' }]}>
          {item.is_available ? 'Available' : 'Unavailable'}
        </Text>
      </View>
      <Switch
        value={item.is_available}
        onValueChange={() => toggleAvailability(item.id, item.is_available)}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={item.is_available ? "#f5dd4b" : "#f4f3f4"}
      />
    </View>
  );

  return (
    <View style={styles.screenContainer}>
      <FlatList
        data={trainers}
        renderItem={renderTrainerItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.trainerList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  tabBar: {
    backgroundColor: '#ffffff',
  },
  tabLabel: {
    fontFamily: 'Outfit-Medium',
    fontSize: 14,
  },
  tabIndicator: {
    backgroundColor: '#EA1D25',
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  trainerList: {
    padding: 10,
  },
  trainerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  trainerInfo: {
    flex: 1,
  },
  trainerName: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 16,
    color: '#333243',
  },
  availabilityText: {
    fontFamily: 'Outfit-Medium',
    fontSize: 14,
    marginTop: 5,
  },
});

export default TrainerManagementScreen;