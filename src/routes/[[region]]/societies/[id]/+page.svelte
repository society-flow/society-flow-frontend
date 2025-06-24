<script>
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
	import ExpensesList from '$lib/components/expenses/list.svelte';

	requiresAuth(locale);

	const id = $derived($page.params.id);

	let society = $state(null);
	let residences = $state([]);
	let societyUsers = $state([]);
	let userResidences = $state([]);
	let userRole = $state(null);
	let residenceCount = $state(0);
	let ads = $state([]);

	let expenses = $state([]);
	let loading = $state(true);
	let error = $state(null);

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

<Page title={society?.name || $_('menu.societies')} showHeader={!!society?.name}>
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
					<ul>
						{#if !userRole}
							<li>
								<SocietyJoin societyId={id} {userRole} onJoin={handleRoleUpdate} />
							</li>
						{/if}
						{#if isOwner}
							<li>
								<Anchor
									href={`/update/societies/${id}`}
									title={$_('menu.update.societies')}
									isButton
								>
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
					</ul>
				</nav>
			</aside>

			<SocietyDetails {society} {userRole} />

			{#if userResidences.length > 0}
				<section>
					<header>
						<h2>{$_('pages.societies.detail.user_residences')}</h2>
					</header>
					<ResidencesList
						residences={userResidences}
						residenceCount={userResidences.length}
						{society}
					/>
				</section>
			{/if}

			{#if societyUsers.length}
				<section>
					<header>
						<h2>{$_('pages.societies.detail.members')}</h2>
					</header>
					<UsersList users={societyUsers} />
				</section>
			{/if}

			<section>
				<header>
					<h2>{$_('menu.residences')}</h2>
					{#if userRole}
						<nav>
							<li>
								<Anchor href={`/create/residences/${id}`} isButton>
									{$_('menu.create.residences')}
								</Anchor>
							</li>
						</nav>
					{/if}
				</header>
				{#if residences.length > 0}
					<ResidencesList {residences} {residenceCount} {society} />
				{/if}
			</section>

			<section>
				<header>
					<h2>{$_('menu.expenses')}</h2>
					<nav>
						<button on:click={triggerAllCalculations} disabled={triggering}>
							{$_('pages.societies.detail.triggerCalculations')}
						</button>
					</nav>
				</header>
				{#if triggering}
					<progress></progress>
				{/if}
				{#if triggerError}
					<Error error={triggerError} />
				{/if}
				{#if expenses.length}
					<ExpensesList {expenses} />
				{:else}
					<p>{$_('pages.societies.detail.noExpensesConfigured')}</p>
				{/if}
			</section>

			<section>
				<header>
					<h2>{$_('menu.ads')}</h2>
					<nav>
						<Anchor href={`/create/ads?society=${id}`} isButton>
							{$_('menu.create.ads')}
						</Anchor>
					</nav>
				</header>
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
