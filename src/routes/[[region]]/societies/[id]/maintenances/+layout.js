import { api, initApi } from '$lib/api.svelte.js';

export async function load({ params, depends, parent }) {
	depends('data:society/maintenances');
	const { id } = params;

	const parentData = await parent();
	const { society } = parentData;

	await initApi();
	const residences = await api.getAllResidencesInSociety(id);
	const maintenancesByResidence = await Promise.all(
		residences.map(async (residence) => {
			const residenceMaintenances = await api.getAllMaintenances(id, residence.id);
			// Add residence name to each maintenance record
			return residenceMaintenances.map((maintenance) => ({
				...maintenance,
				residenceName: residence.residenceName
			}));
		})
	);
	const maintenances = maintenancesByResidence.flat();
	return { maintenances, society };
}
