<script lang="javascript">
	import { _, json } from 'svelte-i18n';
	import { page } from '$app/state';
	import { userState } from '$lib/states/user.svelte';
	import SettingsApi from '$lib/components/settings/api.svelte';
	import Page from '$lib/components/routes/page.svelte';

	const apiUrl = page.url.searchParams.get('api-url');

	function loginDemoUser() {
		userState.loginDemo();
	}

	async function logoutDemoUser() {
		await userState.logout();
	}

	const sections = $derived($json('pages.settings.sections'));
</script>

<Page title={$_('menu.settings')}>
	{#each Object.entries(sections) as [key, section]}
		<section>
			{#if key === 'development'}
				<header>
					<h1>{section.title}</h1>
				</header>
				<SettingsApi {apiUrl} />
			{/if}

			{#if key === 'demo'}
				{#if !userState.isAuth}
					<header>
						<h1>{section.title}</h1>
					</header>

					<button onclick={loginDemoUser}>
						{section.loginText}
					</button>
				{/if}

				{#if userState.isDemo}
					<button onclick={logoutDemoUser}>
						{section.logoutText}
					</button>
				{/if}
			{/if}
		</section>
	{/each}
</Page>
