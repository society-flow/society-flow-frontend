<script>
	import { _ } from 'svelte-i18n';
	import { EXPENSE_DISTRIBUTIONS } from '$lib/const/expense_distribution_types.js';
	import { api } from '$lib/api.svelte.js';
	import { createEventDispatcher } from 'svelte';
	import Total from './total.svelte';
	import { IconClose } from 'obra-icons-svelte';

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
  const isHigh = $derived(coverageTotal > 100)

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
			if (coverageTotal !== 100) {
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

<form onsubmit={saveDistributions} class:isValid class:isHigh>
	{#each distributions as d, index}
		{console.log(d)}
		{@const icon = EXPENSE_DISTRIBUTIONS[d.calculationMode]?.icon}
		<fieldset>
			<legend>
				<svelte:component this={icon} class="type-icon" />
				{$_(`const.expense_types.${d.calculationMode}`)}
			</legend>
			<input type="number" min="0" max="100" bind:value={distributions[index].percentageCoverage} />
			<progress max="100" value={distributions[index].percentageCoverage}></progress>
		</fieldset>
	{/each}
	{#if distError}
		<fieldset>
			<p class="error">{distError}</p>
		</fieldset>
	{/if}
	{#if distributions}
		<fieldset>
			<Total {distributions} showProgress />
			<button type="submit" disabled={!isValid}>
				{$_('pages.expenses.detail.saveDistributions')}
			</button>
			<button type="button" onclick={cancelDistributions}>
				<IconClose />
				{$_('common.cancel')}
			</button>
		</fieldset>
	{/if}
</form>

<style>
	form {
		/* background: red; */
    --c-status: var(--c-link);
		fieldset {
			display: grid;
			grid-template-columns: 1fr 2fr;
			align-items: center;
			gap: var(--s);
			/* flex-wrap: nowrap; */
			flex-direction: row;
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
          transition: background-color 200ms ease-in-out;
	      }
			}
			input {
				flex-grow: 0;
				width: auto;
				/* flex-shrink: 1; */
			}
			&:last-of-type {
				display: flex;
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
