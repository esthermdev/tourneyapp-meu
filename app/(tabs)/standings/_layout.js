import { Stack } from 'expo-router';

const StandingsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="mixed" options={{ headerShown: false }} />
      {/* <Stack.Screen name="open" options={{ headerShown: false }} /> */}
    </Stack>
  );
};

export default StandingsLayout;