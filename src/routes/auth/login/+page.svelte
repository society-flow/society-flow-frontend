<script lang="typescript">
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { userState } from '$lib/states/user.svelte.js';
	import { goto } from '$app/navigation';
	import Login from '$lib/components/auth/login.svelte';

	async function onLogin() {
		setTimeout(() => goto(`${base}/auth/logout`), 0);
	}

	$effect(() => {
		userState.isAuth ? onLogin() : null;
	});
</script>

<svelte:head>
	<title>{$_('menu.login')}</title>
</svelte:head>

<h1>
	{$_('menu.login')}
</h1>

{#if !userState.isAuth}
	<Login />
	<p>
		You don't have an account yet?'
		<a href="{base}/auth/register">
			{$_('menu.register')}
		</a>
		a new user.
	</p>
{/if}
