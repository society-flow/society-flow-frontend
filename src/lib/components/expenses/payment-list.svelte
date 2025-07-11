<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import RelativeDate from '$lib/components/date/relative.svelte';

	const { payments, society } = $props();

	let groupedPayments = $state({});
	let sortedYearMonths = $state([]);

	// Update grouped payments when payments change
	$effect(() => {
		if (!payments || payments.length === 0) {
			groupedPayments = {};
			sortedYearMonths = [];
			return;
		}

		const grouped = payments.reduce((acc, payment) => {
			const yearMonth = payment.yearMonth;
			if (!acc[yearMonth]) {
				acc[yearMonth] = [];
			}
			acc[yearMonth].push(payment);
			return acc;
		}, {});

		// Sort each group by transaction date (newest first)
		Object.keys(grouped).forEach((key) => {
			grouped[key].sort((a, b) => {
				const dateA = new Date(a.transactionDate);
				const dateB = new Date(b.transactionDate);
				// If dates are invalid, fall back to string comparison
				if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
					return b.transactionDate.localeCompare(a.transactionDate);
				}
				return dateB - dateA;
			});
		});

		groupedPayments = grouped;

		const sorted = Object.keys(grouped).sort((a, b) => parseInt(b) - parseInt(a));
		sortedYearMonths = sorted;
	});

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

<section class="expense-payment-list">
	<header>
		<h3>{$_('components.expenses.payment.paymentHistory')}</h3>
	</header>

	{#if sortedYearMonths.length > 0}
		{#each sortedYearMonths as yearMonth}
			{@const isOpen = openAccordions.has(yearMonth)}
			{@const monthPayments = groupedPayments[yearMonth]}
			{@const totalAmount = monthPayments.reduce((sum, p) => sum + p.amount, 0)}
			{@const isLatest = yearMonth === sortedYearMonths[0]}

			<detail class="accordion-item {isLatest ? 'latest' : 'historical'}">
				<summary class="accordion-header" onclick={() => toggleAccordion(yearMonth)} type="button">
					<div class="accordion-title">
						<h4>{formatYearMonth(yearMonth)}</h4>
						<span class="payment-count">
							{monthPayments.length}
							{monthPayments.length === 1
								? $_('components.expenses.payment.payment')
								: $_('components.expenses.payment.payments')}
						</span>
					</div>
					<div class="accordion-summary">
						<span class="total-amount">{formatCurrency(totalAmount)}</span>
						<span class="expand-icon {isOpen ? 'expanded' : ''}">{isOpen ? '▼' : '▶'}</span>
					</div>
				</summary>

				{#if isOpen}
					<div class="accordion-content">
						{#each monthPayments as payment}
							<div class="payment-item">
								<div class="payment-details">
									<div class="payment-amount {payment.amount < 0 ? 'refund' : 'payment'}">
										{formatCurrency(payment.amount)}
									</div>
									<div class="payment-date">
										{$_('components.expenses.payment.date')}: {payment.transactionDate}
									</div>
									{#if payment.description}
										<div class="payment-description">{payment.description}</div>
									{/if}
								</div>
								<div class="payment-meta">
									<small class="payment-id"
										>{$_('components.expenses.payment.paymentId')}: {payment.id.slice(-8)}</small
									>
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</detail>
		{/each}
	{:else}
		<p class="no-payments">{$_('components.expenses.payment.noPayments')}</p>
	{/if}
</section>
