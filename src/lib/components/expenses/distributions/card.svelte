<script>
	import { _ } from 'svelte-i18n';
	import Card from '$lib/components/card.svelte';

	import { EXPENSE_DISTRIBUTIONS } from '$lib/const/expense_distribution_types.js';

	const { distribution = {} } = $props();

	const icon = $derived(EXPENSE_DISTRIBUTIONS[distribution.calculationMode].icon);
</script>

<Card>
	<div>
		<span title={$_('components.expenses.distributionCard.type')}>
			{#if icon}
				<svelte:component this={icon} />
			{/if}
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
	span {
		display: flex;
		align-items: center;
		gap: var(--s);
	}
</style>
