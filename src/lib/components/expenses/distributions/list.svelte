<script>
	import { _ } from 'svelte-i18n';
	import List from '$lib/components/list.svelte';
	import DistributionCard from '$lib/components/expenses/distributions/card.svelte';
	const { distributions = [] } = $props();
	const activeDistributions = $derived(distributions.filter((d) => d.isActive));
</script>

{#if activeDistributions.length}
	<List items={activeDistributions}>
		{#snippet children(distribution)}
			<DistributionCard {distribution} />
		{/snippet}
	</List>
{:else}
	<p>{$_('pages.expenses.detail.noDistributions')}</p>
{/if}
