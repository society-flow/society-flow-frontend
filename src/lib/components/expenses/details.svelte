<script>
	import { _ } from 'svelte-i18n';
	import Anchor from '$lib/components/anchor.svelte';
	import RelativeDate from '$lib/components/date/relative.svelte';
	import Detail from '$lib/components/detail.svelte';
	import Card from './card.svelte';
	import SocietyCard from '$lib/components/societies/card.svelte';

	const { expense = {}, society = {} } = $props();
</script>

<Detail>
	<Card {expense} />
	<SocietyCard {society} />
	<ul>
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
</Detail>
