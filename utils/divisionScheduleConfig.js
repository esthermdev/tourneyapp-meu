// app/config/divisionConfig.js
export const divisionScheduleConfig = {
    men_upper: {
        title: 'Men - Upper',
        color: '#2871FF',
        icon: 'people-group',
        scheduleOptions: [
            { code: 'MU', title: 'Pool Play', route: 'pool-play', icon: 'sun', iconColor: '#2A9D8F', bgColor: '#2A9D8F1A' },
            { code: 'MU', title: 'Championship Bracket', route: 'championship-bracket-no-crossovers', icon: 'trophy', iconColor: '#CF3A3A', bgColor: '#CF3A3A1A' },
            { code: 'MU', title: '3rd to 7th Place', route: 'placement-games', icon: 'medal', iconColor: '#FB8B24', bgColor: '#FB8B241A' },
            { code: 'MU', title: '9th Place', route: 'ninth-place', icon: 'award', iconColor: '#DC580E', bgColor: '#DC580E1A' },
            { code: 'MU', title: '11th to 15th Place', route: '11-15-place', icon: 'award', iconColor: '#B0A00F', bgColor: '#B0A00F1A' },
        ],
        disabled: false
    },
    women_upper: {
        title: 'Women - Upper',
        color: '#FF026C',
        icon: 'people-group',
        scheduleOptions: [
            { code: 'WU', title: 'Pool Play', route: 'pool-play', icon: 'sun', iconColor: '#2A9D8F', bgColor: '#2A9D8F1A' },
            { code: 'WU', title: 'Championship Bracket', route: 'championship-bracket-no-crossovers', icon: 'trophy', iconColor: '#CF3A3A', bgColor: '#CF3A3A1A' },
            { code: 'WU', title: 'Placement Games', route: 'placement-games', icon: 'medal', iconColor: '#FB8B24', bgColor: '#FB8B241A' },
            { code: 'WU', title: '9th Place', route: 'ninth-place', icon: 'award', iconColor: '#DC580E', bgColor: '#DC580E1A' },
            { code: 'WU', title: '11th to 15th Place', route: '11-15-place', icon: 'award', iconColor: '#B0A00F', bgColor: '#B0A00F1A' },
        ],
        disabled: false
    },
    men_middle: {
        title: 'Men - Middle',
        color: '#0AB359',
        icon: 'people-group',
        scheduleOptions: [
            { code: 'MM', title: 'Pool Play', route: 'pool-play', icon: 'sun', iconColor: '#2A9D8F', bgColor: '#2A9D8F1A' },
            { code: 'MM', title: 'Championship Bracket', route: 'championship-bracket-no-crossovers', icon: 'trophy', iconColor: '#CF3A3A', bgColor: '#CF3A3A1A' },
            { code: 'MM', title: 'Placement Games', route: 'placement-games', icon: 'medal', iconColor: '#FB8B24', bgColor: '#FB8B241A' },
            { code: 'MM', title: '9th Place', route: 'ninth-place', icon: 'award', iconColor: '#DC580E', bgColor: '#DC580E1A' },
            { code: 'MM', title: '11th to 15th Place', route: '11-15-place', icon: 'award', iconColor: '#B0A00F', bgColor: '#B0A00F1A' },
        ],
        disabled: false
    },
    women_lower: {
        title: 'Women - Lower',
        color: '#BD41F2',
        icon: 'people-group',
        scheduleOptions: [
            { code: 'WL', title: 'Pool Play', route: 'pool-play', icon: 'sun', iconColor: '#2A9D8F', bgColor: '#2A9D8F1A' },
            { code: 'WL', title: 'Championship Bracket', route: 'championship-bracket', icon: 'trophy', iconColor: '#CF3A3A', bgColor: '#CF3A3A1A' },
            { code: 'WL', title: 'Placement Games', route: 'placement-games', icon: 'medal', iconColor: '#FB8B24', bgColor: '#FB8B241A' },
            { code: 'WL', title: 'Round Robin', route: 'round-robin', icon: 'award', iconColor: '#B0A00F', bgColor: '#B0A00F1A' },
        ],
        disabled: false
    },
    men_lower: {
        title: 'Men - Lower',
        color: '#F2A541',
        icon: 'people-group',
        scheduleOptions: [
            { code: 'ML', title: 'Pool Play', route: 'pool-play', icon: 'sun', iconColor: '#2A9D8F', bgColor: '#2A9D8F1A' },
            { code: 'ML', title: 'Championship Bracket', route: 'championship-bracket-no-crossovers', icon: 'trophy', iconColor: '#CF3A3A', bgColor: '#CF3A3A1A' },
            { code: 'ML', title: 'Placement Games', route: 'placement-games', icon: 'medal', iconColor: '#FB8B24', bgColor: '#FB8B241A' },
            { code: 'ML', title: '9th Place', route: 'ninth-place', icon: 'award', iconColor: '#DC580E', bgColor: '#DC580E1A' },
            { code: 'ML', title: '11th to 15th Place', route: '11-15-place', icon: 'award', iconColor: '#B0A00F', bgColor: '#B0A00F1A' },
        ],
        disabled: false
    },
    mixed: {
        title: 'Mixed',
        color: '#FF7429',
        icon: 'people-group',
        scheduleOptions: [
            { code: 'X', title: 'Pool Play', route: 'pool-play', icon: 'sun', iconColor: '#2A9D8F', bgColor: '#2A9D8F1A' },
            { code: 'X', title: 'Championship Bracket', route: 'championship-bracket-no-crossovers', icon: 'trophy', iconColor: '#CF3A3A', bgColor: '#CF3A3A1A' },
            { code: 'X', title: 'Placement Games', route: 'placement-games', icon: 'medal', iconColor: '#FB8B24', bgColor: '#FB8B241A' },
            { code: 'X', title: '9th Place Pool', route: 'ninth-place-pool', icon: 'award', iconColor: '#B0A00F', bgColor: '#B0A00F1A' },
        ],
        disabled: false
    },
};