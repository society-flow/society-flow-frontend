<script>
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
	import Card from './card.svelte';
	import List from '$lib/components/list.svelte';
	const { residences = [] } = $props();
</script>

{#if residences.length}
	<List items={residences}>
		{#snippet children(residence)}
			<Card {residence} />
		{/snippet}
	</List>
{:else}
	<p class="text-center">ø {$_('menu.residences')}</p>
{/if}
