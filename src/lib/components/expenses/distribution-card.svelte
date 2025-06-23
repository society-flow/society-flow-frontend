<script>
	import { _ } from 'svelte-i18n';
	import Card from '$lib/components/card.svelte';

	const { distribution = {} } = $props();
</script>

<Card class="DistributionCard">
	<p>
		<strong>{$_('components.expenses.distributionCard.type')}:</strong>
		{$_(`pages.expenses.detail.typeOptions.${distribution.calculationMode}`)}
	</p>
	<p>
		<strong>{$_('components.expenses.distributionCard.coverage')}:</strong>
		{distribution.percentageCoverage}%
	</p>
	<progress min="0" max="100" value={distribution.percentageCoverage}></progress>
</Card>

<style>
	progress {
		width: 100%;
	}
</style>
