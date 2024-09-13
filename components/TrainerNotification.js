import React, { useEffect, useState } from 'react';
import { Text, View, Alert } from 'react-native';
import { supabase } from '../utils/supabase';
import { usePushNotifications } from '../hooks/usePushNotifications';
import { useAuth } from '../context/AuthProvider';

export default function RequestTrainerNotification() {
  const { expoPushToken, notification } = usePushNotifications();
  const { profile } = useAuth();
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

  useEffect(() => {
    if (notification) {
      const data = notification.request.content.data;
      const title = notification.request.content.title;
      if (data.requestId && title === 'Requesting Trainer') {
        Alert.alert(
          'Medical Trainer Needed',
          `${notification.request.content.body}`,
          [
            { text: 'Cancel', style: 'cancel', onPress: () => console.log('Request denied.') },
            { text: 'Confirm', style: 'default', onPress: () => respondToMedicalRequest(data.requestId) },
          ]
        )
      }
    }
  }, [notification]);

  const respondToMedicalRequest = async (requestId) => {
    console.log('Attempting to respond to request ID:', requestId);

    try {
      const { error } = await supabase
        .from('medical_requests')
        .update({
          status: 'confirmed',
          updated_at: new Date().toISOString(),
          assigned_to: profile.id,
          trainer: profile.full_name
        })
        .eq('id', requestId)
        .eq('status', 'pending')
        .select()

      if (error) throw error;

    } catch (error) {
      console.error('Error in respondToMedicalRequest:', error);
      Alert.alert('Error', error.message || 'An unexpected error occurred');
    } finally {
      toggleAvailability(profile.id, true)
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

  return (
    <View style={{ display: 'none', alignItems: 'center', justifyContent: 'space-around' }}>
      <Text>TRAINER token: {expoPushToken ? expoPushToken.data : 'No token'}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification ? notification.request.content.title : 'No notification'} </Text>
        <Text>Body: {notification ? notification.request.content.body : 'No notification'}</Text>
        <Text>Data: {notification ? JSON.stringify(notification.request.content.data) : 'No data'}</Text>
      </View>
    </View>
  );
}