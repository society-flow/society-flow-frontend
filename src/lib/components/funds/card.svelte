<script>
	import { _ } from 'svelte-i18n';
	import Card from '$lib/components/card.svelte';
	import FormatCurrency from '$lib/components/format/currency.svelte';
	import { IconBankFill } from 'obra-icons-svelte';

	const { total, currency } = $props();
</script>

<Card>
	<div>
		<h4>
			<IconBankFill />
			{$_('pages.funds')}
		</h4>
		<span>
			<FormatCurrency value={total} {currency} />
		</span>
	</div>
</Card>

<style>
	h4,
	div {
		display: flex;
		align-items: center;
		gap: var(--s);
	}
	div {
		background-color: var(--c-bg2);
		border-radius: var(--border-radius);
		padding: var(--s);
	}
</style>
