<script lang="typescript">
	import { api } from '$lib/api.svelte.js';

	const { email, onLogin = () => {} } = $props();

	let userEmail = $state(email || '');
	let error = $state('');

	async function onsubmit(event) {
		event.preventDefault();
		error = '';
		try {
			// also sends the OTP
			await api.login({ email: userEmail });
			onLogin({ email: userEmail });
		} catch (err) {
			error = err.message;
		}
	}
</script>

<form {onsubmit}>
	<fieldset>
		<legend>Email</legend>
		<input type="email" bind:value={userEmail} required autofocus />
	</fieldset>
	<fieldset>
		<button type="submit">Login</button>
	</fieldset>
	{#if error}
		<fieldset data-type="error">
			{error}
		</fieldset>
	{/if}
</form>
