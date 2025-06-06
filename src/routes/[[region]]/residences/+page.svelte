<script lang="typescript">
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { api } from '$lib/api.svelte.js';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import ListResidences from '$lib/components/residences/list.svelte';

	requiresAuth();

	let residences = $state([]);
	$effect(async () => {
		residences = await api.getResidences();
	});
</script>

<svelte:head>
	<title>{$_('menu.residences')}</title>
</svelte:head>

<header>
	<h1>
		{$_('menu.residences')}
	</h1>
</header>

<section>
	<ListResidences {residences} />
</section>
