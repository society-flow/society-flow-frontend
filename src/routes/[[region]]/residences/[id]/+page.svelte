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
	import UsersList from '$lib/components/users/list.svelte';

	requiresAuth(locale);

	const id = $derived($page.params.id);

	let residence = $state({});
	let users = $state([]);
	let isUser = $state(false);
	let error = $state(null);
	let loading = $state(false);

	$effect(async () => {
		if (id && userState?.user?.id) {
			await loadResidenceData();
		}
	});

	async function onJoin(residenceUser) {
		await loadResidenceData();
	}

	async function loadResidenceData() {
		loading = true;
		try {
			error = null;
			residence = await api.getResidenceById(id);

			console.log('residence', residence);
			try {
				users = await api.getResidenceUsers(id);
				isUser = !!users.find(({ id }) => id === userState?.user?.id);
			} catch (err) {
				console.log('error', err);
				isUser = null; // not a member
				error = err.message;
			}
		} catch (err) {
			error = err.message;
			console.error('Failed to load residence:', err);
		} finally {
			loading = false;
		}
	}
</script>

<Page title={$_('menu.residences')}>
	{#snippet header()}
		<h1>{$_('menu.residences')}</h1>
	{/snippet}

	<article class="Detail">
		{#if loading}
			<aside>
				<center>
					<progress />
				</center>
			</aside>
		{:else if error}
			<p>{error}</p>
		{:else}
			<ResidenceDetails {residence} {isUser} />

			{#if !isUser}
				<aside>
					<ResidenceJoin residenceId={id} societyId={residence.societyId} {isUser} {onJoin} />
				</aside>
			{/if}
			{#if users}
				<aside>
					<UsersList {users} />
				</aside>
			{/if}
		{/if}
	</article>

	{#snippet footer()}
		<Anchor href={'/residences'}>← {$_('menu.residences')}</Anchor>
	{/snippet}
</Page>
