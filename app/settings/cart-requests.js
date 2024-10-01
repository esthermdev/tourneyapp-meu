import React, { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet, View, Text, FlatList, Switch, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import CustomAdminHeader from '../../components/CustomAdminHeader';
import { supabase } from '../../utils/supabase';

const Tab = createMaterialTopTabNavigator();

const DriverManagementScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CustomAdminHeader title="Driver Management" route='settings' />
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: styles.tabLabel,
          tabBarStyle: styles.tabBar,
          tabBarIndicatorStyle: styles.tabIndicator,
        }}
      >
        <Tab.Screen name="Requests" component={CartRequestsList} />
        <Tab.Screen name="Drivers" component={DriverAvailabilityScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const CartRequestsList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('cart_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderItem = ({ item }) => (
    <Card containerStyle={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Ionicons name="car" size={24} color="#EA1D25" />
        <Text style={styles.requestText}>
          From: {item.from_location}
          {'\n'}
          To: {item.to_location}
        </Text>
      </View>
      <View style={styles.cardContent}>
        <View style={styles.infoRow}>
          <Text style={styles.labelText}>ID:</Text>
          <Text style={styles.valueText}>
            {item.id}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.labelText}>Status:</Text>
          <Text style={[styles.valueText, { color: item.status === 'pending' ? '#FA7930' : '#4CAF50' }]}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.labelText}>Created:</Text>
          <Text style={styles.valueText}>{formatDate(item.created_at)}</Text>
        </View>
      </View>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#EA1D25" />
        <Text style={styles.loadingText}>Loading requests...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={requests}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        refreshing={loading}
        onRefresh={fetchRequests}
      />
    </View>
  );
};

const DriverAvailabilityScreen = () => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('is_volunteer', true)
        .order('full_name');

      if (error) throw error;
      setDrivers(data);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };

  console.log(drivers)

  const toggleAvailability = async (driverId, currentAvailability) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_available: !currentAvailability })
        .eq('id', driverId);

      if (error) throw error;

      // Update local state
      setDrivers(drivers.map(driver =>
        driver.id === driverId
          ? { ...driver, is_available: !currentAvailability }
          : driver
      ));

    } catch (error) {
      console.error('Error updating driver availability:', error);
    }
  };

  const renderDriverItem = ({ item }) => (
    <View style={styles.driverItem}>
      <View style={styles.driverInfo}>
        <Text style={styles.driverName}>{item.full_name}</Text>
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
    <View style={styles.container}>
      <FlatList
        data={drivers}
        renderItem={renderDriverItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.driverList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333243',
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'Outfit-Regular',
    color: '#666',
  },
  listContainer: {
    paddingBottom: 10
  },
  cardContainer: {
    borderRadius: 11,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  requestText: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 16,
    color: '#333243',
    marginLeft: 10,
  },
  cardContent: {
    marginLeft: 34,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  labelText: {
    fontFamily: 'Outfit-Medium',
    fontSize: 14,
    color: '#8F8DAA',
  },
  valueText: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 14,
    color: '#333243',
  },
  driverList: {
    paddingBottom: 10,
  },
  driverItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 15,
    marginTop: 15,
    marginHorizontal: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
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

export default DriverManagementScreen;