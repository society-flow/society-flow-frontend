<script>
	import { _ } from 'svelte-i18n';
	import GroupedList from '$lib/components/grouped-list.svelte';

	const { calculations = [], society } = $props();

	function formatYearMonth(yearMonth) {
		const year = Math.floor(yearMonth / 100);
		const month = yearMonth % 100;
		return `${year}-${month.toString().padStart(2, '0')}`;
	}

	function formatCurrency(amount) {
		const currencyCode = society?.currency || 'EUR';
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: currencyCode
		}).format(amount);
	}
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
		<h4>{formatYearMonth(yearMonth)}</h4>
		<span>{group.length} {group.length === 1 ? 'residence' : 'residences'}: </span>
		<span>To Pay: {formatCurrency(group.reduce((sum, c) => sum + c.amountToPay, 0))}, </span>
		<span>Actually Paid: {formatCurrency(group.reduce((sum, c) => sum + c.expensePaid, 0))} Actually Paid</span>
	{/snippet}
	{#snippet children(yearMonth, group)}
		{#each group as calculation}
			<li>
				<h5>{calculation.residenceName || calculation.residenceId}</h5>
				<div>To Pay: {formatCurrency(calculation.amountToPay)}</div>
				{#if calculation.expensePaid}
					<div>Actually Paid: {formatCurrency(calculation.expensePaid)}</div>
				{/if}
				<div>Formula: {calculation.withFormula}</div>
				<small>ID: {calculation.id.slice(-8)}</small>
			</li>
		{/each}
	{/snippet}
</GroupedList>
