<script>
	import { _ } from 'svelte-i18n';
	import Anchor from '$lib/components/anchor.svelte';
	import FormatDateRelative from '$lib/components/format/date-relative.svelte';
	import Detail from '$lib/components/detail.svelte';
	import Card from './card.svelte';
	import SocietyCard from '$lib/components/societies/card.svelte';
	import {
		IconCheckboxOn,
		IconCheckboxOff,
		IconCalendarSelectedDate,
		IconWatch,
		IconCalendarEndOfMonth
	} from 'obra-icons-svelte';

	const { expense = {}, society = {} } = $props();
</script>

<Detail>
	{#snippet header()}
		<Card {expense} />
		<SocietyCard {society} />
	{/snippet}
	<ul>
		<li>
			<IconCalendarEndOfMonth />
			<strong>{$_('components.expenses.details.amountPerMonth')}:</strong>
			{expense.amountPerMonth}
			{society?.currency}
		</li>
		<li>
			{#if expense.isActive}
				<IconCheckboxOn />
			{:else}
				<IconCheckboxOff />
			{/if}
			<strong>{$_('components.expenses.details.active')}:</strong>
			{expense.isActive ? 'Yes' : 'No'}
		</li>
		<li>
			<IconWatch />
			<strong>{$_('common.updatedAt')}:</strong>
			<FormatDateRelative date={expense.updatedAt} />
		</li>
		<li>
			<IconCalendarSelectedDate />
			<strong>{$_('common.createdAt')}:</strong>
			<FormatDateRelative date={expense.createdAt} />
		</li>
	</ul>
</Detail>
