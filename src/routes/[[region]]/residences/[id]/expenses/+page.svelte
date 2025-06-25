<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { api } from '$lib/api.svelte.js';

	const id = $derived($page.params.id);

	let myCalculations = $state([]);

	$effect(async () => {
		if (id) {
			try {
				const residence = await api.getResidenceById(id);
				if (residence.societyId) {
					const exps = await api.getAllExpensesBySociety(residence.societyId);
					const nested = await Promise.all(
						exps.map((exp) =>
							api
								.getAllCalculationsByExpense(exp.id)
								.then((calcs) =>
									calcs
										.filter((c) => c.residenceId === id)
										.map((c) => ({ ...c, expenseName: exp.name }))
								)
						)
					);
					myCalculations = nested.flat();
				}
			} catch (e) {
				console.error('Error loading calculations:', e);
			}
		}
	});
</script>

<section>
	<header>
		<h2>{$_('pages.residences.detail.myExpenseDues')}</h2>
	</header>
	{#if myCalculations.length}
		<table>
			<thead>
				<tr>
					<th>{$_('pages.residences.detail.table.month')}</th>
					<th>{$_('pages.residences.detail.table.expense')}</th>
					<th>{$_('pages.residences.detail.table.amount')}</th>
				</tr>
			</thead>
			<tbody>
				{#each myCalculations as calc}
					<tr>
						<td>{calc.yearMonth}</td>
						<td>{calc.expenseName}</td>
						<td>{calc.amount}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{:else}
		<p>{$_('pages.residences.detail.noExpenseDues')}</p>
	{/if}
</section>