<script>
	import { _ } from 'svelte-i18n';
	import {
		IconCheck,
		IconClose,
		IconMath,
		IconHome,
		IconGrid,
		IconUser,
		IconLayers,
		IconCaretUpDown
	} from 'obra-icons-svelte';
	import { api } from '$lib/api.svelte.js';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const { expenseId, distributions: distribs = [] } = $props();

	let distError = $state('');
	let distributions = $state([]);

	$effect(() => {
		distributions = [...distribs];
	});

	const activeDistributions = $derived(distributions.filter((d) => d.isActive));
	const coverageTotal = $derived(
		activeDistributions.reduce((sum, d) => sum + Number(d.percentageCoverage), 0)
	);
	const isValid = $derived(coverageTotal === 100);

	// Map each calculation mode to an icon
	const iconMap = {
		AMOUNT_PER_OWNERSHIP_PERCENTAGE: IconMath,
		AMOUNT_PER_RESIDENCE: IconHome,
		AMOUNT_PER_SQUARE_AREA: IconGrid,
		AMOUNT_PER_RESIDENT: IconUser,
		AMOUNT_PER_RESIDENT_PER_FLOOR_COUNT: IconLayers
	};

	// Handlers
	function addDistribution() {
		distributions = [
			...distributions,
			{ expenseId, calculationMode: '', percentageCoverage: 0, isActive: true }
		];
		distError = '';
	}

	function editDistributions() {
		distError = '';
	}

	async function saveDistributions() {
		distError = '';
		// Validate total coverage
		if (activeDistributions.length > 0) {
			const total = activeDistributions.reduce((sum, d) => sum + Number(d.percentageCoverage), 0);
			if (total !== 100) {
				distError = $_('pages.expenses.detail.error.totalCoverage');
				return;
			}
		}
		// Persist only distributions with non-zero coverage
		for (const d of distributions.filter((d) => Number(d.percentageCoverage) > 0)) {
			await api.createOrUpdateExpenseDistribution({
				id: d.id,
				expenseId,
				calculationMode: d.calculationMode,
				percentageCoverage: d.percentageCoverage,
				calculationValue: 0,
				isActive: true
			});
		}
		// Notify parent to refresh and hide form
		dispatch('save');
	}

	function removeDistribution(d) {
		if (d.id) {
			// Mark persisted distribution inactive
			distributions = distributions.map((dist) =>
				dist.id === d.id ? { ...dist, isActive: false } : dist
			);
		} else {
			// Remove new entry entirely
			distributions = distributions.filter((dist) => dist !== d);
		}
	}

	function cancelDistributions() {
		dispatch('cancel');
	}
</script>

<form onsubmit={saveDistributions} class:isValid>
	{#each distributions as d, index}
		<fieldset>
			<legend>
				{#if iconMap[d.calculationMode]}
					<svelte:component this={iconMap[d.calculationMode]} class="type-icon" />
				{/if}
				{$_(`const.expense_types.${d.calculationMode}`)}
			</legend>
			<input type="number" min="0" max="100" bind:value={distributions[index].percentageCoverage} />
			<!-- Individual type coverage bar -->
			<progress max="100" value={distributions[index].percentageCoverage}></progress>
		</fieldset>
	{/each}
	{#if distError}
		<fieldset>
			<p class="error">{distError}</p>
		</fieldset>
	{/if}
	<fieldset>
		<progress max="100" value={coverageTotal}></progress>
		{#if isValid}
			<IconCheck />
		{:else}
			<IconCaretUpDown />
		{/if}
		<span>{coverageTotal}/100%</span>
		<button type="submit" disabled={coverageTotal !== 100}>
			{$_('pages.expenses.detail.saveDistributions')}
		</button>
		<button type="button" onclick={cancelDistributions}>
			<IconClose />
			{$_('common.cancel')}
		</button>
	</fieldset>
</form>

<style>
	form {
		/* background: red; */
		fieldset {
			display: grid;
			grid-template-columns: 1fr 2fr;
			align-items: center;
			gap: var(--s);
			/* flex-wrap: nowrap; */
			flex-direction: row;
			progress {
				width: 100%;
				flex-grow: 1;
			}
			input {
				flex-grow: 0;
				width: auto;
				/* flex-shrink: 1; */
			}
			&:last-of-type {
				display: flex;
			}
		}
		progress {
			&::-moz-progress-bar,
			&::-webkit-progress-value {
				transition: background-color 200ms ease-in-out;
				background-color: var(--c-error);
			}
		}
		&.isValid {
			progress {
				&::-moz-progress-bar,
				&::-webkit-progress-value {
					background-color: var(--c-link);
				}
			}
		}
	}
</style>
