<script>
  import { _, locale } from 'svelte-i18n';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import requiresAuth from '$lib/effects/requires-auth.svelte.js';
  import Page from '$lib/components/routes/page.svelte';
  import DistributionForm from '$lib/components/expenses/distributions/form.svelte';
  import { api } from '$lib/api.svelte.js';
  import { EXPENSE_DISTRIBUTION_TYPES as typeOptions } from '$lib/const/expense_distribution_types.js';

  requiresAuth(locale);

  const expenseId = page.url.searchParams.get('expense');
  const distributions = $state([]);

  $effect(async () => {
    if (expenseId) {
      const fetched = await api.getAllExpenseDistributionsByExpenseId(expenseId);
      distributions = typeOptions.map((mode) => {
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

<Page title={$_('pages.expenses.detail.createDistributions')}>
  <DistributionForm {expenseId} {distributions} on:save={onSave} on:cancel={onCancel} />
</Page>
