<script lang="typescript">
	import { _, locale } from 'svelte-i18n';
	import { page } from '$app/stores';
	// import { api } from '$lib/api.svelte.js';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import Anchor from '$lib/components/anchor.svelte';

	requiresAuth(locale);

	const id = $derived($page.params.id);

	let residence = $state({});

	$effect(async () => {
		if (id) {
			// residence = await api.getResidence(Number(id));
		}
	});
</script>

<Page title={$_('menu.residences')}>
	{#snippet header()}
		<h1>{$_('menu.residences')}</h1>
	{/snippet}
	<section>
		<header>
			<h2>id: {id}</h2>
			<p>
				<Anchor href={'/residences'}>← Back to all residences</Anchor>
			</p>
		</header>

		<article>
			<header>
				<h2>Residence: {residence.society} → {residence.flat} - {residence.role}</h2>
			</header>

			<main>
				<section>
					<h3>Residence Info</h3>
					<ul>
						<li>Residence Fund: {residence.residence_fund_eur} EUR</li>
						<li>Area: {residence.area}</li>
						<li>Total Active Residents: {residence.total_active_residents}</li>
						<li>
							Floor Count: {residence.floor_count} (underground level {Math.abs(
								residence.floor_count
							)})
						</li>
					</ul>
				</section>

				<section>
					<h3>Maintenances on Residence Unit</h3>
					{#each residence.maintenance as m}
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
					<h3>Maintenance Payments from Residence: {residence.flat}</h3>
					{#each residence.payments as p}
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
	</section>
</Page>
