export const divisionUpdateScoreConfig = {
	men_upper: [
		{
			code: 'MU',
			title: 'Pool Play',
			type: 'pool',
			pools: [
				{ id: 1, name: 'A' },
				{ id: 2, name: 'B' },
				{ id: 3, name: 'C' },
				{ id: 4, name: 'D' }
			],
			bgColor: '#2A9D8F',
			icon: 'sun'
		},
		{
			code: 'MU',
			title: 'Championship Bracket',
			type: 'bracket',
			rounds: [
				{ id: 3, name: 'Q', title: 'Quarters' },
				{ id: 4, name: 'SF', title: 'Semi Finals' },
				{ id: 5, name: 'F', title: 'Finals' }
			],
			bgColor: '#C04343',
			icon: 'trophy'
		},
		{
			code: 'MU',
			title: '3rd to 7th Place',
			type: 'placement',
			rounds: [
				{ id: 6, name: '3rd', title: '3rd Place' },
				{ id: 7, name: '5 SF', title: '5th Semis' },
				{ id: 8, name: '5th', title: '5th Place' },
				{ id: 9, name: '7th', title: '7th Place' }
			],
			bgColor: '#B78F22',
			icon: 'medal'
		},
		{
			code: 'MU',
			title: '9th Place',
			type: 'placement',
			rounds: [
				{ id: 10, name: '9 Q', title: '9th Quarters' },
				{ id: 11, name: '9 SF', title: '9th Semis' },
				{ id: 12, name: '9th', title: '9th Finals' }
			],
			bgColor: '#820F5B',
			icon: 'award'
		},
		{
			code: 'MU',
			title: '11th to 15th Place',
			type: 'placement',
			rounds: [
				{ id: 13, name: '11th', title: '11th Place' },
				{ id: 14, name: '13 SF', title: '13th Semis' },
				{ id: 15, name: '13th', title: '13th Place' },
				{ id: 16, name: '15th', title: '15th Place' }
			],
			bgColor: '#3830A1',
			icon: 'award'
		},
	],
	women_upper: [
		{
			code: 'WU',
			title: 'Pool Play',
			type: 'pool',
			pools: [
				{ id: 15, name: 'M' },
				{ id: 16, name: 'N' },
				{ id: 17, name: 'O' },
				{ id: 18, name: 'P' }
			],
			bgColor: '#2A9D8F',
			icon: 'sun'
		},
		{
			code: 'WU',
			title: 'Championship Bracket',
			type: 'bracket',
			rounds: [
				{ id: 3, name: 'Q', title: 'Quarters' },
				{ id: 4, name: 'SF', title: 'Semi Finals' },
				{ id: 5, name: 'F', title: 'Finals' }
			],
			bgColor: '#C04343',
			icon: 'trophy'
		},
		{
			code: 'WU',
			title: '3rd to 7th Place',
			type: 'placement',
			rounds: [
				{ id: 6, name: '3rd', title: '3rd Place' },
				{ id: 7, name: '5 SF', title: '5th Semis' },
				{ id: 8, name: '5th', title: '5th Place' },
				{ id: 9, name: '7th', title: '7th Place' }
			],
			bgColor: '#B78F22',
			icon: 'medal'
		},
		{
			code: 'WU',
			title: '9th Place',
			type: 'placement',
			rounds: [
				{ id: 10, name: '9 Q', title: '9th Quarters' },
				{ id: 11, name: '9 SF', title: '9th Semis' },
				{ id: 12, name: '9th', title: '9th Finals' }
			],
			bgColor: '#820F5B',
			icon: 'award'
		},
		{
			code: 'WU',
			title: '11th to 15th Place',
			type: 'placement',
			rounds: [
				{ id: 13, name: '11th', title: '11th Place' },
				{ id: 14, name: '13 SF', title: '13th Semis' },
				{ id: 15, name: '13th', title: '13th Place' },
				{ id: 16, name: '15th', title: '15th Place' }
			],
			bgColor: '#3830A1',
			icon: 'award'
		},
	],
	mixed: [
		{
			code: 'X',
			title: 'Pool Play',
			type: 'pool',
			pools: [
				{ id: 23, name: 'A' },
				{ id: 24, name: 'B' },
				{ id: 25, name: 'C' },
				{ id: 26, name: 'D' }
			],
			bgColor: '#2A9D8F',
			icon: 'sun'
		},
		{
			code: 'X',
			title: 'Championship Bracket',
			type: 'bracket',
			rounds: [
				{ id: 2, name: 'CP', title: 'Crossover' },
				{ id: 3, name: 'Q', title: 'Quarters' },
				{ id: 4, name: 'SF', title: 'Semi Finals' },
				{ id: 5, name: 'F', title: 'Finals' }
			],
			bgColor: '#C04343',
			icon: 'trophy'
		},
		{
			code: 'X',
			title: '9th Place Pool',
			type: 'placement-notab',
			rounds: [
				{ id: 20, name: '9th', title: '9th Place Pool' },
			],
			bgColor: '#B78F22',
			icon: 'medal'
		},
	],
	// ... Add configurations for other divisions
};