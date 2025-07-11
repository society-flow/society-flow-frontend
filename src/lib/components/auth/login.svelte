<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import { api } from '$lib/api.svelte.js';
	import Error from '$lib/components/error.svelte';
	import { IconLogIn } from 'obra-icons-svelte';

	const { email: userEmail, onLogin = () => {}, onSubmit = () => {} } = $props();

	let email = $state(userEmail || '');
	let error = $state('');

	async function onsubmit(event) {
		event.preventDefault();
		error = '';
		onSubmit({ email });
		try {
			// Also sends the OTP
			const res = await api.login({ email });
			onLogin({ email });
		} catch (err) {
			error = err;
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
		<button type="submit">
			<IconLogIn />
			{$_('components.auth.login.submit')}
		</button>
	</fieldset>

	{#if error}
		<fieldset data-type="error">
			<Error {error} />
		</fieldset>
	{/if}
</form>
