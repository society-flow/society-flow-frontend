<script lang>
	import { api } from '$lib/api.svelte.js';

	const { email, name, onRegister = () => {} } = $props();

	let user = $state({
		email: email || '',
		name: name || ''
	});
	let error = $state('');

	async function onsubmit(event) {
		event.preventDefault();
		error = '';
		try {
			// also logs in user (@TODO: backend OTP?)
			await api.register(user);
			onRegister(user);
		} catch (err) {
      console.log(err)
			error = err.message;
		}
	}
</script>

<form {onsubmit}>
	<fieldset>
		<legend>Name</legend>
		<input type="text" bind:value={user.name} required minlength="2" maxlength="50" />
	</fieldset>
	<fieldset>
		<legend>Email</legend>
		<input type="email" bind:value={user.email} required />
	</fieldset>
	<fieldset>
		<button type="submit">Register</button>
	</fieldset>
	{#if error}
		<fieldset data-type="error">
			{error}
		</fieldset>
	{/if}
</form>

<style>
	form {
		max-width: var(--s-container);
	}
</style>
