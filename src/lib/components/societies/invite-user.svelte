<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import { api } from '$lib/api.svelte.js';
	import Error from '$lib/components/error.svelte';
	import { SOCIETY_ROLES as societyRoles } from '$lib/const/society_roles.js';

	const { societyId, onInvite = () => {} } = $props();

	let email = $state('');
	let name = $state('');
	let role = $state(societyRoles[0]);
	let error = $state('');
	let success = $state(false);

	async function onsubmit(event) {
		event.preventDefault();
		error = '';
		success = false;

		try {
			const res = await api.assignUserWithEmailNameRoleToSociety({ email, name, societyId, role });
			success = true;
			onInvite(res);
			email = '';
			name = '';
		} catch (err) {
			error = err;
		}
	}
</script>

<form {onsubmit}>
	<fieldset>
		<legend>{$_('components.societies.invite_user.email.legend')}</legend>
		<input
			type="email"
			required
			bind:value={email}
			placeholder={$_('components.societies.invite_user.email.placeholder')}
		/>
	</fieldset>

	<fieldset>
		<legend>{$_('components.societies.invite_user.name.legend')}</legend>
		<input
			type="text"
			required
			bind:value={name}
			placeholder={$_('components.societies.invite_user.name.placeholder')}
		/>
	</fieldset>

	<fieldset>
		<legend>{$_('components.societies.invite_user.role.legend')}</legend>
		<select bind:value={role} required>
			{#each societyRoles as role}
				<option value={role}>
					{$_(`const.society_roles.${role}`)}
				</option>
			{/each}
		</select>
	</fieldset>

	{#if error}
		<fieldset data-type="error">
			<Error {error} />
		</fieldset>
	{/if}

	<fieldset>
		<button type="submit">{$_('common.submit')}</button>
	</fieldset>
</form>
