<script lang="typescript">
	import { _ } from 'svelte-i18n';
	import Logout from '$lib/components/auth/logout.svelte';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import { userState } from '$lib/states/user.svelte.js';

	requiresAuth();
</script>

<svelte:head>
	<title>{$_('menu.logout')}</title>
</svelte:head>

<h1>
	{$_('menu.logout')}
</h1>

{#if userState.isAuth}
	<Logout />
{/if}
