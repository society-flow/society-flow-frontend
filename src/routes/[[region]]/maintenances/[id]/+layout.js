import { api, initApi } from '$lib/api.svelte.js';

export const prerender = false;

export async function load({ params, depends }) {
	depends('data:maintenance');
	const { id } = params;
	await initApi();
	// Fetch the maintenance record
	const maintenance = await api.getMaintenanceById(id);
	// Load related entities
	const society = await api.getSocietyById(maintenance.societyId);
	const residence = await api.getResidenceById(maintenance.residenceId);
	// Load payments
	const payments = await api.getMaintenancePaymentsByMaintenanceId(id);
	return { maintenance, society, residence, payments };
}
