<script>
	import { _ } from 'svelte-i18n';
	import GroupedList from '$lib/components/grouped-list.svelte';
	import FormatYearMonth from '$lib/components/format/year-month.svelte';
	import FormatCurrency from '$lib/components/format/currency.svelte';
	import Details from './details.svelte';
	import { IconPaintRoller, IconBusiness } from 'obra-icons-svelte';

	const { maintenances = [], society } = $props();
</script>

<GroupedList
	items={maintenances}
	groupBy={(m) => m.yearMonth}
	sortGroups={(a, b) => parseInt(b) - parseInt(a)}
	sortGroupItems={(a, b) => {
		const getYearMonth = (dateStr) => {
			const date = new Date(dateStr);
			return date.getFullYear() * 100 + (date.getMonth() + 1); // month is 0-based
		};
		return getYearMonth(b.createdAt) - getYearMonth(a.createdAt);
	}}
>
	{#snippet groupHeader(yearMonth, group)}
		{@const active = group.find((m) => m.isCurrent === true || m.isCurrent === 'true')}
		{@const total = group.reduce((sum, m) => sum + m.totalAmountToPay, 0)}
		<IconPaintRoller />
		<h4><FormatYearMonth {yearMonth} /></h4>
		<span>
			{group.length}
			<IconBusiness />
		</span>
		<span
			>{active
				? $_('components.maintenances.list.active')
				: $_('components.maintenances.list.inactive')}</span
		>
		<strong><FormatCurrency value={total} currency={society.currency} /></strong>
	{/snippet}
	{#snippet children(yearMonth, group)}
		{#each group as maintenance}
			<li>
				<Details {maintenance} {society} />
			</li>
		{/each}
	{/snippet}
</GroupedList>
