import { Stack } from 'expo-router';

const StandingsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Standings', headerShown: false }} />
      <Stack.Screen name="mixed" options={{ title: 'Mixed', headerShown: true }} />
      {/* <Stack.Screen name="open" options={{ headerShown: false }} /> */}
    </Stack>
  );
};

export default StandingsLayout;