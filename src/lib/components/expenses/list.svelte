<script>
	import ExpenseCard from './card.svelte';
	const { expenses = [] } = $props();
</script>

<ul>
	{#each expenses as expense}
		<li>
			<ExpenseCard {expense} />
		</li>
	{/each}
</ul>

<style>
	ul {
		padding: 0;
		margin: 0;
		list-style: none;
		display: flex;
    flex-direction: column;
		gap: var(--s);
		justify-content: center;
	}
</style>
