<script>
	import { _ } from 'svelte-i18n';
	import Card from '$lib/components/card.svelte';

	const { distribution = {} } = $props();
</script>

<Card>
	<span title={$_('components.expenses.distributionCard.coverage')}>
		{distribution.percentageCoverage}%
	</span>
	<span title={$_('components.expenses.distributionCard.type')}>
		{$_(`pages.expenses.detail.typeOptions.${distribution.calculationMode}`)}
	</span>
	{#snippet footer()}
		<progress min="0" max="100" value={distribution.percentageCoverage}></progress>
	{/snippet}
</Card>

<style>
	progress {
		width: 100%;
	}
</style>
