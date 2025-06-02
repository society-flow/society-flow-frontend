<script lang="typescript">
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { api } from '$lib/api.svelte.js';

	const id = $derived($page.params.id);

	let expense = $state({});

	$effect(async () => {
		if (id) {
			expense = await api.getExpense(Number(id));
		}
	});
</script>

<svelte:head>
	<title>{$_('menu.expenses')}</title>
</svelte:head>

<h1>
	{$_('menu.expenses')}
</h1>

<p>id: {id}</p>

<p>
	<a href={`${base}/expenses`}> ← Back to all expenses </a>
</p>

<p>
	<a href={`${base}/expenses/${expense.id}`}>
		{expense.name}
	</a>
</p>

<p>
	{expense.description}
</p>
