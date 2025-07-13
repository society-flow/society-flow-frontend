<script>
  import { _ } from 'svelte-i18n';
  import { EXPENSE_DISTRIBUTION_TYPES as typeOptions } from '$lib/const/expense_distribution_types.js';
import DistributionList from '$lib/components/expenses/distributions/list.svelte';
import { IconCheck, IconClose, IconMath, IconHome, IconGrid, IconUser, IconLayers } from 'obra-icons-svelte';
  import { api } from '$lib/api.svelte.js';
  import { onMount } from 'svelte';

  // The main distribution component: handles listing, editing, saving, and canceling
  export let expenseId;

  let distributions = [];
  let showForm = false;
  let distError = '';

  // Derived state
  $: activeDistributions = distributions.filter(d => d.isActive);
  $: coverageTotal = activeDistributions.reduce((sum, d) => sum + Number(d.percentageCoverage), 0);
  // Map each calculation mode to an icon
  const iconMap = {
    AMOUNT_PER_OWNERSHIP_PERCENTAGE: IconMath,
    AMOUNT_PER_RESIDENCE: IconHome,
    AMOUNT_PER_SQUARE_AREA: IconGrid,
    AMOUNT_PER_RESIDENT: IconUser,
    AMOUNT_PER_RESIDENT_PER_FLOOR_COUNT: IconLayers
  };

  // Initial load
  onMount(async () => {
    if (expenseId) {
      const fetched = await api.getAllExpenseDistributionsByExpenseId(expenseId);
      // Ensure one entry per distribution type
      distributions = typeOptions.map(mode => {
        const existing = fetched.find(d => d.calculationMode === mode);
        return existing
          ? { ...existing }
          : { expenseId, calculationMode: mode, percentageCoverage: 0, isActive: true };
      });
    }
  });

  // Handlers
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
    // Validate total coverage
    if (activeDistributions.length > 0) {
      const total = activeDistributions.reduce((sum, d) => sum + Number(d.percentageCoverage), 0);
      if (total !== 100) {
        distError = $_('pages.expenses.detail.error.totalCoverage');
        return;
      }
    }
    // Persist only distributions with non-zero coverage
    for (const d of distributions.filter(d => Number(d.percentageCoverage) > 0)) {
      await api.createOrUpdateExpenseDistribution({
        id: d.id,
        expenseId,
        calculationMode: d.calculationMode,
        percentageCoverage: d.percentageCoverage,
        calculationValue: 0,
        isActive: true
      });
    }
    // Refresh and exit
    // Reload persisted distributions, mapping each type
    const fetched = await api.getAllExpenseDistributionsByExpenseId(expenseId);
    distributions = typeOptions.map(mode => {
      const existing = fetched.find(d => d.calculationMode === mode);
      return existing
        ? { ...existing }
        : { expenseId, calculationMode: mode, percentageCoverage: 0, isActive: true };
    });
    showForm = false;
  }

  function removeDistribution(d) {
    if (d.id) {
      // Mark persisted distribution inactive
      distributions = distributions.map(dist =>
        dist.id === d.id ? { ...dist, isActive: false } : dist
      );
    } else {
      // Remove new entry entirely
      distributions = distributions.filter(dist => dist !== d);
    }
  }

  async function cancelDistributions() {
    // Discard edits and reload from server
    showForm = false;
    distError = '';
    const fetched = await api.getAllExpenseDistributionsByExpenseId(expenseId);
    distributions = typeOptions.map(mode => {
      const existing = fetched.find(d => d.calculationMode === mode);
      return existing
        ? { ...existing }
        : { expenseId, calculationMode: mode, percentageCoverage: 0, isActive: true };
    });
  }
</script>

<section>
  {#if !showForm}
    <!-- List view -->
    <DistributionList
      distributions={distributions}
      onEdit={editDistributions}
      onAdd={addDistribution}
    />
  {:else}
    <!-- Edit form -->
    <form>
      {#each distributions as d, index}
        <section>
          {#if iconMap[d.calculationMode]}
            <svelte:component this={iconMap[d.calculationMode]} class="type-icon" />
          {/if}
          <label for="dist-{index}">{$_(`const.expense_types.${d.calculationMode}`)}</label>
          <input
            id="dist-{index}"
            type="number"
            min="0"
            max="100"
            bind:value={distributions[index].percentageCoverage}
          />
          <!-- Individual type coverage bar -->
          <progress max="100" value={distributions[index].percentageCoverage}></progress>
        </section>
      {/each}
      <footer>
        <fieldset>
          <div class="coverage-summary">
            <!-- Total coverage bar -->
            <progress max="100" value={coverageTotal}></progress>
            <span>{coverageTotal}/100%</span>
            {#if coverageTotal === 100}
              <IconCheck />
            {/if}
          </div>
          <button type="button" on:click={saveDistributions} disabled={coverageTotal !== 100}>
            {$_('pages.expenses.detail.saveDistributions')}
          </button>
          <button type="button" class="cancel" on:click={cancelDistributions}>
            <IconClose /> {$_('common.cancel')}
          </button>
        </fieldset>
      </footer>
      {#if distError}
        <p class="error">{distError}</p>
      {/if}
    </form>
  {/if}
</section>

<style>
  section > :global(form) {
    section {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    footer {
      fieldset {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        gap: 0.5rem;
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

  button.cancel {
    margin-left: 0.5rem;
    background: none;
    border: none;
    color: var(--color-error, red);
    cursor: pointer;
  }
  .type-icon {
    margin-right: 0.5rem;
    width: 1.25rem;
    height: 1.25rem;
    vertical-align: middle;
  }
</style>
