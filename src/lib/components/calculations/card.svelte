<script>
	import { _ } from 'svelte-i18n';
	import Card from '$lib/components/calculations/card.svelte';

	const { calculation } = $props();
</script>

<article class="Card">
	<dt>
		{$_('pages.expenses.detail.table.month')}
	</dt>
	<dd>
		{calculation.yearMonth}
	</dd>
	<dt>
		{$_('pages.expenses.detail.table.residence')}
	</dt>
	<dd>
		{calculation.residenceId}
	</dd>
	<dt>
		{$_('pages.expenses.detail.table.withFormula')}
	</dt>
	<dd>
		{calculation.withFormula}
	</dd>
	<dt>
		{$_('pages.expenses.detail.table.isExpensePaid')}
	</dt>
	<dd>
		{calculation.isExpensePaid}
	</dd>
	<dt>
		{$_('pages.expenses.detail.table.amount')}
	</dt>
	<dd>
		{calculation.amountToPay}
	</dd>
	<dt>
		{$_('pages.expenses.detail.table.expensePaid')}
	</dt>
	<dd>
		{calculation.expensePaid}
	</dd>
</article>
