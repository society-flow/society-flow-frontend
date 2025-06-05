<script lang>
	import { api } from '$lib/api.svelte.js';

	const { email, name, onregister = () => {} } = $props();

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
			const res = await api.register(user);
			console.log('use', res);
			onregister(user);
		} catch (err) {
			console.log('err', err);
			error = err.message;
		}
	}
</script>

<form {onsubmit}>
	<fieldset>
		<legend>Name</legend>
		<input
			autofocus
			required
			type="text"
			bind:value={user.name}
			minlength="2"
			maxlength="50"
			placeholder="Azur"
		/>
	</fieldset>
	<fieldset>
		<legend>Email</legend>
		<input required type="email" bind:value={user.email} placeholder="user@example.com" />
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
