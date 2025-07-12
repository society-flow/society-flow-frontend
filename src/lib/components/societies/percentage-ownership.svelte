<script>
	import { _ } from 'svelte-i18n';
	import { IconOrangeSlice } from 'obra-icons-svelte';

	const { residences = [], requireTotal = true } = $props();
	const total = residences.reduce((acc, res) => {
		return acc + res.percentageOwnership;
	}, 0);
	const shouldWarn = $derived(requireTotal && total < 100);
</script>

<span title={$_('components.residences.form.percentageOwnership')} class:shouldWarn={'warn'}>
	{total}
	<IconOrangeSlice />
</span>

<style>
	span {
		display: flex;
		justify-content: center;
		gap: calc(var(--s) / 3);
	}
	span.warn {
		text-decoration: underline;
	}
</style>
