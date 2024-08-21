import { Text, View } from 'react-native';
import { usePushNotifications } from '../hooks/usePushNotifications';

export default function RequestWaterRefill() {
  const { expoPushToken, notification } = usePushNotifications();

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