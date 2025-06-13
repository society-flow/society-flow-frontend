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

	requiresAuth(locale);

	const id = $derived($page.params.id);

	let residence = $state({});
	let userRole = $state(null);
	let error = $state(null);

	$effect(async () => {
		if (id && userState?.user?.id) {
			await loadResidenceData();
		}
	});

	async function loadResidenceData() {
		try {
			error = null;
			residence = await api.getResidenceById(id);

      console.log("residence", residence)
			try {
				userRole = await api.getUserRoleInResidence(id, userState.user.id);
        console.log("userRole", userRole)
			} catch (err) {
        console.log("error", err)
				userRole = null; // not a member
			}
		} catch (err) {
			error = err.message || _('errors.load_failed');
			console.error('Failed to load residence:', err);
		}
	}

	function handleRoleUpdate(newRole) {
		userRole = newRole;
		loadResidenceData();
	}
</script>

<Page title={$_('menu.residences')}>
	{#snippet header()}
		<h1>{$_('menu.residences')}</h1>
	{/snippet}

	<article class="Detail">
		{#if error}
			<p class="text-red-500">{error}</p>
		{:else}
			<ResidenceDetails {residence} {userRole} />

			{#if !userRole}
				<aside>
					<ResidenceJoin
						residenceId={id}
						societyId={residence.societyId}
						{userRole}
						onRoleUpdate={handleRoleUpdate}
					/>
				</aside>
			{/if}
		{/if}
	</article>

	{#snippet footer()}
		<Anchor href={'/residences'}>← {$_('menu.residences')}</Anchor>
	{/snippet}
</Page>
