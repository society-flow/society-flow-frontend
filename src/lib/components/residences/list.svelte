<script>
  import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
	import Card from './card.svelte';
	const { residences = [] } = $props();
</script>

{#if residences.length}
<ul>
	{#each residences as residence}
		<li>
			<Card {residence} />
		</li>
	{/each}
</ul>
{:else}
	<p class="text-center">ø {$_('menu.residences')}</p>
{/if}

<style>
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: var(--s);
    justify-content: center;
  }
</style>
