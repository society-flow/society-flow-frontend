<script>
	import { _ } from 'svelte-i18n';
	import List from '$lib/components/list.svelte';
	import Card from './card.svelte';

	const { maintenances: items } = $props();
</script>

{#if items.length}
	<List {items}>
		{#snippet children(maintenance)}
			<Card {maintenance} />
		{/snippet}
	</List>
{:else}
	<span>ø {$_('menu.maintenances')}</span>
{/if}
