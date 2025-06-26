import { api, initApi } from '$lib/api.svelte.js';

export const prerender = false;

export async function load({ depends }) {
	depends('data:ads');

	await initApi();
	const adTypes = await api.getAllAdTypes();

	return { adTypes };
}
