<script>
	import { _ } from 'svelte-i18n';

	const { payment, society } = $props();

	function formatCurrency(amount) {
		const currencyCode = society?.currency || 'EUR';
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: currencyCode
		}).format(amount);
	}
</script>

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

<style>
	.payment-item {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		padding: 12px 0;
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
		font-size: 1.1em;
		margin-bottom: 4px;
	}

	.payment-amount.payment {
		color: #28a745;
	}

	.payment-amount.refund {
		color: #dc3545;
	}

	.payment-date {
		font-size: 0.9em;
		color: #666;
		margin-bottom: 4px;
	}

	.payment-description {
		font-size: 0.9em;
		color: #333;
		margin-bottom: 4px;
	}

	.payment-meta {
		text-align: right;
	}

	.payment-id {
		font-size: 0.8em;
		color: #999;
	}
</style>
