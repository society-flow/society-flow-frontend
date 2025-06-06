<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import { api } from '$lib/api.svelte.js';

	const { email: userEmail, onLogin = () => {} } = $props();

	let email = $state(userEmail || '');
	let error = $state('');

	async function onsubmit(event) {
		event.preventDefault();
		error = '';
		try {
			// Also sends the OTP
			await api.login({ email: userEmail });
			onLogin({ email: userEmail });
		} catch (err) {
			error = err.message;
		}
	}
</script>

<form {onsubmit}>
	<fieldset>
		<legend>{$_('components.auth.login.email.legend')}</legend>
		<input
			autofocus
			required
			type="email"
			bind:value={email}
			placeholder={$_('components.auth.login.email.placeholder')}
		/>
	</fieldset>

	<fieldset>
		<button type="submit">{$_('components.auth.login.submit')}</button>
	</fieldset>

	{#if error}
		<fieldset data-type="error">
			{$_('components.auth.login.error', { error })}
		</fieldset>
	{/if}
</form>
