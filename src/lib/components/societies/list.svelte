<script>
	import { base } from '$app/paths';
	import SocietyCard from './card.svelte';
	const { societies = [] } = $props();
</script>

<ul>
	{#each societies as society}
		<li>
			<SocietyCard {society} />
		</li>
	{/each}
</ul>

<style>
	ul {
		padding: 0;
		margin: 0;
		list-style: none;
		display: flex;
		flex-wrap: wrap;
    gap: var(--s);
	}
</style>
