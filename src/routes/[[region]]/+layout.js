import { SUPPORTED_LOCALES } from '$lib/i18n';
import { browser } from '$app/environment';
import { redirect, error } from '@sveltejs/kit';
import { locale, waitLocale } from 'svelte-i18n';

export const load = async ({ url }) => {
	const reqLocale = url.pathname.slice(1).split('/')[0]; // e.g., 'en' or 'en-GB'
	const reqLocaleRoot = reqLocale.split('-')[0]; // e.g., 'en'

	const isExactMatch = SUPPORTED_LOCALES.includes(reqLocale);
	const rootMatch = SUPPORTED_LOCALES.find((loc) => loc.startsWith(reqLocaleRoot));

	// If the exact locale is valid, continue as is.
	if (isExactMatch) {
		locale.set(reqLocale);
		await waitLocale();
		return;
	}

	// If there's a partial root match (e.g., 'en' => 'en-GB'), redirect to that.
	if (rootMatch) {
		throw redirect(307, `/${rootMatch}${url.pathname.slice(reqLocale.length + 1)}`);
	}

	// Otherwise, it's unknown — throw a 404.
	throw error(404, `Page not found. The requested page does not exist on this website.`);
};
