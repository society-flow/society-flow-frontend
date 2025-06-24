<script>
	import { _ } from 'svelte-i18n';
	import Anchor from '$lib/components/anchor.svelte';
	export let expense = {};
	export let society = {};
	function formatDateTime(dateString) {
		if (!dateString) return '';
		return new Date(dateString).toLocaleString();
	}
</script>

<main>
	<ul>
		<li>
			<strong>{$_('components.expenses.details.name')}:</strong>
			<Anchor href={`/expenses/${expense.id}`}>{expense.name}</Anchor>
		</li>
		<li>
			<strong>{$_('components.expenses.details.society')}:</strong>
			<Anchor href={`/societies/${expense.societyId}`}>{society.name || expense.societyId}</Anchor>
		</li>
		<li>
			<strong>{$_('components.expenses.details.amountPerMonth')}:</strong>
			{expense.amountPerMonth}
		</li>
		<li>
			<strong>{$_('components.expenses.details.active')}:</strong>
			{expense.isActive ? 'Yes' : 'No'}
		</li>
		<li>
			<strong>{$_('components.expenses.details.createdAt')}:</strong>
			{formatDateTime(expense.createdAt)}
		</li>
		<li>
			<strong>{$_('components.expenses.details.updatedAt')}:</strong>
			{formatDateTime(expense.updatedAt)}
		</li>
	</ul>
</main>
