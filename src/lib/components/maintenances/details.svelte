<script>
	import { _, locale } from 'svelte-i18n';
	import {
    IconBusiness,
		IconJustice,
		IconCalculator,
		IconCalendarEndOfMonth,
		IconCalendarSelectedDate
	} from 'obra-icons-svelte';
	import FormatCurrency from '$lib/components/format/currency.svelte';

	const { maintenance: m, society } = $props();
</script>

<details open>
	<summary>
    <IconBusiness />
		<h5>
			{m.residenceName}
		</h5>
		<FormatCurrency value={m.totalAmountToPay} currency={society.currency} />
	</summary>
	<section>
		<ul>
			<li>
				<IconCalculator />
				<strong>
					{$_('components.maintenances.list.totalAmount')}:
				</strong>
				<FormatCurrency currency={society.currency} value={m.totalAmountToPay} />
			</li>
			<li>
				<IconJustice />
				<strong>{$_('components.maintenances.list.fine')}:</strong>
				<FormatCurrency currency={society.currency} value={m.fineToPay} />
			</li>
			<li>
				<strong>
					<IconCalendarEndOfMonth />
					{$_('components.maintenances.list.thisMonth')}:
				</strong>
				<FormatCurrency currency={society.currency} value={m.thisMonthCalculation} />
			</li>
			<li>
				<strong>
					<IconCalendarSelectedDate />
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
