<script>
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { api } from '$lib/api.svelte.js';

	let adverts = $state([]);
	$effect(async () => {
		adverts = await api.getAdverts();
	});
</script>

<svelte:head>
	<title>{$_('menu.adverts')}</title>
</svelte:head>

<h1>{$_('menu.adverts')}</h1>

<ul>
	{#each adverts as { id, name } (id)}
		<li>
			<a href={`${base}/ads/${id}`}>
				{name}
			</a>
		</li>
	{/each}
</ul>
