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

<section class="maintenance-payment-list">
	<header>
		<h3>{$_('components.maintenances.payment.paymentHistory')}</h3>
	</header>

	{#if sortedYearMonths.length > 0}
		{#each sortedYearMonths as yearMonth}
			{@const monthPayments = groupedPayments[yearMonth]}
			{@const totalAmount = monthPayments.reduce((sum, p) => sum + p.amount, 0)}
			{@const isLatest = yearMonth === sortedYearMonths[0]}

			<details>
				<summary>
					<h4>{formatYearMonth(yearMonth)}</h4>
					<span>
						{monthPayments.length}
						{monthPayments.length === 1
							? $_('components.maintenances.payment.payment')
							: $_('components.maintenances.payment.payments')}
					</span>
					<span>{formatCurrency(totalAmount)}</span>
				</summary>
				{#if monthPayments}
					<ul>
						{#each monthPayments as payment}
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
					</ul>
				{/if}
			</details>
		{/each}
	{:else}
		<p class="no-payments">{$_('components.maintenances.payment.noPayments')}</p>
	{/if}
</section>
