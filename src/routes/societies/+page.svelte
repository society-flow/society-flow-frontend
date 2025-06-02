<script lang="typescript">
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { api } from '$lib/api.svelte.js';

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

<ul>
	{#each societies as { id, name, role }}
		<li>
			<a href={`${base}/societies/${id}`}>
				{name} - {role}
			</a>
		</li>
	{/each}
</ul>
