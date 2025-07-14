<script>
	import Anchor from '$lib/components/anchor.svelte';
	import Card from '$lib/components/card.svelte';
	import FormatCurrency from '$lib/components/format/currency.svelte';
	import { IconBudgetAlt, IconCalendar } from 'obra-icons-svelte';

	const { expense = {}, currency = '' } = $props();
	const { id, name, amountPerMonth } = expense;
	$inspect(expense);
</script>

<Card>
	<Anchor href={`/expenses/${id}`}>
		<div>
			<span>
				<IconBudgetAlt />
				{name}
			</span>
			<span>
				<FormatCurrency value={amountPerMonth} {currency} />
			</span>
		</div>
	</Anchor>
</Card>

<style>
	div {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: space-between;
		flex-grow: 1;
	}
	span {
		display: flex;
		align-items: center;
		gap: var(--s);
	}
</style>
