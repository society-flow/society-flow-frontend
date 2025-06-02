export default [
	{
		id: 1,
		name: 'flat-1',
		role: 'Admin',
		society: 'Reichenbergerstr.21',
		residence_fund_eur: 48,
		area: 70,
		total_active_residents: 2,
		floor_count: -3,
		maintenance: [
			{
				yearMonth: '202506',
				isActive: true,
				carryOver: 70,
				fine: 3.25,
				currentExpense: 150,
				totalToPay: 223.25
			},
			{
				yearMonth: '202505',
				isActive: false,
				carryOver: 0,
				fine: 0,
				currentExpense: 150,
				totalToPay: 150,
				formula: 'xyz Imnop ...'
			}
		],
		payments: [
			{
				timestamp: '2025-05-03T10:00:00Z',
				amount: 50,
				maintenanceYearMonth: '202505',
				description: 'Paid from m26 with reference01',
				paidByUser: 'Vivian'
			},
			{
				timestamp: '2025-05-13T20:20:00Z',
				amount: 30,
				maintenanceYearMonth: '202505',
				description: 'Paid from m26 with reference02',
				paidByUser: 'Julia'
			}
		]
	},
	{
		id: 2,
		name: 'falt-2',
		role: 'Member',
		society: 'Reichenbergerstr.21',
		residence_fund_eur: 211,
		area: 12,
		total_active_residents: 4,
		floor_count: 3,
		maintenance: [
			{
				yearMonth: '202402',
				isActive: false,
				carryOver: 10,
				fine: 0,
				currentExpense: 11,
				totalToPay: 22
			},
			{
				yearMonth: '202505',
				isActive: false,
				carryOver: 0,
				fine: 0,
				currentExpense: 150,
				totalToPay: 150,
				formula: 'xyz Imnop ...'
			}
		],
		payments: [
			{
				timestamp: '2025-05-03T10:00:00Z',
				amount: 50,
				maintenanceYearMonth: '202505',
				description: 'Paid from m26 with reference01',
				paidByUser: 'Vivian'
			},
			{
				timestamp: '2025-05-13T20:20:00Z',
				amount: 30,
				maintenanceYearMonth: '202505',
				description: 'Paid from m26 with reference02',
				paidByUser: 'Julia'
			}
		]
	}
];
