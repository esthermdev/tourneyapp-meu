import React, { useState, useEffect, useCallback } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet, View, Text, FlatList, Switch, ActivityIndicator, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import CustomAdminHeader from '../../components/CustomAdminHeader';
import { supabase } from '../../utils/supabase';
import { CardDivider } from '@rneui/base/dist/Card/Card.Divider';
import { capitalizeWords } from '../../utils/capitalizeWords';
import { ms } from 'react-native-size-matters';
import { useAuth } from '../../context/AuthProvider';

const Tab = createMaterialTopTabNavigator();

const DriverManagementScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CustomAdminHeader title="Driver Management" route='settings' />
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#EA1D25',
          tabBarInactiveTintColor: '#8F8DAA',
          tabBarLabelStyle: {
            fontFamily: 'Outfit-Semibold',
            fontSize: ms(12),
          },
          tabBarStyle: {
            backgroundColor: '#262537',
            borderBottomWidth: 1,
            borderBottomColor: '#8F8DAA',
          },
          tabBarIndicatorStyle: {
            backgroundColor: '#EA1D25',
            height: 3,
          },
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
  const { profile } = useAuth();

  const fetchRequests = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchRequests();

    // Set up real-time subscription
    const subscription = supabase
      .channel('cart_requests_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'cart_requests' }, fetchRequests)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchRequests]);

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'expired':
        return styles.statusExpired;
      case 'pending':
        return styles.statusPending;
      case 'confirmed':
        return styles.statusConfirmed;
      default:
        return {};
    }
  };

  const handleAcceptRequest = async (requestId) => {
    try {

      const { data: requestData, error: fetchError } = await supabase
        .from('cart_requests')
        .select('requester_token')
        .eq('id', requestId)
        .single();

      if (fetchError) throw fetchError;

      const { data, error } = await supabase
        .from('cart_requests')
        .update({
          status: 'confirmed',
          driver: profile.full_name,
          updated_at: new Date().toISOString()
        })
        .eq('id', requestId)
        .eq('status', 'pending')
        .select()
        .single();

      if (error) throw error;

      if (data) {
        Alert.alert('Success', 'You have accepted the cart request.');
        fetchRequests(); // Refresh the list
        if (requestData.requester_token) {
          await sendPushNotification(requestData.requester_token, 'Cart Request Accepted', 'A driver has accepted your cart request and is on their way.');
        }
      } else {
        Alert.alert('Info', 'This request is no longer available.');
      }
    } catch (error) {
      console.error('Error accepting cart request:', error);
      Alert.alert('Error', 'Failed to accept the cart request. It may have already been accepted by another driver.');
    }
  };


  const sendPushNotification = async (expoPushToken, title, body) => {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: title,
      body: body,
      data: { someData: 'goes here' },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  };

  const renderItem = ({ item }) => (
    <Card containerStyle={styles.cardContainer}>
      <View style={styles.locationContainer}>
        <View style={[styles.locationTextContainer, { backgroundColor: '#FF9821' }]}>
          <Text maxFontSizeMultiplier={1} style={styles.locationText}>{item.from_location.toUpperCase()} {item?.from_field_number}</Text>
        </View>
        <Ionicons name="arrow-forward" size={24} color="#FFFFFF" style={styles.arrowIcon} />
        <View style={[styles.locationTextContainer, { backgroundColor: '#EA1D25' }]}>
          <Text maxFontSizeMultiplier={1} style={styles.locationText}>{item.to_location.toUpperCase()} {item?.to_field_number}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Text maxFontSizeMultiplier={1} style={[styles.infoLabel, { color: '#fff' }]}>Number of Passengers:</Text>
        <Text maxFontSizeMultiplier={1} style={[styles.infoValue, { backgroundColor: '#000', paddingHorizontal: 16, paddingVertical: 5, borderRadius: 100 }]}>{item.passenger_count}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text maxFontSizeMultiplier={1} style={[styles.infoLabel, { color: '#fff' }]}>Driver:</Text>
        <Text maxFontSizeMultiplier={1} style={styles.infoValue}>{item.driver}</Text>
      </View>

      <CardDivider />

      <View style={styles.infoRow}>
        <Text maxFontSizeMultiplier={1} style={styles.infoLabel}>Special Request:</Text>
        <View style={{ flex: 1 }}>
          <Text maxFontSizeMultiplier={1} style={[styles.infoValue, { color: '#FFB46B', textAlign: 'right' }]}>{item.special_request || 'None'}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Text maxFontSizeMultiplier={1} style={styles.infoLabel}>ID:</Text>
        <Text maxFontSizeMultiplier={1} style={styles.infoValue}>{item.id}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text maxFontSizeMultiplier={1} style={styles.infoLabel}>Status:</Text>
        <Text maxFontSizeMultiplier={1} style={[styles.infoValue, getStatusColor(item.status)]}>
          {capitalizeWords(item.status)}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Text maxFontSizeMultiplier={1} style={styles.infoLabel}>Created:</Text>
        <Text maxFontSizeMultiplier={1} style={styles.infoValue}>{formatDate(item.created_at)}</Text>
      </View>

      {item.status === 'pending' && (
        <TouchableOpacity
          style={styles.acceptButton}
          onPress={() => handleAcceptRequest(item.id)}
        >
          <Text style={styles.acceptButtonText}>Accept Request</Text>
        </TouchableOpacity>
      )}
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
  const [refreshing, setRefreshing] = useState(false);

  const fetchDrivers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('is_driver', true)
        .order('full_name');

      if (error) throw error;
      setDrivers(data);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, [fetchDrivers]);

  const toggleAvailability = async (driverId, currentAvailability) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_available: !currentAvailability })
        .eq('id', driverId);

      if (error) throw error;

      setDrivers(drivers.map(driver =>
        driver.id === driverId
          ? { ...driver, is_available: !currentAvailability }
          : driver
      ));

    } catch (error) {
      console.error('Error updating driver availability:', error);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchDrivers();
    setRefreshing(false);
  }, [fetchDrivers]);

  const renderDriverItem = ({ item }) => (
    <View style={styles.driverItem}>
      <View style={styles.driverInfo}>
        <Text style={styles.driverName}>{item.full_name}</Text>
        <Text style={[styles.availabilityText,
        { color: item.is_available ? '#59DE07' : '#EA1D25' }]}>
          {item.is_available ? 'Available' : 'Unavailable'}
        </Text>
      </View>
      <Switch
        value={item.is_available}
        onValueChange={() => toggleAvailability(item.id, item.is_available)}
        trackColor={{ false: "#fff", true: "whitesmoke" }}
        thumbColor={item.is_available ? "#59DE07" : "#828282"}
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
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#EA1D25']}
            tintColor="#EA1D25"
          />
        }
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
    paddingVertical: 10,
  },
  cardContainer: {
    borderColor: '#1F1F2F',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#1F1F2F',
    marginHorizontal: 15,
    marginVertical: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  locationTextContainer: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  locationText: {
    textAlign: 'center',
    fontFamily: 'Outfit-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  arrowIcon: {
    marginHorizontal: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    fontFamily: 'Outfit-Regular',
    fontSize: 16,
    color: '#8F8DAA',
  },
  infoValue: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  statusExpired: {
    color: '#F9200C',
  },
  statusPending: {
    color: '#D828FF',
  },
  statusConfirmed: {
    color: '#BACF16',
  },
  driverList: {
    paddingVertical: 10,
  },
  driverItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1F1F2F',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 15,
    borderRadius: 10,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  availabilityText: {
    fontFamily: 'Outfit-Medium',
    fontSize: 14,
    marginTop: 5,
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  acceptButtonText: {
    color: 'white',
    fontFamily: 'Outfit-Bold',
    fontSize: 16,
  },
});

export default DriverManagementScreen;