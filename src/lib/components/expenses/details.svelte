<script>
	import { _ } from 'svelte-i18n';
	import Anchor from '$lib/components/anchor.svelte';
	import Icon from '$lib/components/icon.svelte';
	import Detail from '$lib/components/detail.svelte';
	import FormatDateRelative from '$lib/components/format/date-relative.svelte';
	import SocietyCard from '$lib/components/societies/card.svelte';
	import Card from './card.svelte';

	const { expense = {}, society = {} } = $props();
</script>

<Detail>
	{#snippet header()}
		<Card {expense} currency={society.currency} />
		<SocietyCard {society} />
	{/snippet}
	<ul>
		<li>
			<Icon icon="calendar-end-of-month" />
			<strong>{$_('components.expenses.details.amountPerMonth')}:</strong>
			{expense.amountPerMonth}
			{society?.currency}
		</li>
		<li>
			{#if expense.isActive}
				<Icon icon="checkbox-on" />
			{:else}
				<Icon icon="checkbox-off" />
			{/if}
			<strong>{$_('components.expenses.details.active')}:</strong>
			{expense.isActive ? 'Yes' : 'No'}
		</li>
		<li>
			<Icon icon="watch" />
			<strong>{$_('common.updatedAt')}:</strong>
			<FormatDateRelative date={expense.updatedAt} />
		</li>
		<li>
			<Icon icon="calendar-selected-date" />
			<strong>{$_('common.createdAt')}:</strong>
			<FormatDateRelative date={expense.createdAt} />
		</li>
	</ul>
</Detail>
