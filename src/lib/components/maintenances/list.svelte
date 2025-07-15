<script>
	import { _ } from 'svelte-i18n';
	import GroupedList from '$lib/components/grouped-list.svelte';
	import FormatYearMonth from '$lib/components/format/year-month.svelte';
	import FormatCurrency from '$lib/components/format/currency.svelte';
	import Icon from '$lib/components/icon.svelte';
	import Details from './details.svelte';

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
		<div>
			<Icon icon="paint-roller">
				<h4><FormatYearMonth {yearMonth} /></h4>
			</Icon>
			<Icon icon="business">
				{group.length}
			</Icon>
			{#if active}
				<Icon icon="check" />
				{$_('components.maintenances.list.active')}
			{:else}
				<Icon icon="checkbox-off" />
				{$_('components.maintenances.list.inactive')}
			{/if}
			<Icon icon="budget-alt">
				<strong>
					<FormatCurrency value={total} currency={society.currency} />
				</strong>
			</Icon>
		</div>
	{/snippet}
	{#snippet children(yearMonth, group)}
		{#each group as maintenance}
			<li>
				<Details {maintenance} {society} />
			</li>
		{/each}
	{/snippet}
</GroupedList>

<style>
	div {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--s);
		align-items: center;
		flex-grow: 1;
		flex-wrap: wrap;
		overflow-x: auto;
		scrollbar-width: none;
		-ms-overflow-style: none;
	}
</style>
