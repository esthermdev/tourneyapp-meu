import React, { useEffect } from 'react';
import { Text, View, Alert } from 'react-native';
import { supabase } from '../utils/supabase';
import { usePushNotifications } from '../hooks/usePushNotifications';
import * as Notifications from "expo-notifications";
import { Button } from '@rneui/base';

export default function CartNotification() {
  const { expoPushToken, notification, responseListener } = usePushNotifications();

  useEffect(() => {
    if (notification) {
      responseListener.current = Notifications.addNotificationResponseReceivedListener(handleNotificationResponse);
    }
  }, [notification])

  const handleNotificationResponse = async (response) => {
    console.log("Notification response received:", response);
    const { notification: { request: { content: { data } } } } = response;

    if (data.type === 'new_cart_request' && data.requestId) {
      try {
        // Check if the request still exists and is pending
        const { data: requestData, error } = await supabase
          .from('cart_requests')
          .select('status')
          .eq('id', data.requestId)
          .single();

        if (error) throw error;

        if (!requestData || requestData.status !== 'pending') {
          Alert.alert(
            "Request Expired",
            "This cart request is no longer available. It may have expired or been accepted by another driver.",
            [{ text: "OK" }]
          );
        } else {
          // The request is still valid, show acceptance dialog
          Alert.alert(
            "Cart Request",
            "Do you want to accept this cart request?",
            [
              { text: "Ignore", style: "cancel" },
              { text: "Accept", style: "default", onPress: () => acceptCartRequest(data.requestId) }
            ]
          );
        }
      } catch (error) {
        console.error("Error checking cart request status:", error);
        Alert.alert("Error", "Failed to check the status of this request.");
      }
    }
  };

  const acceptCartRequest = async (requestId) => {
    try {
      // First, fetch the cart request to get the requester's token
      const { data: requestData, error: fetchError } = await supabase
        .from('cart_requests')
        .select('requester_token')
        .eq('id', requestId)
        .single();

      if (fetchError) throw fetchError;

      // Update the request status
      const { data, error } = await supabase
        .from('cart_requests')
        .update({
          status: 'confirmed',
          updated_at: new Date().toISOString()
        })
        .eq('id', requestId)
        .eq('status', 'pending')
        .select();

      if (error) throw error;

      if (data && data.length > 0) {
        Alert.alert('Success', 'You have accepted the cart request.');

        // Send notification to the requester
        if (requestData.requester_token) {
          await sendPushNotification(requestData.requester_token, 'Cart Request Accepted', 'A driver has accepted your cart request and is on their way.');
        }
      } else {
        Alert.alert('Info', 'This request is no longer available.');
      }
    } catch (error) {
      console.error('Error accepting cart request:', error);
      Alert.alert('Error', 'Failed to accept the cart request');
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

  // In a separate test script or component
  const sendTestNotification = async (expoPushToken) => {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Test Notification',
      body: 'This is a test notification',
      data: { type: 'test' },
    };

    try {
      const response = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'Accept-encoding',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });
      const result = await response.json();
      console.log('Test notification result:', result);
    } catch (error) {
      console.error('Error sending test notification:', error);
    }
  };

  console.log("Notification payload:", notification);

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