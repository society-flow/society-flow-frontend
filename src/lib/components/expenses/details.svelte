<script>
	import { _ } from 'svelte-i18n';
	import Anchor from '$lib/components/anchor.svelte';
	import RelativeDate from '$lib/components/date/relative.svelte';

	const { expense = {}, society = {} } = $props();
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
			{society?.currency}
		</li>
		<li>
			<strong>{$_('components.expenses.details.active')}:</strong>
			{expense.isActive ? 'Yes' : 'No'}
		</li>
		<li>
			<strong>{$_('common.createdAt')}:</strong>
			<RelativeDate date={expense.createdAt} />
		</li>
		<li>
			<strong>{$_('common.updatedAt')}:</strong>
			<RelativeDate date={expense.updatedAt} />
		</li>
	</ul>
</main>
