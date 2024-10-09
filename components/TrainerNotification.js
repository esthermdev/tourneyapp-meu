import React, { useEffect, useState } from 'react';
import { Text, View, Alert } from 'react-native';
import { supabase } from '../utils/supabase';
import { usePushNotifications } from '../hooks/usePushNotifications';
import { useAuth } from '../context/AuthProvider';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';

export default function RequestTrainerNotification() {
  const { expoPushToken, notification } = usePushNotifications();

  useEffect(() => {
    let isMounted = true;
    const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
      if (isMounted) {
        handleNotificationResponse(response);
      }
    });

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, []);

  const handleNotificationResponse = (response) => {
    const { notification: { request: { content: { data } } } } = response;

    if (data.type === "new_medic_request" && data.requestId) {
      // Navigate to the Trainer Management Screen
      router.push('/settings/trainer-screen');
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