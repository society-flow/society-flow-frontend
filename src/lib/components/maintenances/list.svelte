<script lang="javascript">
	import List from '$lib/components/list.svelte';
	import Card from './card.svelte';

	const { maintenances: items } = $props();
</script>

<List {items}>
	{#snippet children(maintenance)}
		<Card {maintenance} />
	{/snippet}
</List>
