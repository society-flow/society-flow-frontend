<script lang="typescript">
	import { _ } from 'svelte-i18n';
  import {base} from "$app/paths"
	import Logout from '$lib/components/auth/logout.svelte';
	import { userState } from '$lib/states/user.svelte.js';
	import { goto } from '$app/navigation';

	const isNotAuth = $derived(!userState.isAuth);

	async function onLogout() {
		if (isNotAuth) {
			setTimeout(() => goto(`${base}/auth/login`), 0);
		}
	}

	$effect(() => {
		isNotAuth ? onLogout() : null;
	});
</script>

<svelte:head>
	<title>{$_('menu.logout')}</title>
</svelte:head>

<h1>
	{$_('menu.logout')}
</h1>

<Logout />
