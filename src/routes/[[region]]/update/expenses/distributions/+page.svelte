<script>
	import { _, locale } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import DistributionForm from '$lib/components/expenses/distributions/form.svelte';
	import { api } from '$lib/api.svelte.js';
	import { EXPENSE_DISTRIBUTIONS } from '$lib/const/expense_distribution_types.js';

	requiresAuth(locale);

	const expenseId = $page.url.searchParams.get('id');
	let distributions = $state([]);

	$effect(async () => {
		if (expenseId) {
			const fetched = await api.getAllExpenseDistributionsByExpenseId(expenseId);
			distributions = Object.keys(EXPENSE_DISTRIBUTIONS).map((mode) => {
				const existing = fetched.find((d) => d.calculationMode === mode);
				return existing
					? { ...existing }
					: { expenseId, calculationMode: mode, percentageCoverage: 0, isActive: true };
			});
		}
	});

	async function onSave() {
		goto(`${base}/${$locale}/expenses/${expenseId}`);
	}

	function onCancel() {
		goto(`${base}/${$locale}/expenses/${expenseId}`);
	}
</script>

<Page title={`${$_('menu.update.expenses')} → ${$_('pages.expenses.detail.distributions')}`}>
	<DistributionForm {expenseId} {distributions} on:save={onSave} on:cancel={onCancel} />
</Page>
