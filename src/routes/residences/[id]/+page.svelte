<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	$: id = $page.params.id;

	const data = {
		residence: {
			society: 'Reichenbergerstr.21',
			flat: 'Flat 11',
			role: 'Member',
			residence_fund_eur: 48,
			area: 70,
			total_active_residents: 2,
			floor_count: -3
		},
		maintenance: [
			{
				yearMonth: '202506',
				isActive: true,
				carryOver: 70,
				fine: 3.25,
				currentExpense: 150,
				totalToPay: 223.25
			},
			{
				yearMonth: '202505',
				isActive: false,
				carryOver: 0,
				fine: 0,
				currentExpense: 150,
				totalToPay: 150,
				formula: 'xyz Imnop ...'
			}
		],
		payments: [
			{
				timestamp: '2025-05-03T10:00:00Z',
				amount: 50,
				maintenanceYearMonth: '202505',
				description: 'Paid from m26 with reference01',
				paidByUser: 'Vivian'
			},
			{
				timestamp: '2025-05-13T20:20:00Z',
				amount: 30,
				maintenanceYearMonth: '202505',
				description: 'Paid from m26 with reference02',
				paidByUser: 'Julia'
			}
		]
	};
</script>

<svelte:head>
	<title>{$_('menu.residences')}</title>
</svelte:head>

<h1>{$_('menu.residences')}</h1>

<p>id: {id}</p>

<p>
	<a href={`${base}/residences`}>← Back to all residences</a>
</p>

<article>
	<header>
		<h2>Residence: {data.residence.society} → {data.residence.flat} - {data.residence.role}</h2>
	</header>

	<main>
		<section>
			<h3>Residence Info</h3>
			<ul>
				<li>Residence Fund: {data.residence.residence_fund_eur} EUR</li>
				<li>Area: {data.residence.area}</li>
				<li>Total Active Residents: {data.residence.total_active_residents}</li>
				<li>
					Floor Count: {data.residence.floor_count} (underground level {Math.abs(
						data.residence.floor_count
					)})
				</li>
			</ul>
		</section>

		<section>
			<h3>Maintenances on Residence Unit</h3>
			{#each data.maintenance as m}
				<article>
					<p>Year/Month: {m.yearMonth}</p>
					<p>Status: {m.isActive ? 'Active' : 'Inactive'}</p>
					<p>Carry Over from Last Maintenance: {m.carryOver} EUR</p>
					<p>Fine on Carry Over: {m.fine} EUR</p>
					<p>Current Calculation on Expenses: {m.currentExpense} EUR</p>
					<p>Total to Pay: {m.totalToPay} EUR</p>
					{#if m.formula}
						<aside>
							<p>Formula of Calculations: "{m.formula}"</p>
						</aside>
					{/if}
				</article>
			{/each}
		</section>

		<section>
			<h3>Maintenance Payments from Residence: {data.residence.flat}</h3>
			{#each data.payments as p}
				<article>
					<time datetime={p.timestamp}>{p.timestamp}</time>
					<p>Amount: {p.amount} EUR</p>
					<p>Maintenance Year/Month: {p.maintenanceYearMonth}</p>
					<p>Description: {p.description}</p>
					<p>Paid By: {p.paidByUser}</p>
				</article>
			{/each}
		</section>
	</main>
</article>
