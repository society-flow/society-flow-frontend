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
	<p class="text-center">ø {$_('menu.societies')}</p>
{/if}
