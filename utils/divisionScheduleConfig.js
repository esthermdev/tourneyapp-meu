// app/config/divisionConfig.js
export const divisionScheduleConfig = {
    men_upper: {
        title: 'Men - Upper',
        color: '#2871FF',
        icon: 'people-group',
        scheduleOptions: [
            { code: 'MU', title: 'Pool Play', route: 'pool-play', icon: 'sun', iconColor: '#2A9D8F', bgColor: '#2A9D8F1A' },
            { code: 'MU', title: 'Championship Bracket', route: 'championship-bracket', icon: 'trophy', iconColor: '#CF3A3A', bgColor: '#CF3A3A1A' },
            { code: 'MU', title: '3rd to 7th Place', route: 'placement-games', icon: 'medal', iconColor: '#FB8B24', bgColor: '#FB8B241A' },
            { code: 'MU', title: '9th Place', route: 'ninth-place', icon: 'award', iconColor: '#DC580E', bgColor: '#DC580E1A' },
            { code: 'MU', title: '11th to 15th Place', route: '11-15-place', icon: 'award', iconColor: '#B0A00F', bgColor: '#B0A00F1A' },
        ],
        disabled: false
    },
    men_middle: {
        title: 'Men - Middle',
        color: '#0AB359',
        icon: 'people-group',
        scheduleOptions: [
            { title: 'Pool Play', route: 'pool-play', icon: 'sun', iconColor: '#2A9D8F', bgColor: '#2A9D8F1A' },
            { title: 'Championship Bracket', route: 'championship-bracket', icon: 'trophy', iconColor: '#CF3A3A', bgColor: '#CF3A3A1A' },
            { title: 'Placement Games', route: 'placement-games', icon: 'medal', iconColor: '#FB8B24', bgColor: '#FB8B241A' },
        ],
        disabled: true
    },
    men_lower: {
        title: 'Men - Lower',
        color: '#F2A541',
        icon: 'people-group',
        scheduleOptions: [
            { title: 'Round Robin', route: 'round-robin', icon: 'sync', iconColor: '#2A9D8F', bgColor: '#2A9D8F1A' },
            { title: 'Finals', route: 'finals', icon: 'trophy', iconColor: '#CF3A3A', bgColor: '#CF3A3A1A' },
        ],
        disabled: true
    },
    women_upper: {
        title: 'Women - Upper',
        color: '#FF026C',
        icon: 'people-group',
        scheduleOptions: [
            { title: 'Pool Play', route: 'pool-play', icon: 'sun', iconColor: '#2A9D8F', bgColor: '#2A9D8F1A' },
            { title: 'Championship Bracket', route: 'championship-bracket', icon: 'trophy', iconColor: '#CF3A3A', bgColor: '#CF3A3A1A' },
            { title: 'Placement Games', route: 'placement-games', icon: 'medal', iconColor: '#FB8B24', bgColor: '#FB8B241A' },
        ],
        disabled: true
    },
    women_lower: {
        title: 'Women - Lower',
        color: '#BD41F2',
        icon: 'people-group',
        scheduleOptions: [
            { title: 'Round Robin', route: 'round-robin', icon: 'sync', iconColor: '#2A9D8F', bgColor: '#2A9D8F1A' },
            { title: 'Finals', route: 'finals', icon: 'trophy', iconColor: '#CF3A3A', bgColor: '#CF3A3A1A' },
        ],
        disabled: true
    },
    mixed: {
        title: 'Mixed',
        color: '#FF7429',
        icon: 'people-group',
        scheduleOptions: [
            { title: 'Pool Play', route: 'pool-play', icon: 'sun', iconColor: '#2A9D8F', bgColor: '#2A9D8F1A' },
            { title: 'Championship Bracket', route: 'championship-bracket', icon: 'trophy', iconColor: '#CF3A3A', bgColor: '#CF3A3A1A' },
            { title: 'Placement Games', route: 'placement-games', icon: 'medal', iconColor: '#FB8B24', bgColor: '#FB8B241A' },
        ],
        disabled: true
    },
};