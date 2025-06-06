<script lang="javascript">
	import { _, json } from 'svelte-i18n';
	import { page } from '$app/state';
	import { userState } from '$lib/states/user.svelte';
	import SettingsApi from '$lib/components/settings/api.svelte';
	import Page from '$lib/components/routes/page.svelte';

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

	// grab all "settings.sections" from JSON
	const sections = $derived($json('pages.settings.sections'));
</script>

<Page title={$_('menu.settings')}>
	{#snippet header()}
		<h1>{$_('menu.settings')}</h1>
	{/snippet}

	{#each Object.entries(sections) as [key, section]}
		<section>
			<header>
				<h1>{section.title}</h1>
			</header>

			{#if key === 'development'}
				<SettingsApi {apiUrl} />
			{/if}

			{#if key === 'demo'}
				{#if !userState.isAuth}
					<button on:click={onclick}>
						{section.loginText}
					</button>
				{/if}

				{#if userState.isDemo}
					<button on:click={userState.logout}>
						{section.logoutText}
					</button>
				{/if}
			{/if}
		</section>
	{/each}
</Page>
