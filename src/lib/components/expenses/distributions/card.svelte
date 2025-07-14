<script>
	import { _ } from 'svelte-i18n';
	import Card from '$lib/components/card.svelte';

	const { distribution = {} } = $props();
</script>

<Card>
  <div>
	  <span title={$_('components.expenses.distributionCard.type')}>
		  {$_(`const.expense_types.${distribution.calculationMode}`)}
	  </span>
    <strong title={$_('components.expenses.distributionCard.coverage')}>
		  {distribution.percentageCoverage}%
	  </strong>
	  <progress min="0" max="100" value={distribution.percentageCoverage}></progress> 
  </div>
</Card>

<style>
  div {
    display: grid;
    grid-template-columns: 3fr 1fr 6fr;
    align-items: center;
    gap: var(--s);
    padding: var(--s);
  }
	progress {
		width: 100%;
    min-height: calc(var(--s) * 2);
	}
</style>
