export const divisionUpdateScoreConfig = {
	men_upper: [
		{
			code: 'MU',
			title: 'Pool Play',
			type: 'pool',
			pools: 'A,B,C,D',
			bgColor: '#2A9D8F',
			icon: 'sun'
		},
		{
			code: 'MU',
			title: 'Championship Bracket',
			type: 'bracket',
			rounds: [
				{ id: 2, name: 'C' },
				{ id: 3, name: 'Q' },
				{ id: 4, name: 'SF' },
				{ id: 5, name: 'F' }
			],
			bgColor: '#C04343',
			icon: 'trophy'
		},
		{
			code: 'MU',
			title: '3rd to 7th Place',
			type: 'placement',
			rounds: [
				{ id: 6, name: '3rd' },
				{ id: 7, name: '5 SF' },
				{ id: 8, name: '5th' },
				{ id: 9, name: '7th' }
			],
			bgColor: '#B78F22',
			icon: 'medal'
		},
		{
			code: 'MU',
			title: '9th Place',
			type: 'placement',
			rounds: [
				{ id: 10, name: '9 Q' },
				{ id: 11, name: '9 SF' },
				{ id: 12, name: '9th' }
			],
			bgColor: '#820F5B',
			icon: 'award'
		},
		{
			code: 'MU',
			title: '11th to 15th Place',
			type: 'placement',
			rounds: [
				{ id: 13, name: '11th' },
				{ id: 14, name: '13 SF' },
				{ id: 15, name: '13th' },
				{ id: 16, name: '15th' }
			],
			bgColor: '#3830A1',
			icon: 'award'
		},
	],
	// ... Add configurations for other divisions
};