<script lang="typescript">
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { api } from '$lib/api.svelte.js';
  import requiresAuth from "$lib/effects/requires-auth.svelte.js"

	requiresAuth()

	let expenses = $state([]);
	$effect(async () => {
		expenses = await api.getExpenses();
	});
</script>

<svelte:head>
	<title>{$_('menu.expenses')}</title>
</svelte:head>

<h1>
	{$_('menu.expenses')}
</h1>

<ul>
	{#each expenses as { id, name }}
		<li>
			<a href={`${base}/expenses/${id}`}>
				{name}
			</a>
		</li>
	{/each}
</ul>
