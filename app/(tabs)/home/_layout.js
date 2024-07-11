import { Stack } from 'expo-router';

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='fieldmap' />
      <Stack.Screen name='mygames' options={{ headerShown: true, headerTitle: 'My Games', headerBackTitle: 'Home'  }} />
      <Stack.Screen name='reportscores' />
    </Stack>
  )
}

export default HomeLayout;