import { api, initApi } from '$lib/api.svelte.js';

import { userState } from '$lib/states/user.svelte.js';

export const prerender = false;

export async function load({ params, depends }) {
	depends('data:expense');

	const { id } = params;

	await initApi();

	const expense = await api.getExpenseById(id);
	const society = await api.getSocietyById(expense.societyId);

	let calculations = [];
	if (id && expense.societyId) {
		try {
			const rawCalculations = await api.getAllCalculationsByExpense(id);
			const residences = await api.getAllResidencesInSociety(expense.societyId);

			// Enrich calculations with residence names
			calculations = rawCalculations.map((calculation) => {
				const residence = residences.find((r) => r.id === calculation.residenceId);
				return {
					...calculation,
					residenceName: residence?.residenceName || calculation.residenceId
				};
			});
		} catch (error) {
			console.error('Error fetching calculations:', error);
			calculations = [];
		}
	}

	let payments = [];
	if (id) {
		try {
			const result = await api.getExpensePaymentsByExpenseId(id);
			payments = result;
		} catch (error) {
			console.error('Error fetching expense payments:', error);
			payments = [];
		}
	}

	return {
		expense,
		society,
		calculations,
		payments
	};
}
