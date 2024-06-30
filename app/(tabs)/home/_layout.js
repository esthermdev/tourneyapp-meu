import { StyleSheet, Text, View } from 'react-native';
import { Stack } from 'expo-router';

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index'options={{ headerShown: false} }/>
    </Stack>
  )
}

export default HomeLayout

const styles = StyleSheet.create({})