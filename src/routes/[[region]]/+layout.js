import { locale, waitLocale } from 'svelte-i18n';
import { redirect } from '@sveltejs/kit';
import { browser } from '$app/environment';
import { base } from '$app/paths';
import { localeIsSupported, DEFAULT_LOCALE } from '$lib/i18n';

export const load = async ({ url }) => {
	const pathname = url.pathname.startsWith(base) ? url.pathname.slice(base.length) : url.pathname;

	const reqLocale = pathname.slice(1).split('/')[0]; // e.g., 'en' or 'en-GB'
	const reqLocaleRoot = reqLocale.split('-')[0];
	const reqLocaleSupported = localeIsSupported(reqLocale);

	let userLocaleRoot;
	let userLocaleSupported = false;

	if (browser) {
		userLocaleRoot = navigator.language.split('-')[0];
		userLocaleSupported = localeIsSupported(userLocaleRoot);
	}

	const buildPath = (newLocale) => `${base}/${newLocale}${pathname.slice(reqLocale.length + 1)}`;

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
