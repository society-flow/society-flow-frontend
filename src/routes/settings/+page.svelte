<script lang>
	import { _ } from 'svelte-i18n';
	import { page } from '$app/state';
	import SettingsApi from '$lib/components/settings/api.svelte';
	import { userState } from '$lib/states/user.svelte';

	const apiUrl = page.url.searchParams.get('api-url');
	function onclick() {
		console.log('clicked');
		userState.setUser({
			id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
			email: 'demo@example.com',
			name: 'Demo User',
			createdAt: '2025-06-04T05:41:36.367Z',
			updatedAt: '2025-06-04T05:41:36.367Z'
		});
	}
</script>

<svelte:head>
	<title>{$_('menu.settings')}</title>
</svelte:head>

<header>
	<h1>
		{$_('menu.settings')}
	</h1>
</header>

<section>
	<h1>Development</h1>
	<SettingsApi {apiUrl} />
</section>

<section>
	<header>
		<h1>Demo</h1>
	</header>
	{#if !userState.isAuth}
		<button {onclick}> Log in demo user</button>
	{/if}
	{#if userState.isDemo}
		<button onclick={userState.logout()} type="submit"> Log out demo user</button>
	{/if}
</section>
