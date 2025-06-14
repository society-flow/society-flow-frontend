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
	}

	function handleRoleUpdate(newRole) {
		userRole = newRole;
		// Refresh society users list
		loadSocietyData();
	}
</script>

<Page title={$_('menu.societies')} showHeader={false}>
	<article class="Detail">
		{#if loading}
			<aside>
				<center>
					<progress />
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
