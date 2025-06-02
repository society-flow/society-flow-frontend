<script lang="ts">
	let email = $state('');

	const onSubmit = (event: Event) => {
		console.log('Submit');
		event.preventDefault();
		console.log('email', email);
	};
</script>

<form>
	<fieldset>
		<legend>Email</legend>
		<input bind:value={email} />
	</fieldset>
	<fieldset>
		<button onclick={onSubmit}>Login</button>
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
