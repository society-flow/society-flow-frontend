<script>
	import { _ } from 'svelte-i18n';
	import { IconOrangeSlice } from 'obra-icons-svelte';

	const { residences = [], icon = true, warnTotal = false } = $props();
	const total = $derived(
		residences.reduce((acc, res) => {
			return acc + res.percentageOwnership;
		}, 0)
	);
	const shouldWarn = $derived(warnTotal && total < 100);
</script>

<span title={$_('components.residences.form.percentageOwnership')} class:warn={shouldWarn}>
	{total}
	{#if icon}
		<IconOrangeSlice />
	{/if}
</span>

<style>
	span {
		display: flex;
		justify-content: center;
		gap: calc(var(--s) / 3);
	}
	span.warn {
		text-decoration: underline;
    color: var(--c-error);
	}
</style>
