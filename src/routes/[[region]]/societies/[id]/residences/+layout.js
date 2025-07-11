import { api, initApi } from '$lib/api.svelte.js';
import { userState } from '$lib/states/user.svelte.js';

export async function load({ params }) {
	const { id } = params;
	await initApi();
	const residences = await api.getAllResidencesInSociety(id);
	const userResidences = await api.getUserResidencesInSociety(id, userState.user.id);
	return { residences, userResidences };
}
