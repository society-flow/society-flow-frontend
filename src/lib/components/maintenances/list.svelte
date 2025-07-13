<script>
	import { _ } from 'svelte-i18n';
	import GroupedList from '$lib/components/grouped-list.svelte';
	import FormatYearMonth from '$lib/components/format/year-month.svelte';
	import FormatCurrency from '$lib/components/format/currency.svelte';
	import Details from './details.svelte';
	import {
		IconBudgetAlt,
		IconPaintRoller,
		IconBusiness,
		IconCheck,
		IconCheckboxOff
	} from 'obra-icons-svelte';

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
			<span>
        <IconPaintRoller />
			  <h4><FormatYearMonth {yearMonth} /></h4>
        </span>
			<span>
				<IconBusiness />
				{group.length}
			</span>
			<span>
				{#if active}
					<IconCheck />
					{$_('components.maintenances.list.active')}
				{:else}
					<IconCheckboxOff />
					{$_('components.maintenances.list.inactive')}
				{/if}
			</span>
			<strong>
				<IconBudgetAlt />
				<FormatCurrency value={total} currency={society.currency} />
			</strong>
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
    display: flex;
    gap: var(--s);
    align-items: center;
    /* justify-content: space-around; */
    flex-grow: 1;
    flex-wrap: wrap;
    overflow-x: auto;
		scrollbar-width: none;
		-ms-overflow-style: none;
    span,
    strong {
      display: flex;
      align-items: center;
      gap: calc(var(--s) / 2);
    }
  }
  </style>
