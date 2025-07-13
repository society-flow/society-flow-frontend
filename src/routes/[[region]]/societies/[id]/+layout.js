import { api, initApi } from '$lib/api.svelte.js';
import { userState } from '$lib/states/user.svelte.js';

export const prerender = false;

export async function load({ params, depends }) {
	depends('data:society');

	const { id } = params;
	await initApi();
	const society = await api.getSocietyById(id);
	const userRole = await api.getUserRoleInSociety(id, userState.user.id);
	const fund = await api.getSocietyFundBySocietyId(id);
	const count = await api.countResidencesInSociety(id);
	const { count: residencesCount } = count;

	const isAdmin = userRole?.role === 'ADMIN';

	return { society, residencesCount, fund, userRole, isAdmin };
}
