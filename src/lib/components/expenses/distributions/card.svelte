<script>
	import { _ } from 'svelte-i18n';
	import Card from '$lib/components/card.svelte';

	import { IconOrangeSlice, IconBusiness, IconGrid, IconUser, IconLayers } from 'obra-icons-svelte';

	const iconMap = {
		AMOUNT_PER_OWNERSHIP_PERCENTAGE: IconOrangeSlice,
		AMOUNT_PER_RESIDENCE: IconBusiness,
		AMOUNT_PER_SQUARE_AREA: IconGrid,
		AMOUNT_PER_RESIDENT: IconUser,
		AMOUNT_PER_RESIDENT_PER_FLOOR_COUNT: IconLayers
	};

	const { distribution = {} } = $props();
</script>

<Card>
	<div>
		<span title={$_('components.expenses.distributionCard.type')}>
			{#if iconMap[distribution.calculationMode]}
				<svelte:component this={iconMap[distribution.calculationMode]} />
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
