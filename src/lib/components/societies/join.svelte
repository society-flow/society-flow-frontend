<script>
	import { _ } from 'svelte-i18n';
	import { api } from '$lib/api.svelte.js';
	import { userState } from '$lib/states/user.svelte.js';

	let { societyId, onJoin } = $props();

	let joining = $state(false);
	let error = $state(null);

	async function joinSociety() {
		try {
			joining = true;
			error = null;

			const societyUser = await api.assignUserToSociety({
				societyId,
				userId: userState.user.id,
				role: 'MEMBER' // Default role when joining
			});

			// Notify parent component to refresh user role
			if (onRoleUpdate) {
				onJoin(societyUser);
			}
		} catch (err) {
			error = err;
			console.error('Error joining society:', err);
		} finally {
			joining = false;
		}
	}
</script>

{#if error}
	<Error {error} />
{/if}

<button onclick={joinSociety} disabled={joining}>
	{joining ? $_('components.societies.join.joining') : $_('components.societies.join.join')}
</button>
