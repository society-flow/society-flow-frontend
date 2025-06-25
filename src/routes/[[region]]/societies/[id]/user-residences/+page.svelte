<script>
	import { _, locale } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { api } from '$lib/api.svelte.js';
	import { userState } from '$lib/states/user.svelte.js';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Error from '$lib/components/error.svelte';
	import ResidencesList from '$lib/components/residences/list.svelte';

	requiresAuth(locale);

	const id = $derived($page.params.id);

	let residences = $state([]);
	let loading = $state(true);
	let error = $state(null);

	$effect(async () => {
		if (id && userState.user?.id) {
			loading = true;
			error = null;
			try {
				residences = await api.getUserResidencesInSociety(id, userState.user.id);
			} catch (err) {
				error = err.message || 'Failed to load user residences';
				console.error('Error loading user residences:', err);
			} finally {
				loading = false;
			}
		}
	});
</script>

{#if loading}
	<aside><center><progress /></center></aside>
{:else if error}
	<section><Error {error} /></section>
{:else}
	<section>
		<header>
			<h2>
				{$_('pages.societies.detail.user_residences')}
			</h2>
		</header>
		<ResidencesList {residences} />
	</section>
{/if}
