import { api, initApi } from '$lib/api.svelte.js';

export const prerender = false;

export async function load() {
	await initApi();
	const societies = await api.getUserSocieties();
	// Fetch all maintenances per society, annotate with residenceName
	const results = await Promise.all(
		societies.map(async (society) => {
			const residences = await api.getAllResidencesInSociety(society.id);
			const maintByRes = await Promise.all(
				residences.map((res) =>
					api.getAllMaintenances(society.id, res.id).then((list) =>
						list.map((m) => ({ ...m, residenceName: res.residenceName }))
					)
				)
			);
			return maintByRes.flat();
		})
	);
	const dicMaintenances = {};
	societies.forEach((soc, idx) => {
		dicMaintenances[soc.id] = results[idx];
	});
	return { societies, dicMaintenances };
}
