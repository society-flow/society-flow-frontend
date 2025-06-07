<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import { api } from '$lib/api.svelte.js';
	import Error from '$lib/components/error.svelte';

	const { email: userEmail, otp, onverify = () => {} } = $props();

	let email = $state(userEmail || '');
	let oneTimePassword = $state(otp || '');
	let error = $state({});

	async function onsubmit(event) {
		event.preventDefault();
		error = '';
		try {
			await api.verifyOtp({ email, otp: oneTimePassword });
			onverify();
		} catch (err) {
			error = err;
		}
	}
</script>

<form {onsubmit}>
	<fieldset>
		<legend>{$_('components.auth.verify_otp.email.legend')}</legend>
		<input
			required
			readonly
			type="email"
			bind:value={email}
			placeholder={$_('components.auth.verify_otp.email.placeholder')}
		/>
	</fieldset>

	<fieldset>
		<legend>{$_('components.auth.verify_otp.otp.legend')}</legend>
		<input
			autofocus
			required
			type="text"
			bind:value={oneTimePassword}
			minlength="1"
			maxlength="10"
			placeholder={$_('components.auth.verify_otp.otp.placeholder')}
		/>
	</fieldset>

	<fieldset>
		<button type="submit">{$_('components.auth.verify_otp.submit')}</button>
	</fieldset>

	{#if error}
		<fieldset data-type="error">
			<Error {error} />
		</fieldset>
	{/if}
</form>
