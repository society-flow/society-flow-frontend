export const ssr = false;
export const prerender = true;

import { waitLocale } from 'svelte-i18n';
import '$lib/i18n';

export const load = async () => {
	await waitLocale();
};
