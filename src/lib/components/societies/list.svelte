<script>
	import { _ } from 'svelte-i18n';
	import Card from './card.svelte';
	import List from '$lib/components/list.svelte';
	const { societies = [] } = $props();
</script>

{#if societies.length}
	<List items={societies}>
		{#snippet children(society)}
			<Card {society} />
		{/snippet}
	</List>
{:else}
	<span>ø {$_('menu.societies')}</span>
{/if}
