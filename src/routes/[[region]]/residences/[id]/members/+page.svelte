<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import { api } from '$lib/api.svelte.js';
	import UsersList from '$lib/components/users/list.svelte';

	const { data } = $props();
	const { residence, users, isMember, isAdmin } = $derived(data);
	const { id } = $derived(residence);

	async function onInvite(inviteData) {
		invalidate('data:residence');
	}

	async function onRemoveUser(user) {
		try {
			await api.removeUserFromResidence(id, user.id);
			invalidate('data:residence');
		} catch (e) {
			console.error('Error removing user:', e);
		}
	}
</script>

{#if isMember || isAdmin}
	<section>
		<header>
			<h2>{$_('pages.residences.detail.members')}</h2>
		</header>
		<UsersList {users} {onRemoveUser} />
	</section>
{/if}
