<script lang="javascript">
	import { _, locale } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { api } from '$lib/api.svelte.js';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Error from '$lib/components/error.svelte';
	import ExpensesList from '$lib/components/expenses/list.svelte';

	requiresAuth(locale);

	const id = $derived($page.params.id);

	let expenses = $state([]);
	let loading = $state(true);
	let triggerError = $state(null);
	let triggering = $state(false);

	$effect(async () => {
		if (id) {
			loading = true;
			try {
				expenses = await api.getAllExpensesBySociety(id);
			} catch (e) {
				console.error('Error loading expenses:', e);
			} finally {
				loading = false;
			}
		}
	});

	async function triggerAllCalculations() {
		triggering = true;
		triggerError = null;
		try {
			const now = new Date();
			const year = now.getFullYear();
			const month = String(now.getMonth() + 1).padStart(2, '0');
			const yearMonth = `${year}${month}`;
			for (const exp of expenses) {
				await api.triggerCalculation(exp.id, yearMonth);
			}
		} catch (e) {
			console.error('Error triggering calculations:', e);
			triggerError = e;
		} finally {
			triggering = false;
		}
	}
</script>

{#if loading}
	<aside><center><progress /></center></aside>
{:else}
	<section>
		<header>
			<h2>{$_('menu.expenses')}</h2>
			<nav>
				<button on:click={triggerAllCalculations} disabled={triggering}>
					{$_('pages.societies.detail.triggerCalculations')}
				</button>
			</nav>
		</header>
		{#if triggering}
			<progress />
		{/if}
		{#if triggerError}
			<Error error={triggerError} />
		{/if}
		{#if expenses.length}
			<ExpensesList {expenses} />
		{:else}
			<p>{$_('pages.societies.detail.noExpensesConfigured')}</p>
		{/if}
	</section>
{/if}
