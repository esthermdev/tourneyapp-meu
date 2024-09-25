import { Stack } from 'expo-router';

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='fieldmap' options={{ headerShown: false }} />
      <Stack.Screen name='mygames' options={{ headerShown: false }} />
      <Stack.Screen name='volunteers' options={{ headerShown: false }} />
    </Stack>
  )
}

export default HomeLayout;