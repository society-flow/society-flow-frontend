<script lang="javascript">
	import { _, locale } from 'svelte-i18n';
	import { api } from '$lib/api.svelte.js';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import ListExpenses from '$lib/components/expenses/list.svelte';

	requiresAuth($locale);

	let expenses = $state([]);
	$effect(async () => {
		// expenses = await api.getExpenses();
	});
</script>

<Page title={$_('menu.expenses')}>
	<section>
		<ListExpenses {expenses}></ListExpenses>
	</section>
</Page>
