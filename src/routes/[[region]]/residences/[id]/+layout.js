import { api, initApi } from '$lib/api.svelte.js';

import { userState } from '$lib/states/user.svelte.js';

export const prerender = false;
export async function load({ params, depends }) {
	depends('data:residence');

	const { user } = userState;
	const { id } = params;

	await initApi();

	const residence = await api.getResidenceById(id);
	const { societyId } = residence;
	const society = await api.getSocietyById(societyId);
	const fund = await api.getResidenceFundByResidenceId(id);
	const maintenances = await api.getAllMaintenances(societyId, id);
	const maintenancePayments = await api.getMaintenancePaymentsByResidenceId(id);
	const users = await api.getResidenceUsers(id);

	let isMember = false;
	if (user) {
		const { isPresent } = await api.isUserInResidence(id, user.id);
		isMember = isPresent;
	}
	let isAdmin = false;
	if (user) {
		const roleDetails = await api.getUserRoleInSociety(societyId, user.id);
		isAdmin = roleDetails && roleDetails.role === 'admin';
	}

	return {
		residence,
		society,
		users,
		fund,
		maintenances,
		maintenancePayments,
		isMember,
		isAdmin
	};
}
