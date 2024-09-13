import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import { Card } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../utils/supabase'; // Adjust the import path as needed

const TrainersList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('medical_requests')
        .select('*, trainer:assigned_to(full_name)')
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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#FF285C';
      case 'Medium': return '#FA7930';
      case 'Low': return '#2871FF';
      default: return '#6D28FF';
    }
  };

  const renderItem = ({ item }) => (
    <Card containerStyle={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Ionicons name="medical" size={24} color="#EA1D25" />
        <Text style={styles.fieldText}>Field {item.field_number}</Text>
      </View>
      <View style={styles.cardContent}>
        <View style={styles.infoRow}>
          <Text style={styles.labelText}>Status:</Text>
          <Text style={[styles.valueText, { color: item.status === 'pending' ? '#FA7930' : '#4CAF50' }]}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.labelText}>Priority:</Text>
          <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(item.priority_level) }]}>
            <Text style={styles.priorityText}>{item.priority_level || 'N/A'}</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.labelText}>Trainer:</Text>
          <Text style={styles.valueText}>{item.trainer ? item.trainer.full_name : 'Unassigned'}</Text>
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
    backgroundColor: '#f5f5f5',
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
  cardContainer: {
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  listContainer: {
    paddingBottom: 15
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  fieldText: {
    fontSize: 18,
    fontFamily: 'Outfit-Bold',
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
    fontSize: 14,
    fontFamily: 'Outfit-Medium',
    color: '#8F8DAA',
  },
  valueText: {
    fontSize: 14,
    fontFamily: 'Outfit-SemiBold',
    color: '#333243',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  priorityText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Outfit-Medium',
  },
});

export default TrainersList;