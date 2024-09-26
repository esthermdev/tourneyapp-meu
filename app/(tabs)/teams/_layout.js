import { Stack } from 'expo-router';

const TeamsLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
                name="[id]"
                options={({ route }) => ({
                    title: route.params.teamName,
                    headerBackTitle: 'Teams'
                })}
            />
        </Stack>
    );
};

export default TeamsLayout;