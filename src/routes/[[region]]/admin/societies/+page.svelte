<script lang="typescript">
	import { _, locale } from 'svelte-i18n';
	import { api } from '$lib/api.svelte.js';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import Anchor from '$lib/components/anchor.svelte';
	import ListSocieties from '$lib/components/societies/list.svelte';

	requiresAuth(locale);

	let societies = $state([]);
	$effect(async () => {
		societies = await api.getAllSocieties();
	});
</script>

<Page title={$_('menu.societies')}>
	{#snippet header()}
		<h1>
			{$_('menu.societies')}
		</h1>
		<Anchor href="/create/societies">
			{$_('menu.create.societies')}
		</Anchor>
	{/snippet}

	<section>
		<ListSocieties {societies} />
	</section>
</Page>
