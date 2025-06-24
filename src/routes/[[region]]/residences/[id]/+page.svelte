<script lang="javascript">
	import { _, locale } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { api } from '$lib/api.svelte.js';
	import { userState } from '$lib/states/user.svelte.js';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';

	import Page from '$lib/components/routes/page.svelte';
	import Anchor from '$lib/components/anchor.svelte';
	import ResidenceDetails from '$lib/components/residences/details.svelte';
	import ResidenceJoin from '$lib/components/residences/join.svelte';
	import ResidenceInviteUser from '$lib/components/residences/invite-user.svelte';
	import UsersList from '$lib/components/users/list.svelte';

	requiresAuth(locale);

	const id = $derived($page.params.id);

	let residence = $state({});
	let society = $state({});
	let users = $state([]);
	let isMember = $state(false);
	// My expense calculations for this residence
	let myCalculations = $state([]);
	let error = $state(null);
	let loading = $state(false);

	$effect(async () => {
		if (id && userState?.user?.id) {
			await loadResidenceData();
			await loadResidenceUsersData();
			// load expense calculations for this residence
			if (residence.societyId) {
				try {
					const exps = await api.getAllExpensesBySociety(residence.societyId);
					const nested = await Promise.all(
						exps.map((exp) =>
							api
								.getAllCalculationsByExpense(exp.id)
								.then((calcs) =>
									calcs
										.filter((c) => c.residenceId === residence.id)
										.map((c) => ({ ...c, expenseName: exp.name }))
								)
						)
					);
					myCalculations = nested.flat();
				} catch (e) {
					console.error('Error loading calculations:', e);
				}
			}
		}
	});

	$effect(async () => {
		if (residence?.societyId) {
			society = await api.getSocietyById(residence.societyId);
		}
	});

	async function onJoin(residenceUser) {
		await loadResidenceUsersData();
	}

	async function onInvite(inviteData) {
		await loadResidenceUsersData();
	}

	// Remove a user from this residence
	async function onRemoveUser(user) {
		try {
			await api.removeUserFromResidence(residence.id, user.id);
			// Reload users and membership status so UI hides edit/delete if self-removed
			await loadResidenceUsersData();
		} catch (e) {
			console.error('Error removing user:', e);
		}
	}

	async function loadResidenceData() {
		loading = true;
		try {
			error = null;
			residence = await api.getResidenceById(id);
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	}
	async function loadResidenceUsersData() {
		try {
			users = await api.getResidenceUsers(id);
			isMember = !!users.find(({ id }) => id === userState?.user?.id);
		} catch (err) {
			isMember = null;
			error = err.message;
		}
	}
</script>

<Page
	title={residence?.residenceName || $_('menu.residences')}
	showHeader={!!residence?.residenceName}
>
	<article class="Detail">
		{#if loading}
			<aside>
				<center>
					<progress></progress>
				</center>
			</aside>
		{:else if error}
			<p>{error}</p>
		{:else}
			<aside>
				<nav>
					<ul>
						{#if !isMember}
							<li>
								<ResidenceJoin
									residenceId={id}
									societyId={residence.societyId}
									{isMember}
									{onJoin}
								/>
							</li>
						{/if}
						{#if isMember}
							<li>
								<Anchor
									href={`/update/residences/${id}`}
									title={$_('menu.update.residences')}
									isButton
								>
									{$_('menu.update.residences')}
								</Anchor>
							</li>
							<li>
								<Anchor
									href={`/delete/residences/${id}`}
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

			<ResidenceDetails {residence} {isMember} {society} />

			{#if isMember}
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
			{/if}

			{#if users.length}
				<section>
					<header>
						<h2>{$_('pages.residences.detail.members')}</h2>
					</header>
					<UsersList {users} {onRemoveUser} />
					{#if isMember}
						<aside>
							<header>
								<h3>
									{$_('components.residences.invite_user.title')}
								</h3>
							</header>
							<ResidenceInviteUser residenceId={residence.id} {onInvite} />
						</aside>
					{/if}
				</section>
			{/if}
		{/if}
	</article>

	{#snippet footer()}
		<nav>
			<Anchor href="/residences">← {$_('menu.residences')}</Anchor>
		</nav>
	{/snippet}
</Page>

<style>
	:global(section aside) {
		:global(form) {
			margin: var(--s);
		}
		:global(h3) {
			margin: calc(var(--s) * 2);
			text-align: center;
		}
	}
</style>
