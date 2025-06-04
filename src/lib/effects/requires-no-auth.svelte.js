import { userState } from '$lib/states/user.svelte.js';
import { base } from '$app/paths';
import { goto } from '$app/navigation';

export default function requiresNoAuth() {
	const isAuth = $derived(userState.isAuth);

	$effect(() => {
		if (isAuth) {
			setTimeout(() => goto(`${base}/`), 0);
		}
	});
}
