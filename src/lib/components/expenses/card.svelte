<script>
	import Anchor from '$lib/components/anchor.svelte';
	import Icon from '$lib/components/icon.svelte';
	import Card from '$lib/components/card.svelte';
	import FormatCurrency from '$lib/components/format/currency.svelte';

	const { expense = {}, currency = '' } = $props();
	const { id, name, amountPerMonth } = expense;
</script>

<Card>
	<Anchor href={`/expenses/${id}`}>
		<div>
			<Icon icon="budget-alt">
				{name}
			</Icon>
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
