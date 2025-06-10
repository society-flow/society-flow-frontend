export const ssr = false;
export const prerender = true;

import { waitLocale } from 'svelte-i18n';
import '$lib/i18n';
import { initApi } from '$lib/api.svelte';

export const load = async () => {
	await waitLocale();
	await initApi();
};
