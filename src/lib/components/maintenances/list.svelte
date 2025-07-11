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

<style>
	.maintenance-list {
		margin: 1rem 0;
	}

	.accordion {
		border: 1px solid var(--c-bg--secondary);
		border-radius: 8px;
		overflow: hidden;
	}

	.accordion-item {
		border-bottom: 1px solid var(--c-border);
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
		color: #1f2937;
	}

	.accordion-item.latest .accordion-title h4 {
		color: #065f46;
	}

	.accordion-item.historical .accordion-title h4 {
		color: #374151;
	}

	.maintenance-status {
		margin-top: 0.2rem;
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

	.residence-count {
		color: #666;
		font-size: 0.9rem;
	}

	.status-badge {
		padding: 0.2rem 0.5rem;
		border-radius: 4px;
		font-size: 0.8rem;
		font-weight: 600;
		text-transform: uppercase;
	}

	.status-badge.active {
		background-color: #d1fae5;
		color: #065f46;
	}

	.status-badge.inactive {
		background-color: #f3f4f6;
		color: #6b7280;
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

	.maintenance-item {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		padding: 0.75rem 0;
		border-bottom: 1px solid #f0f0f0;
	}

	.maintenance-item:last-child {
		border-bottom: none;
	}

	.maintenance-details {
		flex: 1;
	}

	.maintenance-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;
	}

	.residence-name {
		margin: 0;
		font-size: 1.1rem;
		font-weight: 600;
		color: #333;
	}

	.maintenance-status-badge {
		padding: 0.2rem 0.5rem;
		border-radius: 4px;
		font-size: 0.8rem;
		font-weight: 600;
		text-transform: uppercase;
	}

	.maintenance-status-badge.active {
		background-color: #d1fae5;
		color: #065f46;
	}

	.maintenance-status-badge.inactive {
		background-color: #f3f4f6;
		color: #6b7280;
	}

	.amounts {
		margin-bottom: 0.5rem;
	}

	.amount-row {
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.2rem;
	}

	.amount-row.total {
		border-top: 1px solid #e0e0e0;
		padding-top: 0.2rem;
		margin-top: 0.5rem;
		font-weight: 600;
	}

	.amounts .label {
		color: #666;
		font-size: 0.9rem;
	}

	.amounts .value {
		font-weight: 600;
	}

	.amounts .total-amount {
		color: #059669;
		font-size: 1.1rem;
	}

	.formula {
		margin-top: 0.5rem;
	}

	.formula-text {
		color: #666;
		font-size: 0.8rem;
		line-height: 1.3;
	}

	.maintenance-meta {
		text-align: right;
		margin-top: 0.5rem;
	}

	.maintenance-id {
		color: #999;
		font-size: 0.8rem;
	}

	.no-maintenances {
		text-align: center;
		padding: 2rem;
		color: #666;
		font-style: italic;
	}
</style>
