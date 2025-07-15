<script>
	import { _ } from 'svelte-i18n';
	import { createEventDispatcher } from 'svelte';
	import { EXPENSE_DISTRIBUTIONS } from '$lib/const/expense_distribution_types.js';
	import { api } from '$lib/api.svelte.js';
	import Total from './total.svelte';
	import Icon from '$lib/components/icon.svelte';

	const dispatch = createEventDispatcher();

	const { expenseId, distributions: distribs = [] } = $props();

	let distError = $state('');
	let distributionValues = $state({});

	// Initialize distribution values from props
	$effect(() => {
		const values = {};
		Object.keys(EXPENSE_DISTRIBUTIONS).forEach((calculationMode) => {
			const existing = distribs.find((d) => d.calculationMode === calculationMode);
			values[calculationMode] = {
				id: existing?.id,
				percentageCoverage: existing?.percentageCoverage || 0,
				isActive: existing?.isActive !== false && (existing?.percentageCoverage || 0) > 0
			};
		});
		distributionValues = values;
	});

	const activeDistributions = $derived(
		Object.keys(EXPENSE_DISTRIBUTIONS)
			.map((calculationMode) => ({
				calculationMode,
				percentageCoverage: distributionValues[calculationMode]?.percentageCoverage || 0,
				isActive: distributionValues[calculationMode]?.isActive || false
			}))
			.filter((d) => d.isActive && d.percentageCoverage > 0)
	);

	const coverageTotal = $derived(
		activeDistributions.reduce((sum, d) => sum + Number(d.percentageCoverage), 0)
	);
	const isValid = $derived(coverageTotal === 100);
	const isHigh = $derived(coverageTotal > 100);

	function updateDistribution(calculationMode, percentageCoverage) {
		distributionValues[calculationMode] = {
			...distributionValues[calculationMode],
			percentageCoverage,
			isActive: percentageCoverage > 0
		};
		distError = '';
	}

	function editDistributions() {
		distError = '';
	}

	async function saveDistributions(event) {
		event.preventDefault();
		distError = '';

		// Validate total coverage
		if (activeDistributions.length > 0) {
			if (coverageTotal !== 100) {
				distError = $_('pages.expenses.detail.error.totalCoverage');
				return;
			}
		}

		try {
			// Process all distribution types
			for (const calculationMode of Object.keys(EXPENSE_DISTRIBUTIONS)) {
				const distribution = distributionValues[calculationMode];
				const percentageCoverage = distribution?.percentageCoverage || 0;

				if (percentageCoverage > 0) {
					// Save distributions with non-zero coverage
					await api.createOrUpdateExpenseDistribution({
						id: distribution?.id,
						expenseId,
						calculationMode,
						percentageCoverage,
						calculationValue: 0,
						isActive: true
					});
				} else if (distribution?.id) {
					// Mark existing distributions with zero coverage as inactive
					await api.createOrUpdateExpenseDistribution({
						id: distribution.id,
						expenseId,
						calculationMode,
						percentageCoverage: 0,
						calculationValue: 0,
						isActive: false
					});
				}
			}

			// Notify parent to refresh and hide form
			dispatch('save');
		} catch (error) {
			console.error('Error saving distributions:', error);
			distError = $_('pages.expenses.detail.error.saveFailed') || 'Failed to save distributions';
		}
	}

	function cancelDistributions() {
		dispatch('cancel');
	}
</script>

<form onsubmit={saveDistributions} class:isValid class:isHigh>
	{#each Object.keys(EXPENSE_DISTRIBUTIONS) as calculationMode}
		{@const distributionType = EXPENSE_DISTRIBUTIONS[calculationMode]}
		{@const distribution = distributionValues[calculationMode] || { percentageCoverage: 0 }}
		{@const icon = distributionType?.icon}
		<fieldset>
			<legend>
				<Icon {icon} className="type-icon" />
				{$_(`const.expense_types.${calculationMode}`)}
			</legend>
			<input
				type="number"
				min="0"
				max="100"
				bind:value={distribution.percentageCoverage}
				oninput={(e) => updateDistribution(calculationMode, Number(e.target.value))}
			/>
			<progress max="100" value={distribution.percentageCoverage}></progress>
		</fieldset>
	{/each}

	{#if distError}
		<fieldset>
			<p class="error">{distError}</p>
		</fieldset>
	{/if}

	<fieldset>
		<Total distributions={activeDistributions} showProgress />
		<menu>
			<li>
				<button type="button" onclick={cancelDistributions}>
					<Icon icon="close" />
					{$_('common.cancel')}
				</button>
			</li>
			<li>
				<button type="submit" disabled={!isValid}>
					{$_('pages.expenses.detail.saveDistributions')}
				</button>
			</li>
		</menu>
	</fieldset>
</form>

<style>
	form {
		--c-status: var(--c-link);
		fieldset {
			display: grid;
			grid-template-columns: 1fr 2fr;
			align-items: center;
			gap: var(--s);
			flex-direction row;
			legend {
				display: flex;
				align-items: center;
				gap: var(--s);
			}
			progress {
				width: 100%;
				flex-grow: 1;
				&::-moz-progress-bar,
				&::-webkit-progress-value {
					background-color: var(--c-status);
					transition background-color 200ms ease-in-out;
				}
			}
			input {
				flex-grow: 0;
				width: auto;
			}
			&:last-of-type {
        display: flex;
				flex-wrap: nowrap;
        align-items: center;
        justify-content: center;
        flex-direction: row;
        flex-wrap: wrap;
        menu {
          margin: 0;
          padding: 0;
          align-self: flex-end;
        }
			}
			:global(output, output progress) {
				flex-grow: 1;
			}
		}
		&.isHigh {
			--c-status: var(--c-warn);
		}
		&.isValid {
			--c-status: var(--c-success);
		}
	}
</style>
