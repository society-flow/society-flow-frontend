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
		Object.keys(grouped).forEach((key) => {
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
					<button class="accordion-header" onclick={() => toggleAccordion(yearMonth)} type="button">
						<div class="accordion-title">
							<h4>{formatYearMonth(yearMonth)}</h4>
							<span class="calculation-count">
								{monthCalculations.length}
								{monthCalculations.length === 1 ? 'residence' : 'residences'}
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
											<h5 class="residence-name">
												{calculation.residenceName || calculation.residenceId}
											</h5>
										</div>
										<div class="amounts">
											<div class="amount-to-pay">
												<span class="label"
													>{$_('components.calculations.list.calculatedForCollection')}:</span
												>
												<span class="value">{formatCurrency(calculation.amountToPay)}</span>
											</div>
											{#if calculation.expensePaid && calculation.expensePaid > 0}
												<div class="expense-paid">
													<span class="label"
														>{$_('components.calculations.list.actualExpensePaid')}:</span
													>
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
