<script>
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
	import Card from './card.svelte';
	import List from '$lib/components/list.svelte';

	const { ads = [] } = $props();
</script>

{#if ads.length}
	<List items={ads}>
		{#snippet children(ad)}
			<Card {ad} />
		{/snippet}
	</List>
{:else}
	<p class="text-center">ø {$_('menu.ads')}</p>
{/if}
