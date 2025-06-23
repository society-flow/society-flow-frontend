<script lang="javascript">
	import { _, locale } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { api } from '$lib/api.svelte.js';
	import { userState } from '$lib/states/user.svelte.js';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import Anchor from '$lib/components/anchor.svelte';
	import Error from '$lib/components/error.svelte';
	import SocietyDetails from '$lib/components/societies/details.svelte';
	import SocietyJoin from '$lib/components/societies/join.svelte';
	import ResidencesList from '$lib/components/residences/list.svelte';
	import AdsList from '$lib/components/ads/list.svelte';
	import UsersList from '$lib/components/users/list.svelte';
	import Map from '$lib/components/map.svelte';

	requiresAuth(locale);

	const id = $derived($page.params.id);

	let society = $state(null);
	let residences = $state([]);
	let societyUsers = $state([]);
	let userResidences = $state([]);
	let userRole = $state(null);
	let residenceCount = $state(0);
	let ads = $state([]);

	// expense list for calculation breakdown
	let expenses = $state([]);
	let loading = $state(true);
	let error = $state(null);
	let markers = $derived(
		society?.geoCoordinate
			? [
					{
						coordinates: [society.geoCoordinate.x, society.geoCoordinate.y],
						title: society.name || society.id
					}
				]
			: []
	);

	let isOwner = $derived(userRole?.role === 'ADMIN');

	$effect(async () => {
		if (id && userState?.user?.id) {
			await loadSocietyData();
		}
	});

	async function loadSocietyData() {
		try {
			loading = true;
			error = null;

			// Fetch society details
			society = await api.getSocietyById(id);

			// Fetch all residences in this society
			residences = await api.getAllResidencesInSociety(id);

			ads = await api.getAdvertisementsBySocietyId(id);

			// Get residence count
			const countResponse = await api.countResidencesInSociety(id);
			residenceCount = countResponse.count;

			// Get society users (to see who's in the society)
			societyUsers = await api.getSocietyUsers(id);

			// Get user's role in this society
			try {
				userRole = await api.getUserRoleInSociety(id, userState.user.id);
			} catch (roleError) {
				// User might not be a member of this society
				userRole = null;
			}

			// Get user's residences in this society
			try {
				userResidences = await api.getUserResidencesInSociety(id, userState.user.id);
			} catch (residenceError) {
				// User might not have any residences in this society
				userResidences = [];
			}
		} catch (err) {
			error = err.message || 'Failed to load society details';
			console.error('Error loading society details:', err);
		} finally {
			loading = false;
		}
		// load expenses for calculations
		try {
			expenses = await api.getAllExpensesBySociety(id);
		} catch (e) {
			console.error('Error loading expenses:', e);
		}
	}

	function handleRoleUpdate(newRole) {
		userRole = newRole;
		// Refresh society users list
		loadSocietyData();
	}
	// Trigger calculations for all expenses
	let triggering = $state(false);
	let triggerError = $state(null);

	async function triggerAllCalculations() {
		triggering = true;
		triggerError = null;
		try {
			// Format yearMonth as YYYYMM (e.g. 202306)
			const now = new Date();
			const year = now.getFullYear();
			const month = String(now.getMonth() + 1).padStart(2, '0');
			const yearMonth = `${year}${month}`;
			for (const exp of expenses) {
				await api.triggerCalculation(exp.id, yearMonth);
			}
		} catch (e) {
			console.error('Error triggering calculations:', e);
			triggerError = e;
		} finally {
			triggering = false;
		}
	}
</script>

<Page title={$_('menu.societies')} showHeader={false}>
	<article class="Detail">
		{#if loading}
			<aside>
				<center>
					<progress></progress>
				</center>
			</aside>
		{:else if error}
			<section><Error {error}></Error></section>
		{:else if society}
			<aside>
				<nav>
					{#if !userRole}
						<li>
							<SocietyJoin societyId={id} {userRole} onRoleUpdate={handleRoleUpdate} />
						</li>
					{/if}
					{#if isOwner}
						<li>
							<Anchor href={`/update/societies/${id}`} title={$_('menu.update.societies')} isButton>
								{$_('menu.update.societies')}
							</Anchor>
						</li>
						<li>
							<Anchor
								href={`/delete/societies/${id}`}
								title={$_('common.delete')}
								isButton
								data-type="error"
							>
								{$_('common.delete')}
							</Anchor>
						</li>
					{/if}
				</nav>
			</aside>

			<SocietyDetails {society} {userRole} />

			{#if markers.length}
				<aside>
					<Map {markers} />
				</aside>
			{/if}

			{#if userResidences.length > 0}
				<aside>
					<ResidencesList
						residences={userResidences}
						residenceCount={userResidences.length}
						{society}
					/>
				</aside>
			{/if}

			{#if societyUsers.length}
				<aside>
					<UsersList users={societyUsers} />
				</aside>
			{/if}

			<aside>
				{#if userRole}
					<nav>
						<li>
							<Anchor href={`/create/residences/${id}`} isButton>
								{$_('menu.create.residences')}
							</Anchor>
						</li>
					</nav>
				{/if}
				{#if residences.length > 0}
					<ResidencesList {residences} {residenceCount} {society} />
				{/if}
			</aside>

			<!-- Expense calculations MVP -->
			<section>
				<h2>{$_('pages.societies.detail.expenseCalculations')}</h2>
				<button on:click={triggerAllCalculations} disabled={triggering}>
					{$_('pages.societies.detail.triggerCalculations')}
				</button>
				{#if triggering}
					<progress></progress>
				{/if}
				{#if triggerError}
					<Error error={triggerError} />
				{/if}
				{#if expenses.length}
					<ul class="List">
						{#each expenses as exp}
							<li class="List-item">
								<details>
									<summary>{exp.name} — {exp.amountPerMonth}</summary>
									<table>
										<thead>
											<tr>
												<th>{$_('pages.societies.detail.table.month')}</th>
												<th>{$_('pages.societies.detail.table.residence')}</th>
												<th>{$_('pages.societies.detail.table.amount')}</th>
											</tr>
										</thead>
										<tbody>
											{#await api.getAllCalculationsByExpense(exp.id) then calcs}
												{#each calcs as calc}
													<tr
														><td>{calc.yearMonth}</td><td>{calc.residenceName}</td><td
															>{calc.amount}</td
														></tr
													>
												{/each}
											{:catch err}
												<tr><td colspan="3">Error: {err.message}</td></tr>
											{/await}
										</tbody>
									</table>
								</details>
							</li>
						{/each}
					</ul>
				{:else}
					<p>{$_('pages.societies.detail.noExpensesConfigured')}</p>
				{/if}
			</section>

			<section>
				<h2>{$_('menu.ads')}</h2>
				<nav>
					<Anchor href={`/create/ads?society=${id}`} isButton>
						{$_('menu.create.ads')}
					</Anchor>
				</nav>
				<AdsList {ads} />
				{#if ads.length > 0}{/if}
			</section>
		{:else}
			<p>ø</p>
		{/if}
	</article>

	{#snippet footer()}
		<nav>
			<Anchor href="/societies">← {$_('menu.societies')}</Anchor>
		</nav>
	{/snippet}
</Page>
