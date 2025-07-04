<script lang="javascript">
	import { _, locale } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { api } from '$lib/api.svelte.js';
	import { EXPENSE_DISTRIBUTION_TYPES as typeOptions } from '$lib/const/expense_distribution_types.js';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Anchor from '$lib/components/anchor.svelte';
	import Page from '$lib/components/routes/page.svelte';
	import ExpenseDetails from '$lib/components/expenses/details.svelte';
	import DistributionCard from '$lib/components/expenses/distribution-card.svelte';
	import CalculationsList from '$lib/components/calculations/list.svelte';
	import PaymentForm from '$lib/components/expenses/payment-form.svelte';
	import PaymentList from '$lib/components/expenses/payment-list.svelte';

	requiresAuth(locale);

	const id = $derived($page.params.id);

	let expense = $state({});
	$effect(async () => {
		if (id) {
			expense = await api.getExpenseById(id);
		}
	});

	let society = $state({});
	$effect(async () => {
		if (expense.societyId) {
			society = await api.getSocietyById(expense.societyId);
		}
	});

	let calculations = $state([]);
	$effect(async () => {
		if (id) {
			try {
				calculations = await api.getAllCalculationsByExpense(id);
			} catch (error) {
				console.error('Error fetching calculations:', error);
				calculations = [];
			}
		}
	});

	// Expense payments
	let payments = $state([]);
	$effect(async () => {
		if (id) {
			try {
				const result = await api.getExpensePaymentsByExpenseId(id);
				payments = result;
			} catch (error) {
				console.error('Error fetching expense payments:', error);
				payments = [];
			}
		}
	});

	async function onPaymentSuccess(newPayment) {
		console.log('Payment success, refreshing data...');
		try {
			// Refresh payments list
			const newPayments = await api.getExpensePaymentsByExpenseId(id);
			console.log('New payments:', newPayments);
			payments = newPayments;
			
			// Also refresh calculations to show updated paid amounts
			calculations = await api.getAllCalculationsByExpense(id);
		} catch (error) {
			console.error('Error refreshing data after payment:', error);
		}
	}
	// Expense distributions
	let distributions = $state([]);
	let showDistributionForm = $state(false);
	let distError = $state('');
	$effect(async () => {
		if (id) {
			distributions = await api.getAllExpenseDistributionsByExpenseId(id);
		}
	});
	function addDistribution() {
		distributions = [
			...distributions,
			{ expenseId: expense.id, calculationMode: '', percentageCoverage: 0, isActive: true }
		];
		showDistributionForm = true;
		distError = '';
	}
	function editDistributions() {
		showDistributionForm = true;
		distError = '';
	}
	async function saveDistributions() {
		distError = '';
		// Validate that active distributions total 100%, or allow zero distributions
		const activeDists = distributions.filter((d) => d.isActive);
		if (activeDists.length > 0) {
			const total = activeDists.reduce((sum, d) => sum + Number(d.percentageCoverage), 0);
			if (total !== 100) {
				distError = $_('pages.expenses.detail.error.totalCoverage');
				return;
			}
		}
		for (const d of distributions) {
			const payload = {
				id: d.id,
				expenseId: expense.id,
				calculationMode: d.calculationMode,
				percentageCoverage: d.percentageCoverage,
				calculationValue: 0,
				isActive: d.isActive
			};
			await api.createOrUpdateExpenseDistribution(payload);
		}
		distributions = await api.getAllExpenseDistributionsByExpenseId(id);
		showDistributionForm = false;
	}
	/**
	 * Remove a distribution: mark inactive if persisted, or remove entirely if new
	 */
	function removeDistribution(dist) {
		if (dist.id) {
			// mark existing distribution inactive
			distributions = distributions.map((d) => (d.id === dist.id ? { ...d, isActive: false } : d));
		} else {
			// remove new entry
			distributions = distributions.filter((d) => d !== dist);
		}
	}
</script>

<Page title={expense.name || $_('menu.expenses')} showHeader={!!expense?.name}>
	<article class="Detail">
		{#if expense.id}
			<aside>
				<nav>
					<ul>
						<li>
							<Anchor href={`/update/expenses/${expense.id}`} isButton title={$_('common.update')}>
								{$_('common.update')}
							</Anchor>
						</li>
						<li>
							<Anchor href={`/delete/expenses/${expense.id}`} title={$_('common.delete')} isButton>
								{$_('common.delete')}
							</Anchor>
						</li>
					</ul>
				</nav>
			</aside>

			<ExpenseDetails {expense} {society} />

			<section>
				<header>
					<h2>{$_('pages.expenses.detail.distributions')}</h2>
					<nav>
						<button on:click={editDistributions}
							>{$_('pages.expenses.detail.editDistributions')}</button
						>
					</nav>
				</header>
				{#if distributions.filter((d) => d.isActive).length && !showDistributionForm}
					<div>
						{#each distributions.filter((d) => d.isActive) as d}
							<DistributionCard distribution={d} />
						{/each}
					</div>
				{:else if showDistributionForm}
					<form>
						{#each distributions as d, index}
							{#if d.isActive}
								<section>
									<fieldset>
										<legend>
											{$_('pages.expenses.detail.selectType')}
										</legend>
										<select bind:value={distributions[index].calculationMode}>
											{#each typeOptions as opt}
												<option value={opt}>
													{$_(`const.expense_types.${opt}`)}
												</option>
											{/each}
										</select>
									</fieldset>
									<fieldset>
										<legend>
											{$_('pages.expenses.detail.percentageCoverage')} (%)
										</legend>
										<input
											type="number"
											min="0"
											max="100"
											bind:value={distributions[index].percentageCoverage}
										/>
									</fieldset>
									<fieldset>
										<button type="button" on:click={() => removeDistribution(d)}
											>{$_('pages.expenses.detail.remove')}</button
										>
									</fieldset>
								</section>
							{/if}
						{/each}
						<footer>
							<fieldset>
								<button type="button" on:click={addDistribution}>
									{$_('pages.expenses.detail.addDistribution')}
								</button>
								<button type="button" on:click={saveDistributions}>
									{$_('pages.expenses.detail.saveDistributions')}
								</button>
							</fieldset>
						</footer>
						{#if distError}
							<p class="error">{distError}</p>
						{/if}
					</form>
				{:else}
					<p>{$_('pages.expenses.detail.noDistributions')}</p>
					<button on:click={addDistribution}>{$_('pages.expenses.detail.addDistribution')}</button>
				{/if}
			</section>

			<section>
				<CalculationsList {calculations} {society} />
			</section>

			<section>
				<PaymentForm {expense} onSuccess={onPaymentSuccess} />
			</section>

			<section>
				<PaymentList {payments} {society} />
			</section>
		{:else}
			<p>Loading...</p>
		{/if}
	</article>
	{#snippet footer()}
		<p><Anchor href="/expenses">{$_('pages.expenses.detail.backToAllExpenses')}</Anchor></p>
	{/snippet}
</Page>

<style>
	form {
    section {
		  display: flex;
		  align-items: center;
	  }
    footer {
      
      fieldset {
        flex-direction: row;
        justify-content: flex-end;
      }
    }
  }
</style>
