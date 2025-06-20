<script>
	import { _ } from 'svelte-i18n';
	import Card from '$lib/components/card.svelte';
	export let distribution = {};
	// Map mode to human label
	const labels = {
		AMOUNT_PER_OWNERSHIP_PERCENTAGE: 'Per Ownership Percentage',
		AMOUNT_PER_RESIDENCE: 'Per Residence',
		AMOUNT_PER_SQUARE_AREA: 'Per Square Area',
		AMOUNT_PER_RESIDENT: 'Per Resident',
		AMOUNT_PER_RESIDENT_PER_FLOOR_COUNT: 'Per Resident per Floor Count'
	};
</script>

<Card class="DistributionCard">
	<p>
		<strong>{$_('components.expenses.distributionCard.type')}:</strong>
		{labels[distribution.calculationMode] || distribution.calculationMode}
	</p>
	<p>
		<strong>{$_('components.expenses.distributionCard.coverage')}:</strong>
		{distribution.percentageCoverage}%
	</p>
	<progress max="100" value={distribution.percentageCoverage}></progress>
</Card>
