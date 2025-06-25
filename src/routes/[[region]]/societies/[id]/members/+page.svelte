<script>
	import { _, locale } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { api } from '$lib/api.svelte.js';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Error from '$lib/components/error.svelte';
	import UsersList from '$lib/components/users/list.svelte';

	requiresAuth(locale);

	const id = $derived($page.params.id);

	let users = $state([]);
	let loading = $state(true);
	let error = $state(null);

	$effect(async () => {
		if (id) {
			loading = true;
			error = null;
			try {
				users = await api.getSocietyUsers(id);
			} catch (err) {
				error = err.message || 'Failed to load society members';
				console.error('Error loading society members:', err);
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
				{$_('pages.societies.detail.members')}
			</h2>
		</header>
		<UsersList {users} />
	</section>
{/if}
