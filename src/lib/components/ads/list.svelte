<script>
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
	import Card from './card.svelte';
	const { ads = [] } = $props();
</script>

{#if ads.length}
	<ul class="List">
		{#each ads as ad}
			<li class="List-item">
				<Card {ad} />
			</li>
		{/each}
	</ul>
{:else}
	<p class="text-center">ø {$_('menu.ads')}</p>
{/if}
