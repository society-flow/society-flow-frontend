<script>
	import { _ } from 'svelte-i18n';
	import Card from '$lib/components/card.svelte';
	import Icon from '$lib/components/icon.svelte';
	import Anchor from '$lib/components/anchor.svelte';
	import { api } from '$lib/api.svelte.js';

	import { EXPENSE_DISTRIBUTIONS } from '$lib/const/expense_distribution_types.js';

	const { distribution = {}, isAdmin = false } = $props();

	const icon = $derived(EXPENSE_DISTRIBUTIONS[distribution.calculationMode].icon);

	let isDeleting = $state(false);

	async function handleDelete() {
		if (!distribution.id) return;
		
		isDeleting = true;
		try {
			await api.deleteExpenseDistribution(distribution.id);
			// Refresh the page to update the distributions list
			window.location.reload();
		} catch (error) {
			console.error('Error deleting distribution:', error);
			alert($_('common.error') + ': ' + error.message);
		} finally {
			isDeleting = false;
		}
	}
</script>

<Card>
	<div>
		<span title={$_('components.expenses.distributionCard.type')}>
			{#if icon}
				<Icon {icon} />
			{/if}
			{$_(`const.expense_types.${distribution.calculationMode}`)}
		</span>
		<strong title={$_('components.expenses.distributionCard.coverage')}>
			{distribution.percentageCoverage}%
		</strong>
		<progress min="0" max="100" value={distribution.percentageCoverage}></progress>
		{#if isAdmin && distribution.id}
			<button onclick={handleDelete} disabled={isDeleting} title={$_('common.delete')}>
				<Icon icon="close" />
			</button>
		{/if}
	</div>
</Card>

<style>
	div {
		display: grid;
		grid-template-columns: 3fr 1fr 6fr auto;
		align-items: center;
		gap: var(--s);
		padding: var(--s);
	}
	progress {
		width: 100%;
		min-height: calc(var(--s) * 2);
	}
	span {
		display: flex;
		align-items: center;
		gap: var(--s);
	}
</style>
