<script lang>
	import { api } from '$lib/api.svelte.js';

	const { email, otp, onverify = () => {} } = $props();

	let userEmail = $state(email || '');
	let oneTimePassword = $state(otp || '');
	let error = $state('');

	async function onsubmit(event) {
		event.preventDefault();
		error = '';
		try {
			// this handles login
			await api.verifyOtp({ email: userEmail, otp: oneTimePassword });
			onverify();
		} catch (err) {
			error = err.message;
		}
	}
</script>

<form {onsubmit}>
	<fieldset>
		<legend>Email</legend>
		<input type="email" bind:value={userEmail} required />
	</fieldset>
	<fieldset>
		<legend>OTP (One Time Password)</legend>
		<input
			type="text"
			bind:value={oneTimePassword}
			required
			minlength="1"
			maxlength="10"
			autofocus
		/>
	</fieldset>
	<fieldset>
		<button type="submit">Verify</button>
	</fieldset>
	{#if error}
		<fieldset data-type="error">
			{error}
		</fieldset>
	{/if}
</form>
