<script>
	import { IconCalendarEndOfMonth } from 'obra-icons-svelte';
	const { expenses, currency } = $props();

	const total = $derived(
		expenses.reduce((acc, expense) => {
			return acc + expense.amountPerMonth;
		}, 0)
	);
</script>

<span>
	<strong>
		{total}
	</strong>
	{currency}
	<IconCalendarEndOfMonth />
</span>

<style>
	span {
		display: flex;
		align-items: center;
		gap: calc(var(--s) / 2);
	}
</style>
