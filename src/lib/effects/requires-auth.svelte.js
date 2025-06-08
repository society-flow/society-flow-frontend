import { base } from '$app/paths';
import { goto } from '$app/navigation';
import { DEFAULT_LOCALE } from '$lib/i18n.js';
import { userState } from '$lib/states/user.svelte.js';

export default function requiresAuth(locale = DEFAULT_LOCALE) {
	const isAuth = $derived(userState.isAuth);
	$effect(() => {
		if (!isAuth) {
			setTimeout(() => goto(`${base}/${locale}/auth/login`), 0);
		}
	});
}
