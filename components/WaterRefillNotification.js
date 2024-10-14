import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { usePushNotifications } from '../hooks/usePushNotifications';
import * as Notifications from "expo-notifications";
import { router } from 'expo-router';

export default function WaterRefillNotification() {
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
    console.log(response)

    if (data.type === "new_water_request") {

      router.push('/settings/water-refill-requests');
    }
  };

  return (
    <View style={{ display: 'none', alignItems: 'center', justifyContent: 'space-around' }}>
      <Text>WATER token: {expoPushToken ? expoPushToken.data : 'No token'}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification ? notification.request.content.title : 'No notification'} </Text>
        <Text>Body: {notification ? notification.request.content.body : 'No notification'}</Text>
        <Text>Data: {notification ? JSON.stringify(notification.request.content.data) : 'No data'}</Text>
      </View>
    </View>
  );
}