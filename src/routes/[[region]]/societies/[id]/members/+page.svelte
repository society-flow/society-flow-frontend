<script>
	import { _, locale } from 'svelte-i18n';
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import { api } from '$lib/api.svelte.js';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Error from '$lib/components/error.svelte';
	import UsersList from '$lib/components/users/list.svelte';
	import InviteUser from '$lib/components/societies/invite-user.svelte';

	requiresAuth(locale);

	const id = $derived($page.params.id);
	const { data } = $props();
	const { society, isAdmin } = data;

	let users = $state([]);
	let loading = $state(true);
	let error = $state(null);

	function onInvite(data) {
		console.log('invited', data);
	}

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

	async function onRemoveUser(user) {
		try {
			await api.removeUserFromSociety(society.id, user.id);
			invalidate('data:society');
		} catch (e) {
			console.error('Error removing user:', e);
		}
	}
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
		<UsersList {users} {onRemoveUser} />
	</section>
	{#if isAdmin}
		<section>
			<header>
				<h2>
					{$_('components.societies.invite_user.title')}
				</h2>
			</header>
			<InviteUser societyId={society.id} {onInvite} />
		</section>
	{/if}
{/if}
