<script lang="typescript">
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { api } from '$lib/api.svelte.js';

	let residences = $state([]);
	$effect(async () => {
		residences = await api.getResidences();
	});
</script>

<svelte:head>
	<title>{$_('menu.residences')}</title>
</svelte:head>

<h1>
	{$_('menu.residences')}
</h1>

<ul>
	{#each residences as { id, name, role }}
		<li>
			<a href={`${base}/residences/${id}`}>
				{name} - {role}
			</a>
		</li>
	{/each}
</ul>
