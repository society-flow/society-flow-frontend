<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { api } from '$lib/api.svelte.js';

	import InviteUser from '$lib/components/residences/invite-user.svelte';
	import UsersList from '$lib/components/users/list.svelte';

	const { data } = $props();
	const { users, isMember } = data;
	const id = $derived($page.params.id);

	async function onInvite(inviteData) {
		await api.getResidenceUsers(id);
	}

	async function onRemoveUser(user) {
		try {
			await api.removeUserFromResidence(id, user.id);
			await api.getResidenceUsers(id);
		} catch (e) {
			console.error('Error removing user:', e);
		}
	}
</script>

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
				<InviteUser residenceId={id} {onInvite} />
			</aside>
		{/if}
	</section>
{/if}