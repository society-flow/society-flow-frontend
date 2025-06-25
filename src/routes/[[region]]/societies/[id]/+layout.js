import { api, initApi } from '$lib/api.svelte.js';
export const prerender = false;

/**
 * Load society data once for all child routes
 */
export async function load({ params }) {
	const { id } = params;
	// first init api
	await initApi();
	const society = await api.getSocietyById(id);
	return { society };
}
