<script>
  import { _ } from 'svelte-i18n';
  import { EXPENSE_DISTRIBUTION_TYPES as typeOptions } from '$lib/const/expense_distribution_types.js';
  import DistributionCard from '$lib/components/expenses/distribution-card.svelte';
  import { IconAdd, IconShuffle, IconEdit, IconCheck } from 'obra-icons-svelte';
  import { api } from '$lib/api.svelte.js';
  import { onMount } from 'svelte';
  export let expenseId;

  let distributions = [];
  let showForm = false;
  let distError = '';

  $: activeDistributions = distributions.filter(d => d.isActive);
  $: coverageTotal = activeDistributions.reduce((sum, d) => sum + Number(d.percentageCoverage), 0);

  onMount(async () => {
    if (expenseId) {
      distributions = await api.getAllExpenseDistributionsByExpenseId(expenseId);
    }
  });

  function addDistribution() {
    distributions = [
      ...distributions,
      { expenseId, calculationMode: '', percentageCoverage: 0, isActive: true }
    ];
    showForm = true;
    distError = '';
  }

  function editDistributions() {
    showForm = true;
    distError = '';
  }

  async function saveDistributions() {
    distError = '';
    const activeDists = distributions.filter(d => d.isActive);
    if (activeDists.length > 0) {
      const total = activeDists.reduce((sum, d) => sum + Number(d.percentageCoverage), 0);
      if (total !== 100) {
        distError = $_('pages.expenses.detail.error.totalCoverage');
        return;
      }
    }
    for (const d of distributions) {
      await api.createOrUpdateExpenseDistribution({
        id: d.id,
        expenseId,
        calculationMode: d.calculationMode,
        percentageCoverage: d.percentageCoverage,
        calculationValue: 0,
        isActive: d.isActive
      });
    }
    distributions = await api.getAllExpenseDistributionsByExpenseId(expenseId);
    showForm = false;
  }

  function removeDistribution(dist) {
    if (dist.id) {
      distributions = distributions.map(d =>
        d.id === dist.id ? { ...d, isActive: false } : d
      );
    } else {
      distributions = distributions.filter(d => d !== dist);
    }
  }
</script>

<section>
  <header>
    <h2>
      <IconShuffle />
      {$_('pages.expenses.detail.distributions')}
    </h2>
    {#if !showForm && activeDistributions.length}
      <nav>
        <ul>
          <li>
            <button type="button" onclick={editDistributions}>
              {$_('pages.expenses.detail.editDistributions')}
              <IconEdit />
            </button>
          </li>
        </ul>
      </nav>
    {/if}
  </header>

  {#if !showForm && activeDistributions.length}
    <div class="distribution-list">
      {#each activeDistributions as d}
        <DistributionCard distribution={d} />
      {/each}
    </div>
  {:else if showForm}
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
              <button type="button" onclick={() => removeDistribution(d)}>
                {$_('pages.expenses.detail.remove')}
              </button>
            </fieldset>
          </section>
        {/if}
      {/each}
      <footer>
        <fieldset>
          <div class="coverage-summary">
            <span>{coverageTotal}/100%</span>
            {#if coverageTotal === 100}
              <IconCheck />
            {/if}
          </div>
          <button type="button" onclick={addDistribution}>
            <IconAdd />
            {$_('pages.expenses.detail.addDistribution')}
          </button>
          <button type="button" onclick={saveDistributions}>
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
    <button type="button" onclick={addDistribution}>
      <IconAdd />
      {$_('pages.expenses.detail.addDistribution')}
    </button>
  {/if}
</section>

<style>
  form {
    section {
      display: flex;
      align-items: center;
    }
    footer {
      fieldset {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
      }
    }
  }

  .coverage-summary {
    margin-right: auto;
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .coverage-summary span {
    font-weight: bold;
    margin-right: 0.25rem;
  }
</style>
