<script lang="typescript">
	import { _, locale } from 'svelte-i18n';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import { userState } from '$lib/states/user.svelte.js';
	import Logout from '$lib/components/auth/logout.svelte';
	import Page from '$lib/components/routes/page.svelte';

	requiresAuth($locale);
</script>

<Page title={$_('menu.logout')}>
	{#snippet header()}
		<h1>
			{$_('menu.logout')}
		</h1>
	{/snippet}
	{#if userState.isAuth}
		<section>
			<Logout />
		</section>
	{/if}
</Page>
