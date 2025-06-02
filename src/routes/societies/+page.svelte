<script lang="typescript">
	import { _ } from 'svelte-i18n';
	import { api } from '$lib/api.svelte.js';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import ListSocieties from '$lib/components/societies/list.svelte';

	requiresAuth();

	let societies = $state([]);
	$effect(async () => {
		societies = await api.getSocieties();
	});
</script>

<svelte:head>
	<title>{$_('menu.societies')}</title>
</svelte:head>

<h1>
	{$_('menu.societies')}
</h1>

<ListSocieties {societies} />
