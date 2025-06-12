<script lang="javascript">
	import { _, locale } from 'svelte-i18n';
	import { base } from '$app/paths';
	// import { api } from '$lib/api.svelte.js';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import ListResidences from '$lib/components/residences/list.svelte';
	import Page from '$lib/components/routes/page.svelte';
	import Anchor from '$lib/components/anchor.svelte';

	requiresAuth(locale);

	let residences = $state([]);
	$effect(async () => {
		// residences = await api.getResidences();
	});
</script>

<Page title={$_('menu.residences')}>
	{#snippet header()}
		<h1>
			{$_('menu.residences')}
		</h1>
		<Anchor href="/create/residences">
			+ {$_('menu.residences')}
		</Anchor>
	{/snippet}

	<section>
		<ListResidences {residences} />
	</section>
</Page>
