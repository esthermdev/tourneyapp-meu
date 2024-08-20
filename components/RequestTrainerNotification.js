import React, { useEffect } from 'react';
import { Text, View, Alert } from 'react-native';
import { supabase } from '../utils/supabase';
import { usePushNotifications } from '../hooks/usePushNotifications';

export default function RequestTrainerNotification() {
  const { expoPushToken, notification } = usePushNotifications();

  useEffect(() => {
    if (notification) {
      const data = notification.request.content.data;
      if (data.requestId) {
        Alert.alert(
          'Medical Trainer Needed',
          `${notification.request.content.body}`,
          [
            { text: 'OK', style: 'default', onPress: () => respondToMedicalRequest(data.requestId) },
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
          updated_at: new Date().toISOString()
        })
        .eq('id', requestId)
        .eq('status', 'pending')
        .select()

      if (error) throw error;
    } catch (error) {
      console.error('Error in respondToMedicalRequest:', error);
      Alert.alert('Error', error.message || 'An unexpected error occurred');
    }
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'space-around' }}>
      <Text>TRAINER token: {expoPushToken ? expoPushToken.data : 'No token'}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification ? notification.request.content.title : 'No notification'} </Text>
        <Text>Body: {notification ? notification.request.content.body : 'No notification'}</Text>
        <Text>Data: {notification ? JSON.stringify(notification.request.content.data) : 'No data'}</Text>
      </View>
    </View>
  );
}