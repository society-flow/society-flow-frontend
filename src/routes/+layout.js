export const ssr = false;
export const prerender = true;

import '$lib/i18n';
import { browser } from '$app/environment';
import { locale, waitLocale } from 'svelte-i18n';

const localeRoot = window.navigator.language.split('-')[0];

export const load = async () => {
	if (browser) {
		locale.set(localeRoot);
	}
	await waitLocale();
};
