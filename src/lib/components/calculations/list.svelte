<script>
	import { _ } from 'svelte-i18n';
	import Card from '$lib/components/calculations/card.svelte';

	const { calculations } = $props();
</script>

{#if calculations.length}
	<ul class="List">
		{#each calculations as calculation}
			<li class="List-item">
				<Card {calculation} />
			</li>
		{/each}
	</ul>
{:else}
	<p>{$_('pages.expenses.detail.noCalculations')}</p>
{/if}

<style>
  .List  :global(.Card) {
    padding: var(--s);
  }
</style>
