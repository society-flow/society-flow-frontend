<script>
	import {userState} from '$lib/states/user.svelte.js';

	let user = $state({
		email: ''
	});

	function onSubmit() {
		userState.login({
      email: user.email
    });
	}
</script>

<form>
	<fieldset>
		<legend>Email</legend>
		<input type="email" bind:value={user.email} />
	</fieldset>
	<fieldset>
		<button onclick={() => onSubmit()}>Login</button>
	</fieldset>
</form>

<style>
	form {
		max-width: 40rem;
	}
	fieldset:last-of-type {
		border-color: transparent;
	}
</style>
