import { api, initApi } from '$lib/api.svelte.js';
import { userState } from '$lib/states/user.svelte.js';
import { EXPENSE_DISTRIBUTIONS } from '$lib/const/expense_distribution_types.js';

export const prerender = false;

export async function load({ params, depends }) {
	depends('data:expense');

	const { id } = params;

	await initApi();

	const expense = await api.getExpenseById(id);
	const society = await api.getSocietyById(expense.societyId);

	// Check if user is admin
	let isAdmin = false;
	if (userState.user && expense.societyId) {
		try {
			const roleDetails = await api.getUserRoleInSociety(expense.societyId, userState.user.id);
			isAdmin = roleDetails && roleDetails.role === 'ADMIN';
		} catch (error) {
			console.error('Error checking admin status:', error);
		}
	}

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

	// Fetch distributions, ensuring one entry per type
	let distributions = [];
	if (id) {
		try {
			const fetchedDistributions = await api.getAllExpenseDistributionsByExpenseId(id);
			distributions = Object.keys(EXPENSE_DISTRIBUTIONS).map((mode) => {
				const existing = fetchedDistributions.find((d) => d.calculationMode === mode);
				return existing
					? { ...existing }
					: { expenseId: id, calculationMode: mode, percentageCoverage: 0, isActive: true };
			});
		} catch (error) {
			console.error('Error fetching expense distributions:', error);
			distributions = [];
		}
	}
	return {
		expense,
		society,
		calculations,
		payments,
		distributions,
		isAdmin
	};
}
