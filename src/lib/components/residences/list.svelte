<script>
	import { base } from '$app/paths';
	import Card from './card.svelte';
	const { residences = [] } = $props();
</script>

<ul>
	{#each residences as residence}
		<li>
			<Card {residence} />
		</li>
	{/each}
</ul>

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
