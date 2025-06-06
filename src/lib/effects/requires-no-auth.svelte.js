import { userState } from '$lib/states/user.svelte.js';
import { base } from '$app/paths';
import { goto } from '$app/navigation';

export default function requiresNoAuth(locale = 'en') {
	const isAuth = $derived(userState.isAuth);

	$effect(() => {
		if (isAuth) {
			setTimeout(() => goto(`${base}/${locale}/auth/logout`), 0);
		}
	});
}
