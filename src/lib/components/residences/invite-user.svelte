<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import { api } from '$lib/api.svelte.js';
	import Error from '$lib/components/error.svelte';

	const { residenceId, onInvite = () => {} } = $props();

	let email = $state('');
	let name = $state('');
	let error = $state('');
	let success = $state(false);

	async function onsubmit(event) {
		event.preventDefault();
		error = '';
		success = false;

		try {
			const res = await api.assignUserWithEmailNameToResidence({ email, name, residenceId });
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
	<h3>
		{$_('components.residences.invite_user.title')}
	</h3>
	<fieldset>
		<legend>{$_('components.residences.invite_user.email.legend')}</legend>
		<input
			type="email"
			required
			bind:value={email}
			placeholder={$_('components.residences.invite_user.email.placeholder')}
		/>
	</fieldset>

	<fieldset>
		<legend>{$_('components.residences.invite_user.name.legend')}</legend>
		<input
			type="text"
			required
			bind:value={name}
			placeholder={$_('components.residences.invite_user.name.placeholder')}
		/>
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
