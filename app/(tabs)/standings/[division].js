import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import CustomHeader from '../../../components/CustomHeader';
import StandingsComponent from '../../../components/StandingsComponent';

const DivisionStandings = () => {
    const { division } = useLocalSearchParams();

    const getDivisionTitle = (division) => {
        switch (division) {
            case 'men_upper': return 'Men - Upper';
            case 'men_middle': return 'Men - Middle';
            case 'men_lower': return 'Men - Lower';
            case 'women_upper': return 'Women - Upper';
            case 'women_lower': return 'Women - Lower';
            case 'mixed': return 'Mixed';
            default: return 'Standings';
        }
    };

    return (
        <View style={styles.container}>
            <CustomHeader title={getDivisionTitle(division)} route='standings' />
            <StandingsComponent division={division} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

export default DivisionStandings;