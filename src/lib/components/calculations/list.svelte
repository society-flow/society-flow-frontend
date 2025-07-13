<script>
	import { _ } from 'svelte-i18n';
	import GroupedList from '$lib/components/grouped-list.svelte';
	import FormatYearMonth from '$lib/components/format/year-month.svelte';
	import FormatCurrency from '$lib/components/format/currency.svelte';

	const { calculations = [], society } = $props();
</script>

<GroupedList
	items={calculations}
	groupBy={(c) => c.yearMonth}
	sortGroups={(a, b) => parseInt(b) - parseInt(a)}
	sortGroupItems={(a, b) => {
		const nameA = a.residenceName || a.residenceId || '';
		const nameB = b.residenceName || b.residenceId || '';
		return nameA.localeCompare(nameB);
	}}
>
	{#snippet groupHeader(yearMonth, group)}
		<div>
			<h4><FormatYearMonth {yearMonth} /></h4>
			<span>{group.length} {group.length === 1 ? 'residence' : 'residences'}: </span>
			<span>
				{$_('components.calculations.list.calculatedForCollection')}:
				<FormatCurrency
					value={group.reduce((sum, c) => sum + c.amountToPay, 0)}
					currency={society.currency}
				/>
			</span>
			<span>
				{$_('components.calculations.list.actualExpensePaid')}:
				<FormatCurrency
					value={group.reduce((sum, c) => sum + c.expensePaid, 0)}
					currency={society.currency}
				/>
			</span>
		</div>
	{/snippet}
	{#snippet children(yearMonth, group)}
		{#each group as calculation}
			<li>
				<h5>{calculation.residenceName || calculation.residenceId}</h5>
				<div>
					{$_('components.calculations.list.calculatedForCollection')}:
					<FormatCurrency value={calculation.amountToPay} currency={society.currency} />
				</div>
				{#if calculation.expensePaid}
					<div>
						{$_('components.calculations.list.actualExpensePaid')}:
						<FormatCurrency value={calculation.expensePaid} currency={society.currency} />
					</div>
				{/if}
				<div>Formula: {calculation.withFormula}</div>
				<small>ID: {calculation.id.slice(-8)}</small>
			</li>
		{/each}
	{/snippet}
</GroupedList>

<style>
	div {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--s);
	}
</style>
