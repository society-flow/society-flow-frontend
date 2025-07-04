<script>
	import { _ } from 'svelte-i18n';

	const { calculations, society } = $props();

	let groupedCalculations = $state({});
	let sortedYearMonths = $state([]);

	// Update grouped calculations when calculations change
	$effect(() => {
		console.log('CalculationsList effect running, calculations:', calculations);
		if (!calculations || calculations.length === 0) {
			console.log('No calculations, setting empty');
			groupedCalculations = {};
			sortedYearMonths = [];
			return;
		}
		
		const grouped = calculations.reduce((acc, calculation) => {
			const yearMonth = calculation.yearMonth;
			if (!acc[yearMonth]) {
				acc[yearMonth] = [];
			}
			acc[yearMonth].push(calculation);
			return acc;
		}, {});

		// Sort each group by residence name or ID
		Object.keys(grouped).forEach(key => {
			grouped[key].sort((a, b) => {
				// Sort by residence name if available, otherwise by residence ID
				const nameA = a.residenceName || a.residenceId || '';
				const nameB = b.residenceName || b.residenceId || '';
				return nameA.localeCompare(nameB);
			});
		});

		console.log('Setting new grouped calculations:', grouped);
		groupedCalculations = grouped;
		
		const sorted = Object.keys(grouped).sort((a, b) => parseInt(b) - parseInt(a));
		console.log('Setting new sorted months:', sorted);
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
		if (openAccordions.has(yearMonth)) {
			openAccordions.delete(yearMonth);
		} else {
			openAccordions.add(yearMonth);
		}
		openAccordions = new Set(openAccordions);
	}
</script>

<section class="calculations-list">
	<header>
		<h3>{$_('pages.expenses.detail.calculations')}</h3>
	</header>

	{#if sortedYearMonths.length > 0}
		<div class="accordion">
			{#each sortedYearMonths as yearMonth}
				{@const isOpen = openAccordions.has(yearMonth)}
				{@const monthCalculations = groupedCalculations[yearMonth]}
				{@const totalAmount = monthCalculations.reduce((sum, c) => sum + c.amountToPay, 0)}
				{@const paidAmount = monthCalculations.reduce((sum, c) => sum + (c.expensePaid || 0), 0)}
				{@const isLatest = yearMonth === sortedYearMonths[0]}
				
				<div class="accordion-item {isLatest ? 'latest' : 'historical'}">
					<button
						class="accordion-header"
						onclick={() => toggleAccordion(yearMonth)}
						type="button"
					>
						<div class="accordion-title">
							<h4>{formatYearMonth(yearMonth)}</h4>
							<span class="calculation-count">
								{monthCalculations.length} {monthCalculations.length === 1 ? 'residence' : 'residences'}
							</span>
						</div>
						<div class="accordion-summary">
							<div class="amount-info">
								<span class="total-amount">{formatCurrency(totalAmount)}</span>
								{#if paidAmount > 0}
									<span class="paid-amount">({formatCurrency(paidAmount)} paid)</span>
								{/if}
							</div>
							<span class="expand-icon {isOpen ? 'expanded' : ''}">{isOpen ? '▼' : '▶'}</span>
						</div>
					</button>

					{#if isOpen}
						<div class="accordion-content">
							{#each monthCalculations as calculation}
								<div class="calculation-item">
									<div class="calculation-details">
										<div class="residence-info">
											<h5 class="residence-name">{calculation.residenceName || calculation.residenceId}</h5>
										</div>
										<div class="amounts">
											<div class="amount-to-pay">
												<span class="label">Amount:</span>
												<span class="value">{formatCurrency(calculation.amountToPay)}</span>
											</div>
											{#if calculation.expensePaid && calculation.expensePaid > 0}
												<div class="expense-paid">
													<span class="label">Paid:</span>
													<span class="value paid">{formatCurrency(calculation.expensePaid)}</span>
												</div>
											{/if}
										</div>
									</div>
									<div class="calculation-meta">
										<small class="calculation-id">ID: {calculation.id.slice(-8)}</small>
									</div>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{:else}
		<p class="no-calculations">{$_('pages.expenses.detail.noCalculations')}</p>
	{/if}
</section>

<style>
	.calculations-list {
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

	.calculation-count {
		color: #666;
		font-size: 0.9rem;
		margin-top: 0.2rem;
	}

	.accordion-summary {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.amount-info {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	.total-amount {
		font-weight: 600;
		color: #059669;
	}

	.paid-amount {
		font-size: 0.8rem;
		color: #666;
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

	.calculation-item {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		padding: 0.75rem 0;
		border-bottom: 1px solid #f0f0f0;
	}

	.calculation-item:last-child {
		border-bottom: none;
	}

	.calculation-details {
		flex: 1;
	}

	.residence-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;
	}

	.residence-name {
		margin: 0;
		font-size: 1rem;
		font-weight: 600;
		color: #333;
	}


	.amounts {
		display: flex;
		gap: 1rem;
	}

	.amount-to-pay,
	.expense-paid {
		display: flex;
		flex-direction: column;
	}

	.amounts .label {
		font-size: 0.8rem;
		color: #666;
		margin-bottom: 0.1rem;
	}

	.amounts .value {
		font-weight: 600;
	}

	.amounts .value.paid {
		color: #059669;
	}

	.calculation-meta {
		text-align: right;
		margin-top: 0.5rem;
	}

	.calculation-id {
		color: #999;
		font-size: 0.8rem;
	}

	.no-calculations {
		text-align: center;
		padding: 2rem;
		color: #666;
		font-style: italic;
	}
</style>
