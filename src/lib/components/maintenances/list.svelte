<script>
	import { _ } from 'svelte-i18n';

	const { maintenances, society, residence } = $props();

	let groupedMaintenances = $state({});
	let sortedYearMonths = $state([]);

	// Update grouped maintenances when maintenances change
	$effect(() => {
		if (!maintenances || maintenances.length === 0) {
			groupedMaintenances = {};
			sortedYearMonths = [];
			return;
		}
		
		const grouped = maintenances.reduce((acc, maintenance) => {
			const yearMonth = maintenance.yearMonth;
			if (!acc[yearMonth]) {
				acc[yearMonth] = [];
			}
			acc[yearMonth].push(maintenance);
			return acc;
		}, {});

		// Sort each group by creation date (newest first)
		Object.keys(grouped).forEach(key => {
			grouped[key].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
		});

		groupedMaintenances = grouped;
		
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

<section class="maintenance-list">
	<header>
		<h3>{$_('components.maintenances.list.title')}</h3>
	</header>

	{#if sortedYearMonths.length > 0}
		<div class="accordion">
			{#each sortedYearMonths as yearMonth}
				{@const isOpen = openAccordions.has(yearMonth)}
				{@const monthMaintenances = groupedMaintenances[yearMonth]}
				{@const isLatest = yearMonth === sortedYearMonths[0]}
				{@const activeMaintenance = monthMaintenances.find(m => m.isCurrent === true || m.isCurrent === 'true')}
				{@const totalAmount = monthMaintenances.reduce((sum, m) => sum + m.totalAmountToPay, 0)}
				{@const residenceCount = monthMaintenances.length}
				
				<div class="accordion-item {isLatest ? 'latest' : 'historical'}">
					<button
						class="accordion-header"
						onclick={() => toggleAccordion(yearMonth)}
						type="button"
					>
						<div class="accordion-title">
							<h4>{formatYearMonth(yearMonth)}</h4>
							<span class="maintenance-status">
								<span class="residence-count">{residenceCount} {residenceCount === 1 ? 'residence' : 'residences'}</span>
								{#if activeMaintenance}
									<span class="status-badge active">{$_('components.maintenances.list.active')}</span>
								{:else}
									<span class="status-badge inactive">{$_('components.maintenances.list.inactive')}</span>
								{/if}
							</span>
						</div>
						<div class="accordion-summary">
							<span class="total-amount">{formatCurrency(totalAmount)}</span>
							<span class="expand-icon {isOpen ? 'expanded' : ''}">{isOpen ? '▼' : '▶'}</span>
						</div>
					</button>

					{#if isOpen}
						<div class="accordion-content">
							{#each monthMaintenances as maintenance}
								<div class="maintenance-item">
									<div class="maintenance-details">
										<div class="maintenance-header">
											<h5 class="residence-name">{maintenance.residenceName || residence?.residenceName || `Residence ${maintenance.residenceId.slice(-8)}`}</h5>
											<div class="maintenance-status-badge {maintenance.isCurrent ? 'active' : 'inactive'}">
												{maintenance.isCurrent ? $_('components.maintenances.list.active') : $_('components.maintenances.list.inactive')}
											</div>
										</div>
										<div class="amounts">
											<div class="amount-row">
												<span class="label">{$_('components.maintenances.list.previousAmount')}:</span>
												<span class="value">{formatCurrency(maintenance.previousAmountToPay)}</span>
											</div>
											<div class="amount-row">
												<span class="label">{$_('components.maintenances.list.fine')}:</span>
												<span class="value">{formatCurrency(maintenance.fineToPay)}</span>
											</div>
											<div class="amount-row">
												<span class="label">{$_('components.maintenances.list.thisMonth')}:</span>
												<span class="value">{formatCurrency(maintenance.thisMonthCalculation)}</span>
											</div>
											<div class="amount-row total">
												<span class="label">{$_('components.maintenances.list.totalAmount')}:</span>
												<span class="value total-amount">{formatCurrency(maintenance.totalAmountToPay)}</span>
											</div>
										</div>
										{#if maintenance.withFormula}
											<div class="formula">
												<small class="formula-text">{maintenance.withFormula}</small>
											</div>
										{/if}
									</div>
									<div class="maintenance-meta">
										<small class="maintenance-id">{$_('components.maintenances.list.maintenanceId')}: {maintenance.id.slice(-8)}</small>
									</div>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{:else}
		<p class="no-maintenances">{$_('components.maintenances.list.noMaintenances')}</p>
	{/if}
</section>
