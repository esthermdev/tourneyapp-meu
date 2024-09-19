import { Stack } from 'expo-router';

const StandingsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="men_upper" options={{ headerShown: false }} />
    </Stack>
  );
};

export default StandingsLayout;