<script>
	import { _ } from 'svelte-i18n';
	import Card from '$lib/components/calculations/card.svelte';
	import List from '$lib/components/list.svelte';

	const { calculations } = $props();
</script>

{#if calculations.length}
	<List items={calculations}>
		{#snippet children(calculation)}
			<Card {calculation} />
		{/snippet}
	</List>
{:else}
	<p>{$_('pages.expenses.detail.noCalculations')}</p>
{/if}
