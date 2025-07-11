import { api, initApi } from '$lib/api.svelte.js';

export const prerender = false;

export async function load() {
	await initApi();
	const societies = await api.getUserSocieties();
	const results = await Promise.all(societies.map((soc) => api.getAllExpensesBySociety(soc.id)));
	const dicExpenses = {};
	societies.forEach((soc, idx) => {
		dicExpenses[soc.id] = results[idx];
	});
	return { societies, dicExpenses };
}
