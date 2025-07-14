<script>
	import { _ } from 'svelte-i18n';
	import { EXPENSE_DISTRIBUTIONS } from '$lib/const/expense_distribution_types.js';

	const { residences = [], icon = true, warnTotal = false } = $props();
	const total = $derived(
		residences.reduce((acc, res) => {
			return acc + res.percentageOwnership;
		}, 0)
	);
	const shouldWarn = $derived(warnTotal && total < 100);
  const isHigh = $derived(warnTotal && total > 100);
  const iconComponent = EXPENSE_DISTRIBUTIONS['AMOUNT_PER_OWNERSHIP_PERCENTAGE'].icon
</script>

<span title={$_('components.residences.form.percentageOwnership')} class:isWarn={shouldWarn} class:isHigh>
	{total}
	{#if iconComponent}
		<svelte:component this={iconComponent}/>
	{/if}
</span>

<style>
	span {
		display: flex;
		justify-content: center;
		gap: calc(var(--s) / 3);
	}
	span {
		text-decoration: underline;
    color: var(--c-status);
    &.isWarn {
      --c-status: var(--c-warn)
    }
    &.isHigh {
      --c-status: var(--c-error)
    }
	}
</style>
