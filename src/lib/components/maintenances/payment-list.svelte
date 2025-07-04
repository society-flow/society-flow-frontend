<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import RelativeDate from '$lib/components/date/relative.svelte';

	const { payments, society } = $props();

	let groupedPayments = $state({});
	let sortedYearMonths = $state([]);

	// Update grouped payments when payments change
	$effect(() => {
		console.log('MaintenancePaymentList received payments:', payments);
		if (!payments || payments.length === 0) {
			console.log('No maintenance payments, setting empty');
			groupedPayments = {};
			sortedYearMonths = [];
			return;
		}
		
		const grouped = payments.reduce((acc, payment) => {
			const yearMonth = payment.yearMonth;
			console.log('Processing maintenance payment:', payment, 'yearMonth:', yearMonth);
			if (!acc[yearMonth]) {
				acc[yearMonth] = [];
			}
			acc[yearMonth].push(payment);
			return acc;
		}, {});

		// Sort each group by transaction date (newest first)
		Object.keys(grouped).forEach(key => {
			grouped[key].sort((a, b) => {
				try {
					const dateA = new Date(a.transactionDate);
					const dateB = new Date(b.transactionDate);
					// If dates are invalid, fall back to string comparison
					if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
						console.log('Invalid dates found:', a.transactionDate, b.transactionDate);
						return b.transactionDate.localeCompare(a.transactionDate);
					}
					return dateB - dateA;
				} catch (error) {
					console.error('Date parsing error:', error, a.transactionDate, b.transactionDate);
					return b.transactionDate.localeCompare(a.transactionDate);
				}
			});
		});

		console.log('Final grouped maintenance payments:', grouped);
		groupedPayments = grouped;
		
		const sorted = Object.keys(grouped).sort((a, b) => parseInt(b) - parseInt(a));
		console.log('Sorted maintenance payment months:', sorted);
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

	let openAccordions = $state(new Set());

	function toggleAccordion(yearMonth) {
		console.log('toggleAccordion called for maintenance payments with:', yearMonth);
		console.log('openAccordions before:', openAccordions);
		if (openAccordions.has(yearMonth)) {
			openAccordions.delete(yearMonth);
		} else {
			openAccordions.add(yearMonth);
		}
		openAccordions = new Set(openAccordions);
		console.log('openAccordions after:', openAccordions);
	}
</script>

<section class="maintenance-payment-list">
	<header>
		<h3>{$_('components.maintenances.payment.paymentHistory')}</h3>
	</header>

	{#if sortedYearMonths.length > 0}
		<div class="accordion">
			{#each sortedYearMonths as yearMonth}
				{@const isOpen = openAccordions.has(yearMonth)}
				{@const monthPayments = groupedPayments[yearMonth]}
				{@const totalAmount = monthPayments.reduce((sum, p) => sum + p.amount, 0)}
				{@const isLatest = yearMonth === sortedYearMonths[0]}
				
				<div class="accordion-item {isLatest ? 'latest' : 'historical'}">
					<button
						class="accordion-header"
						onclick={() => toggleAccordion(yearMonth)}
						type="button"
					>
						<div class="accordion-title">
							<h4>{formatYearMonth(yearMonth)}</h4>
							<span class="payment-count">
								{monthPayments.length} {monthPayments.length === 1 ? $_('components.maintenances.payment.payment') : $_('components.maintenances.payment.payments')}
							</span>
						</div>
						<div class="accordion-summary">
							<span class="total-amount">{formatCurrency(totalAmount)}</span>
							<span class="expand-icon {isOpen ? 'expanded' : ''}">{isOpen ? '▼' : '▶'}</span>
						</div>
					</button>

					{#if isOpen}
						<div class="accordion-content">
							{#each monthPayments as payment}
								<div class="payment-item">
									<div class="payment-details">
										<div class="payment-amount {payment.amount < 0 ? 'refund' : 'payment'}">{formatCurrency(payment.amount)}</div>
										<div class="payment-date">
											Date: {payment.transactionDate}
										</div>
										{#if payment.description}
											<div class="payment-description">{payment.description}</div>
										{/if}
									</div>
									<div class="payment-meta">
										<small class="payment-id">ID: {payment.id.slice(-8)}</small>
									</div>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{:else}
		<p class="no-payments">{$_('components.maintenances.payment.noPayments')}</p>
	{/if}
</section>

<style>
	.maintenance-payment-list {
		margin: 1rem 0;
	}

	.accordion {
		border: 1px solid #e0e0e0;
		border-radius: 8px;
		overflow: hidden;
	}

	.accordion-item {
		border-bottom: 1px solid #e0e0e0;
	}

	.accordion-item:last-child {
		border-bottom: none;
	}

	.accordion-item.latest {
		background-color: #f0f9ff;
	}

	.accordion-item.historical {
		background-color: #f8f9fa;
	}

	.accordion-header {
		width: 100%;
		padding: 1rem;
		background: none;
		border: none;
		cursor: pointer;
		display: flex;
		justify-content: space-between;
		align-items: center;
		text-align: left;
		transition: background-color 0.2s;
	}

	.accordion-header:hover {
		background-color: rgba(0, 0, 0, 0.05);
	}

	.accordion-title h4 {
		margin: 0;
		font-size: 1.1rem;
		font-weight: 600;
	}

	.payment-count {
		color: #666;
		font-size: 0.9rem;
		margin-top: 0.2rem;
	}

	.accordion-summary {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.total-amount {
		font-weight: 600;
		color: #059669;
	}

	.expand-icon {
		transition: transform 0.2s;
		font-size: 0.8rem;
	}

	.expand-icon.expanded {
		transform: rotate(0deg);
	}

	.accordion-content {
		padding: 0 1rem 1rem;
		border-top: 1px solid #e0e0e0;
	}

	.payment-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem 0;
		border-bottom: 1px solid #f0f0f0;
	}

	.payment-item:last-child {
		border-bottom: none;
	}

	.payment-details {
		flex: 1;
	}

	.payment-amount {
		font-weight: 600;
		font-size: 1.1rem;
	}

	.payment-amount.payment {
		color: #059669;
	}

	.payment-amount.refund {
		color: #dc2626;
	}

	.payment-date {
		color: #666;
		font-size: 0.9rem;
		margin-top: 0.2rem;
	}

	.payment-description {
		color: #333;
		font-size: 0.9rem;
		margin-top: 0.2rem;
		font-style: italic;
	}

	.payment-meta {
		text-align: right;
	}

	.payment-id {
		color: #999;
		font-size: 0.8rem;
	}

	.no-payments {
		text-align: center;
		padding: 2rem;
		color: #666;
		font-style: italic;
	}
</style>