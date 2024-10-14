import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { Card } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../utils/supabase'; // Adjust the import path as needed
import { capitalizeWords } from '../utils/capitalizeWords';
import { useAuth } from '../context/AuthProvider'; // Adjust the import path as needed

const TrainersList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { profile } = useAuth();

  useEffect(() => {
    fetchRequests();
    const subscription = supabase
      .channel('medical_requests')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'medical_requests' }, fetchRequests)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('medical_requests')
        .select('*, trainer:profiles(full_name)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const acceptRequest = async (requestId) => {
    try {
      const { data, error } = await supabase
        .from('medical_requests')
        .update({
          status: 'confirmed',
          assigned_to: profile.id,
          trainer: profile.id
        })
        .eq('id', requestId)
        .eq('status', 'pending')
        .select()
        .single();

      if (error) throw error;

      if (data) {
        Alert.alert('Success', 'You have accepted the medical request.');
        fetchRequests();
      } else {
        Alert.alert('Request Unavailable', 'This request has already been accepted by another trainer.');
      }
    } catch (error) {
      console.error('Error accepting request:', error);
      Alert.alert('Error', 'Failed to accept the request. Please try again.');
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

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return '#28D4C0'; // Cyan for pending
      case 'confirmed':
        return '#59DE07'; // Green for confirmed
      case 'resolved':
        return '#00B0FB'; // Blue for resolved
      default:
        return '#D828FF'; // Purple for unknown status
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return '#FF0000'; // Red for high priority
      case 'medium':
        return '#FFA500'; // Orange for medium priority
      case 'low':
        return '#008000'; // Green for low priority
      default:
        return '#FFA500'; // Orange as default
    }
  };

  const renderItem = ({ item }) => (
    <Card containerStyle={styles.cardContainer}>
      <View style={styles.cardContent}>
        <View style={[styles.statusIndicator,
        { backgroundColor: item.status.toLowerCase() === 'pending' ? '#FF7900' : '#188F00' }
        ]}>
          <Ionicons name="grid" size={24} color="white" />
          <Text style={styles.fieldNumber} maxFontSizeMultiplier={1}>Field {item.field_number}</Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.labelText} maxFontSizeMultiplier={1}>Status:</Text>
            <Text style={[styles.valueText, { color: getStatusColor(item.status) }]} maxFontSizeMultiplier={1}>
              {capitalizeWords(item.status)}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.labelText} maxFontSizeMultiplier={1}>Priority:</Text>
            <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(item.priority_level) }]}>
              <Text style={styles.priorityText} maxFontSizeMultiplier={1}>{item.priority_level}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.labelText} maxFontSizeMultiplier={1}>Trainer:</Text>
            <Text style={[styles.valueText, { color: '#FF00FF' }]} maxFontSizeMultiplier={1}>
              {item.trainer ? item.trainer.full_name : 'Unassigned'}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.labelText} maxFontSizeMultiplier={1}>Created:</Text>
            <Text style={styles.valueText} maxFontSizeMultiplier={1}>{formatDate(item.created_at)}</Text>
          </View>

          <View>
            {item.status === 'pending' && (
              <TouchableOpacity
                style={styles.acceptButton}
                onPress={() => acceptRequest(item.id)}
              >
                <Text style={styles.acceptButtonText}>Accept</Text>
              </TouchableOpacity>
            )}
          </View>

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
    <SafeAreaView style={styles.container}>
      <FlatList
        data={requests}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        refreshing={loading}
        onRefresh={fetchRequests}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333243',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333243',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'Outfit-Regular',
    color: '#B0B0B0',
  },
  cardContainer: {
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: '#1F1F2F',
    borderWidth: 0,
  },
  listContainer: {
    paddingVertical: 15,
  },
  cardContent: {
    flexDirection: 'row',
  },
  statusIndicator: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3
  },
  fieldNumber: {
    color: 'white',
    fontFamily: 'Outfit-Bold',
    fontSize: 16,
    marginTop: 8,
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: 'space-between',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 7
  },
  labelText: {
    fontSize: 16,
    fontFamily: 'Outfit-Regular',
    color: '#B0B0B0',
  },
  valueText: {
    fontSize: 16,
    fontFamily: 'Outfit-Bold',
    color: 'white',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
  },
  priorityText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Outfit-Regular',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  acceptButtonText: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 18,
    color: '#fff',
  },
});

export default TrainersList;