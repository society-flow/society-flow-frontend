export default [
	{
		id: 1,
		name: 'Paul Linke',
		role: 'Admin',
		society_fund_eur: 5098,
		locale: 'DE',
		total_active_residences: 12,
		jurisdiction: 'DE',
		total_active_residents: 25,
		time_zone: 'berlin/Europe',
		area_unit: 'Meter square',
		currency_code: 'EUR',
		wall_posts_from_admin: [
			{
				date: '2025-05-31T09:30:00Z',
				message:
					'We contacted with new house cleaning service Agatha Agency. Received quotation of 450 Eur Per month. Will replace the current cleaning service from 1st July 2025.'
			},
			{
				date: '2025-02-19T15:21:00Z',
				message: 'We are at deficit due to lack of regular payments from flats 3 and 7.'
			}
		],
		posts_from_members: [
			{
				date: '2025-05-11T15:21:00Z',
				message: 'My heating is not working. Please advise a service provider to contact urgently.',
				response: {
					date: '2025-05-12T09:00:00Z',
					message: 'Berghain Gas Limited reachable on 0123456789'
				}
			}
		],
		residences: [1, 2]
	},
	{
		id: 2,
		name: 'Reichenberger',
		role: 'Member',
		society_fund_eur: 2238,
		locale: 'DE',
		total_active_residences: 10,
		jurisdiction: 'DE',
		total_active_residents: 8,
		time_zone: 'berlin/Europe',
		area_unit: 'Meter square',
		currency_code: 'EUR',
		wall_posts_from_admin: [
			{
				date: '2023-02-31T09:30:00Z',
				message: 'Nothing new'
			}
		],
		posts_from_members: [
			{
				date: '2024-01-11T15:21:00Z',
				message: 'Renting my printer.',
				response: {
					date: '2025-05-12T09:00:00Z',
					message: 'Can i print my boarding pass, going to Chicago'
				}
			}
		],
		residences: [2, 1]
	}
];
