<script lang="javascript">
	import { _, locale } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { api } from '$lib/api.svelte.js';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import ExpensesList from '$lib/components/expenses/list.svelte';
	import Anchor from '$lib/components/anchor.svelte';
	import Error from '$lib/components/error.svelte';
	import { IconAdd } from 'obra-icons-svelte';
	import Total from '$lib/components/expenses/total.svelte';
	import { globalError } from '$lib/stores/globalError.svelte.js';

	requiresAuth(locale);

	const id = $derived($page.params.id);
	const { data } = $props();
	const { society, isAdmin } = $derived(data);
	const { currency } = $derived(society);

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
			await api.triggerCalculationForSociety(id, yearMonth);
		} catch (e) {
			console.error('Error triggering calculations:', e);
			triggerError = e;
			globalError.show(e);
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
				<ul>
					<li title={`${$_('menu.societies')} → Σ ${$_('menu.expenses')}`}>
						<Total {expenses} {currency} />
					</li>
					{#if isAdmin}
						<li>
							<button onclick={triggerAllCalculations} disabled={triggering}>
								{$_('pages.societies.detail.expenseCalculations')}
							</button>
						</li>
					{/if}
					<li>
						<Anchor
							href={`/create/expenses?society=${society?.id}`}
							title={$_('menu.create.expenses')}
							isButton
						>
							<IconAdd />
						</Anchor>
					</li>
				</ul>
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
