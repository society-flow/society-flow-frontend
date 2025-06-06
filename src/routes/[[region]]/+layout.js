import { localeIsSupported, DEFAULT_LOCALE } from '$lib/i18n';
import { browser } from '$app/environment';
import { redirect, error } from '@sveltejs/kit';
import { locale, waitLocale } from 'svelte-i18n';

export const load = async ({ url }) => {
	const userLocaleRoot = navigator?.language.split('-')[0];
	const userLocaleSupported = localeIsSupported(userLocaleRoot);

	const reqLocale = url.pathname.slice(1).split('/')[0]; // e.g., 'en' or 'en-GB'
	const reqLocaleRoot = reqLocale.split('-')[0]; // e.g., 'en'
	const reqLocaleSupported = localeIsSupported(reqLocaleRoot);

	function buildPath(root) {
		return `/${root}${url.pathname.slice(reqLocale.length + 1)}`;
	}

	if (reqLocaleSupported) {
		console.info('reqLocaleSupported', reqLocaleRoot);
		locale.set(reqLocale);
		return;
	}

	if (userLocaleSupported) {
		console.info('userLocaleSupported', userLocaleRoot);
		locale.set(userLocaleRoot);
		throw redirect(307, buildPath(userLocaleRoot));
	}

	if (!reqLocaleSupported) {
		console.info('!reqLocaleSupported', reqLocaleRoot);
		locale.set(DEFAULT_LOCALE);
		throw redirect(307, buildPath(DEFAULT_LOCALE));
	}
};
