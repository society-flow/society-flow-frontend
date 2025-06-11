<script lang="javascript">
	import { _, locale } from 'svelte-i18n';
	import { page } from '$app/stores';
	// import { api } from '$lib/api.svelte.js';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Anchor from '$lib/components/anchor.svelte';
	import Page from '$lib/components/routes/page.svelte';

	requiresAuth($locale);

	const urlId = $derived($page.params.id);

	let expense = $state({});
	const { id, name, description } = $derived(expense);
	// const name = $derived(expense.name);
	// const description = $derived(expense.description);

	$effect(async () => {
		if (urlId) {
			// expense = await api.getExpense(Number(urlId));
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
			<Anchor href={`/expenses/${urlId}`}>
				{name}
			</Anchor>
		</p>

		<p>
			{description}
		</p>
	</section>
</Page>
