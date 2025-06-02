<script lang="typescript">
	import { _ } from 'svelte-i18n';
	import Login from '$lib/components/login.svelte';
	import { userState } from '$lib/states/user.svelte.js';
	import { goto } from '$app/navigation';

	async function onLogin() {
		if (userState.isAuth) {
			setTimeout(() => goto('/auth/logout'), 0);
		}
	}

	$effect(() => {
		onLogin();
	});

	$effect(() => {
		userState.isAuth ? goto('/auth/logout') : null;
	});
</script>

<svelte:head>
	<title>{$_('menu.login')}</title>
</svelte:head>

<h1>
	{$_('menu.login')}
</h1>

<Login />
