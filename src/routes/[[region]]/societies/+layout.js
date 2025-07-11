import { api, initApi } from '$lib/api.svelte.js';

export const prerender = false;

export async function load() {
    await initApi();
    const societies = await api.getUserSocieties();
    return { societies };
}
