<script>
	import { _ } from 'svelte-i18n';
	import Card from './card.svelte';
	import List from '$lib/components/list.svelte';
	const { expenses = [] } = $props();
</script>

{#if expenses.length}
	<List items={expenses}>
		{#snippet children(expense)}
			<Card {expense} />
		{/snippet}
	</List>
{:else}
	<p class="text-center">ø {$_('menu.expenses')}</p>
{/if}
