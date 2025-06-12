<script>
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
	import Card from './card.svelte';
	const { residences = [] } = $props();
</script>

{#if residences.length}
	<ul class="List">
		{#each residences as residence}
			<li class="List-item">
				<Card {residence} />
			</li>
		{/each}
	</ul>
{:else}
	<p class="text-center">ø {$_('menu.residences')}</p>
{/if}
