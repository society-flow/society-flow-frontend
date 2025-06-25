import { api, initApi } from '$lib/api.svelte.js';

import { userState } from '$lib/states/user.svelte.js';

export async function load({ params }) {
	const { user } = userState;
	const { id } = params;

	await initApi();

	const residence = await api.getResidenceById(id);
	const users = await api.getResidenceUsers(id);
	const isMember = !!users.find((u) => u.id === user?.id);
	const society = residence.societyId ? await api.getSocietyById(residence.societyId) : null;

	return {
		residence,
		users,
		isMember,
		society
	};
}
