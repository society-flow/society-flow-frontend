<script>
	import { _ } from 'svelte-i18n';
	import GroupedList from '$lib/components/grouped-list.svelte';
	import ExpenseCard from './card.svelte';

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
		const dateA = new Date(a.transactionDate);
		const dateB = new Date(b.transactionDate);
		// If dates are invalid, fall back to string comparison
		if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
			return b.transactionDate.localeCompare(a.transactionDate);
		}
		return dateB - dateA;
	}
</script>

<section class="expense-payment-list">
	<header>
		<h3>{$_('components.expenses.payment.paymentHistory')}</h3>
	</header>

	{#if payments.length > 0}
		<GroupedList
			items={payments}
			groupBy={(p) => p.yearMonth}
			sortGroups={(a, b) => parseInt(b) - parseInt(a)}
			sortGroupItems={sortPaymentsByDate}
		>
			{#snippet groupHeader(yearMonth, group, groupIndex)}
				{@const totalAmount = group.reduce((sum, p) => sum + p.amount, 0)}
				{@const isLatest = groupIndex === 0}

				<h4>{formatYearMonth(yearMonth)}</h4>
				<span class="payment-count">
					{group.length}
					{group.length === 1
						? $_('components.expenses.payment.payment')
						: $_('components.expenses.payment.payments')}
				</span>
				<span class="total-amount">{formatCurrency(totalAmount)}</span>
			{/snippet}
			{#snippet children(yearMonth, group, groupIndex)}
				{#each group as payment}
					<ExpenseCard {payment} {society} />
				{/each}
			{/snippet}
		</GroupedList>
	{:else}
		<p class="no-payments">{$_('components.expenses.payment.noPayments')}</p>
	{/if}
</section>

<style>
	.expense-payment-list {
		width: 100%;
	}

	.no-payments {
		text-align: center;
		color: #666;
		font-style: italic;
		padding: 32px;
	}
</style>
