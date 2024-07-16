import { Stack } from 'expo-router';

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='fieldmap' options={{ headerShown: true, headerTitle: 'Field Map', headerBackTitle: 'Home'  }} />
      <Stack.Screen name='mygames' options={{ headerShown: true, headerTitle: 'My Games', headerBackTitle: 'Home'  }} />
    </Stack>
  )
}

export default HomeLayout;