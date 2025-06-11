<script>
	import { _ } from 'svelte-i18n';
	import { api } from '$lib/api.svelte.js';
	import { userState } from '$lib/states/user.svelte.js';

	let { societyId, userRole, onRoleUpdate } = $props();

	let joining = $state(false);
	let joinError = $state(null);

	async function joinSociety() {
		try {
			joining = true;
			joinError = null;

			const societyUser = await api.assignUserToSociety({
				societyid: societyId,
				userid: userState.user.id,
				role: 'MEMBER' // Default role when joining
			});

			console.log('User joined society:', societyUser);

			// Notify parent component to refresh user role
			if (onRoleUpdate) {
				onRoleUpdate(societyUser);
			}
		} catch (err) {
			joinError = err.message || 'Failed to join society';
			console.error('Error joining society:', err);
		} finally {
			joining = false;
		}
	}
</script>

{#if !userRole}
	<section>
		<h3>Join This Society</h3>
		<p>You are not currently a member of this society.</p>

		{#if joinError}
			<p>{joinError}</p>
		{/if}

		<button onclick={joinSociety} disabled={joining}>
			{joining ? 'Joining...' : 'Join Society'}
		</button>
	</section>
{/if}
