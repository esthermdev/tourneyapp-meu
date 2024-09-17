import { Stack } from 'expo-router';

const StandingsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Standings', headerShown: false }} />
      <Stack.Screen name="mixed" options={{ title: 'Mixed', headerShown: false }} />
      <Stack.Screen name="upper_open" options={{ title: 'Open', headerShown: false }} />
    </Stack>
  );
};

export default StandingsLayout;