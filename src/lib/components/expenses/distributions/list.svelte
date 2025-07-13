<script>
  import { _ } from 'svelte-i18n';
  import DistributionCard from '$lib/components/expenses/distribution-card.svelte';
  import { IconShuffle, IconEdit, IconAdd } from 'obra-icons-svelte';

  const {
    distributions= [],
    onEdit = () => {},
    onAdd = () => {}
  } = $props();
  
  const activeDistributions = $derived(distributions.filter(d => d.isActive));
</script>

<section>
  <header>
    <h2>
      <IconShuffle />
      {$_('pages.expenses.detail.distributions')}
    </h2>
    {#if activeDistributions.length}
      <nav>
        <ul>
          <li>
            <button type="button" on:click={onEdit}>
              {$_('pages.expenses.detail.editDistributions')}
              <IconEdit />
            </button>
          </li>
        </ul>
      </nav>
    {/if}
  </header>

  {#if activeDistributions.length}
    <div class="distribution-list">
      {#each activeDistributions as d}
        <DistributionCard distribution={d} />
      {/each}
    </div>
  {:else}
    <p>{$_('pages.expenses.detail.noDistributions')}</p>
    <button type="button" on:click={onAdd}>
      <IconAdd />
      {$_('pages.expenses.detail.addDistribution')}
    </button>
  {/if}
</section>

<style>
  .distribution-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  button {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
  }
</style>
