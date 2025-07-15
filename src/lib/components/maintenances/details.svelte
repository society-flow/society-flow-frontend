<script>
	import { _, locale } from 'svelte-i18n';
	import FormatCurrency from '$lib/components/format/currency.svelte';
	import Icon from '$lib/components/icon.svelte'

	const { maintenance: m, society } = $props();
</script>

<details open>
	<summary>
		<Icon icon="business" />
		<h5>
			{m.residenceName}
		</h5>
		<FormatCurrency value={m.totalAmountToPay} currency={society.currency} />
	</summary>
	<section>
		<ul>
			<li>
				<Icon icon="calculator" />
				<strong>
					{$_('components.maintenances.list.totalAmount')}:
				</strong>
				<FormatCurrency currency={society.currency} value={m.totalAmountToPay} />
			</li>
			<li>
				<Icon icon="justice" />
				<strong>{$_('components.maintenances.list.fine')}:</strong>
				<FormatCurrency currency={society.currency} value={m.fineToPay} />
			</li>
			<li>
				<strong>
					<Icon icon="calendar-end-of-month" />
					{$_('components.maintenances.list.thisMonth')}:
				</strong>
				<FormatCurrency currency={society.currency} value={m.thisMonthCalculation} />
			</li>
			<li>
				<strong>
					<Icon icon="calendar-selected-date" />
					{$_('components.maintenances.list.previousAmount')}:
				</strong>
				<FormatCurrency currency={society.currency} value={m.previousAmountToPay} />
			</li>
			{#if m.withFormula}
				<li>
					<pre>{m.withFormula}</pre>
				</li>
			{/if}
		</ul>
	</section>
</details>

<style>
	ul {
		padding: 0;
		margin: 0;
		list-style: none;
	}
	pre {
		font-size: 0.8rem;
		padding: var(--s);
		border: 1px solid var(--c-border);
		border-radius: var(--border-radius);
	}
</style>
