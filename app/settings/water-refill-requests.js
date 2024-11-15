import React, { useState, useEffect, useCallback } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet, View, Text, FlatList, Switch, ActivityIndicator, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import CustomAdminHeader from '../../components/CustomAdminHeader';
import { supabase } from '../../utils/supabase';
import { capitalizeWords } from '../../utils/capitalizeWords';
import { ms } from 'react-native-size-matters';
import { useAuth } from '../../context/AuthProvider';

const Tab = createMaterialTopTabNavigator();

const WaterRefillManagementScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CustomAdminHeader title="Water Refill" route='settings' />
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
        <Tab.Screen name="Requests" component={WaterRefillRequestsList} />
        <Tab.Screen name="Volunteers" component={VolunteerAvailabilityScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const WaterRefillRequestsList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { profile } = useAuth();

  const fetchRequests = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('water_refill')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data);
      console.log(requests)
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
      .channel('water_refill_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'water_refill' }, fetchRequests)
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
      const { data, error } = await supabase
        .from('water_refill')
        .update({
          status: 'confirmed',
          volunteer: profile.full_name,
          updated_at: new Date().toISOString()
        })
        .eq('id', requestId)
        .eq('status', 'pending')
        .select()
        .single();

      if (error) throw error;

      if (data) {
        Alert.alert('Success', 'You have accepted the water refill request.');
        fetchRequests(); // Refresh the list
      } else {
        Alert.alert('Info', 'This request is no longer available.');
      }
    } catch (error) {
      console.error('Error accepting water refill request:', error);
      Alert.alert('Error', 'Failed to accept the water refill request. It may have already been accepted by another volunteer.');
    }
  };

  const renderItem = ({ item }) => (
    <Card containerStyle={styles.cardContainer}>
      <View style={styles.locationContainer}>
        <View style={[styles.locationTextContainer, { backgroundColor: '#FF9821' }]}>
          <Text maxFontSizeMultiplier={1} style={styles.locationText}>Field {item.field_number}</Text>
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
        <Text maxFontSizeMultiplier={1} style={styles.infoLabel}>Volunteer:</Text>
        <Text maxFontSizeMultiplier={1} style={styles.infoValue}>{item.volunteer}</Text>
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
          <Ionicons name="checkmark-circle" size={40} color="black" />
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

const VolunteerAvailabilityScreen = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchVolunteers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('is_volunteer', true)
        .order('full_name');

      if (error) throw error;
      setVolunteers(data);
    } catch (error) {
      console.error('Error fetching volunteers:', error);
    }
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const toggleAvailability = async (volunteerId, currentAvailability) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_available: !currentAvailability })
        .eq('id', volunteerId);

      if (error) throw error;

      setVolunteers(volunteers.map(volunteer =>
        volunteer.id === volunteerId
          ? { ...volunteer, is_available: !currentAvailability }
          : volunteer
      ));

    } catch (error) {
      console.error('Error updating volunteer availability:', error);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchVolunteers();
    setRefreshing(false);
  }, [fetchVolunteers]);

  const renderVolunteerItem = ({ item }) => (
    <View style={styles.volunteerItem}>
      <View style={styles.volunteerInfo}>
        <Text style={styles.volunteerName}>{item.full_name}</Text>
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
        data={volunteers}
        renderItem={renderVolunteerItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.volunteerList}
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
  loadingContainer: {
    flex: 1,
    backgroundColor: '#333243',
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
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  locationText: {
    textAlign: 'center',
    fontFamily: 'Outfit-Bold',
    fontSize: 18,
    color: '#FFFFFF',
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
  volunteerList: {
    paddingVertical: 10,
  },
  volunteerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1F1F2F',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 15,
    borderRadius: 10,
  },
  volunteerInfo: {
    flex: 1,
  },
  volunteerName: {
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
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'center',
    width: 'auto'
  },
  acceptButtonText: {
    color: 'white',
    fontFamily: 'Outfit-Bold',
    fontSize: 18,
    textAlign: 'center'
  },
});

export default WaterRefillManagementScreen;