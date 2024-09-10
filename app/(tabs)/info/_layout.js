import { Stack } from 'expo-router';

const InfoLayout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false,
                }}
            />
            {/* <Stack.Screen
                name="essential-info"
                options={{
                    title: 'Essential Info',
                    headerBackTitle: 'Information',
                }}
            />
            <Stack.Screen
                name="rules"
                options={{
                    title: 'Rules',
                    headerBackTitle: 'Information',
                }}
            />
            <Stack.Screen
                name="map"
                options={{
                    title: 'Map',
                    headerBackTitle: 'Information',
                }}
            />
            <Stack.Screen
                name="emergency"
                options={{
                    title: 'In Case of Emergency',
                    headerBackTitle: 'Information',
                }}
            />
            <Stack.Screen
                name="food-drinks"
                options={{
                    title: 'Food & Drinks',
                    headerBackTitle: 'Information',
                }}
            />
            <Stack.Screen
                name="credits"
                options={{
                    title: 'Credits',
                    headerBackTitle: 'Information',
                }}
            /> */}
        </Stack>
    );
};

export default InfoLayout;