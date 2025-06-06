<script lang="typescript">
	import { _, locale } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { api } from '$lib/api.svelte.js';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Anchor from '$lib/components/anchor.svelte';
	import Page from '$lib/components/routes/page.svelte';

	requiresAuth($locale);

	const id = $derived($page.params.id);

	let expense = $state({});

	$effect(async () => {
		if (id) {
			expense = await api.getExpense(Number(id));
		}
	});
</script>

<Page title={$_('menu.expenses')}>
	{#snippet header()}
		<h1>
			{$_('menu.expenses')}
		</h1>
	{/snippet}
	<section>
		<p>id: {id}</p>

		<p>
			<Anchor href={'/expenses'}>← Back to all expenses</Anchor>
		</p>

		<p>
			<Anchor href={`/expenses/${expense.id}`}>
				{expense.name}
			</Anchor>
		</p>

		<p>
			{expense.description}
		</p>
	</section>
</Page>
