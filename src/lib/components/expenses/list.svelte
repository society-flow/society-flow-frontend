<script>
	import { _ } from 'svelte-i18n';
	import Card from './card.svelte';
	import List from '$lib/components/list.svelte';

	const { expenses = [], currency = '' } = $props();
</script>

{#if expenses.length}
	<List items={expenses}>
		{#snippet children(expense)}
			<Card {expense} {currency} />
		{/snippet}
	</List>
{:else}
	<span>ø {$_('menu.expenses')}</span>
{/if}
