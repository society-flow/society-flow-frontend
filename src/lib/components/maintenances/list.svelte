<script>
	import { _ } from 'svelte-i18n';
	import GroupedList from '$lib/components/grouped-list.svelte';

	const { maintenances = [], society, residence } = $props();

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
	items={maintenances}
	groupBy={(m) => m.yearMonth}
	sortGroups={(a, b) => parseInt(b) - parseInt(a)}
	sortGroupItems={(a, b) => new Date(b.createdAt) - new Date(a.createdAt)}
>
	{#snippet groupHeader(yearMonth, group)}
		{@const active = group.find((m) => m.isCurrent === true || m.isCurrent === 'true')}
		{@const total = group.reduce((sum, m) => sum + m.totalAmountToPay, 0)}
		<h4>{formatYearMonth(yearMonth)}</h4>
		<span>{group.length} {group.length === 1 ? 'residence' : 'residences'}</span>
		<span
			>{active
				? $_('components.maintenances.list.active')
				: $_('components.maintenances.list.inactive')}</span
		>
		<span>{formatCurrency(total)}</span>
	{/snippet}
	{#snippet children(yearMonth, group)}
		{#each group as m}
			<li>
				<details>
					<summary>
						<h5>
							{m.residenceName ||
								residence?.residenceName ||
								`Residence ${m.residenceId.slice(-8)}`}
						</h5>
					</summary>
					<div>
						<div>
							{$_('components.maintenances.list.previousAmount')}: {formatCurrency(
								m.previousAmountToPay
							)}
						</div>
						<div>{$_('components.maintenances.list.fine')}: {formatCurrency(m.fineToPay)}</div>
						<div>
							{$_('components.maintenances.list.thisMonth')}: {formatCurrency(
								m.thisMonthCalculation
							)}
						</div>
						<div>
							{$_('components.maintenances.list.totalAmount')}: {formatCurrency(m.totalAmountToPay)}
						</div>
					</div>
					{#if m.withFormula}
						<pre>{m.withFormula}</pre>
					{/if}
					<small>{$_('components.maintenances.list.maintenanceId')} {m.id.slice(-8)}</small>
				</details>
			</li>
		{/each}
	{/snippet}
</GroupedList>
