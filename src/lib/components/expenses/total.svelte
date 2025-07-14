<script>
	import { IconCalendarEndOfMonth } from 'obra-icons-svelte';
	import FormatCurrency from '$lib/components/format/currency.svelte';
	const { expenses, currency } = $props();

	const total = $derived(
		expenses.reduce((acc, expense) => {
			return acc + expense.amountPerMonth;
		}, 0)
	);
</script>

<span>
	<!-- <IconCalendarEndOfMonth /> -->
	<strong>
		<FormatCurrency value={total} {currency} />
	</strong>
</span>

<style>
	span {
		display: flex;
		align-items: center;
		gap: calc(var(--s) / 2);
	}
</style>
