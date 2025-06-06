export const ssr = false;
export const prerender = true;

import '$lib/i18n';
import { browser } from '$app/environment';
import { locale, waitLocale } from 'svelte-i18n';

export const load = async () => {
	if (browser) {
		const localeRoot = window.navigator.language.split('-')[0];
		console.log('localeRoot', localeRoot);
		locale.set(localeRoot);
	}
	await waitLocale();
};
