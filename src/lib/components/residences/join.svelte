<script>
	import { _ } from 'svelte-i18n';
	import { api } from '$lib/api.svelte.js';
	import { userState } from '$lib/states/user.svelte.js';
	import Icon from '$lib/components/icon.svelte';

	let { residenceId, societyId, isMember, onJoin } = $props();

	let joining = $state(false);
	let joinError = $state(null);

	async function joinResidence() {
		try {
			joining = true;
			joinError = null;

			const residenceUser = await api.assignUserToResidence({
				residenceId,
				userId: userState.user.id
			});

			if (onJoin) {
				onJoin(residenceUser);
			}
		} catch (err) {
			joinError = err.message || _('errors.join_failed');
			console.error('Error joining residence:', err);
		} finally {
			joining = false;
		}
	}
</script>

{#if !isMember}
	<button onclick={joinResidence} disabled={joining}>
		<Icon icon="user" />
		{$_('common.join')}
		<Icon icon="enter-right" />
		{#if joinError}
			<span>{joinError}</span>
		{/if}
	</button>
{/if}
