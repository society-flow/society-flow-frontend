<script>
	import { _ } from 'svelte-i18n';
	import ExpenseCard from './card.svelte';
	const { expenses = [] } = $props();
</script>

{#if expenses.length}
	<ul class="List">
		{#each expenses as expense}
			<li class="List-item">
				<ExpenseCard {expense} />
			</li>
		{/each}
	</ul>
{:else}
	<p class="text-center">ø {$_('menu.expenses')}</p>
{/if}
