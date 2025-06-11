<script>
	import { _ } from 'svelte-i18n';
	import ExpenseCard from './card.svelte';
	const { expenses = [] } = $props();
</script>

{#if expenses.length}
	<ul>
		{#each expenses as expense}
			<li>
				<ExpenseCard {expense} />
			</li>
		{/each}
	</ul>
{:else}
	<p class="text-center">ø {$_('menu.expenses')}</p>
{/if}

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
