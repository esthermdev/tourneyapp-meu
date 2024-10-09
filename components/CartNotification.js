import React, { useEffect } from 'react';
import { Text, View, Alert } from 'react-native';
import { supabase } from '../utils/supabase';
import { usePushNotifications } from '../hooks/usePushNotifications';
import * as Notifications from "expo-notifications";
import { Button } from '@rneui/base';
import { router } from 'expo-router';

export default function CartNotification() {
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

    if (data.type === 'new_cart_request' && data.requestId) {
      // Navigate to the Driver Management Screen
      router.push('settings/cart-requests')
    }
  };

  return (
    <View style={{ display: 'none', alignItems: 'center', justifyContent: 'space-around' }}>
      <Text>CART token: {expoPushToken ? expoPushToken.data : 'No token'}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification ? notification.request.content.title : 'No notification'} </Text>
        <Text>Body: {notification ? notification.request.content.body : 'No notification'}</Text>
        <Text>Data: {notification ? JSON.stringify(notification.request.content.data) : 'No data'}</Text>
        <Button title='Test notification' onPress={() => sendTestNotification(expoPushToken)} />
      </View>
    </View>
  );
}