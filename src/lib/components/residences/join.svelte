<script>
	import { _ } from 'svelte-i18n';
	import { api } from '$lib/api.svelte.js';
	import { userState } from '$lib/states/user.svelte.js';

	let { residenceId, societyId, isMember, onJoin } = $props();

	let joining = $state(false);
	let joinError = $state(null);

	async function joinResidence() {
		try {
			joining = true;
			joinError = null;

			const residenceUser = await api.assignUserToResidence({
				id: societyId,
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
	<h3>{$_('components.residences.join.title')}</h3>
	<p>{$_('components.residences.join.description')}</p>

	{#if joinError}
		<p class="text-red-500">{joinError}</p>
	{/if}

	<button on:click={joinResidence} disabled={joining}>
		{$_('components.residences.join.button')}
	</button>
{/if}
