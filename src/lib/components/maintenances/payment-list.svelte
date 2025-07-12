<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import GroupedList from '$lib/components/grouped-list.svelte';

	const { payments = [], society } = $props();

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

	function sortPaymentsByDate(a, b) {
		try {
			const dateA = new Date(a.transactionDate);
			const dateB = new Date(b.transactionDate);
			// If dates are invalid, fall back to string comparison
			if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
				return b.transactionDate.localeCompare(a.transactionDate);
			}
			return dateB - dateA;
		} catch (error) {
			console.error('Date parsing error:', error, a.transactionDate, b.transactionDate);
			return b.transactionDate.localeCompare(a.transactionDate);
		}
	}
</script>

<section>
	<header>
		<h3>{$_('components.maintenances.payment.paymentHistory')}</h3>
	</header>

	{#if payments.length > 0}
		<GroupedList
			items={payments}
			groupBy={(p) => p.yearMonth}
			sortGroups={(a, b) => parseInt(b) - parseInt(a)}
			sortGroupItems={sortPaymentsByDate}
		>
			{#snippet groupHeader(yearMonth, group)}
				<h4>{formatYearMonth(yearMonth)}</h4>
				<span>
					{group.length}
					{group.length === 1
						? $_('components.maintenances.payment.payment')
						: $_('components.maintenances.payment.payments')}
				</span>
				<span>{formatCurrency(group.reduce((sum, p) => sum + p.amount, 0))}</span>
			{/snippet}
			{#snippet children(yearMonth, group)}
				{#each group as payment}
					<li>
						<div>
							{formatCurrency(payment.amount)}
						</div>
						<div>
							{$_('components.maintenances.payment.date')}: {payment.transactionDate}
						</div>
						{#if payment.description}
							<div>{payment.description}</div>
						{/if}
						<small>{$_('components.maintenances.payment.paymentId')}: {payment.id}</small>
					</li>
				{/each}
			{/snippet}
		</GroupedList>
	{:else}
		<p class="no-payments">{$_('components.maintenances.payment.noPayments')}</p>
	{/if}
</section>
