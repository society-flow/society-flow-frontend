<script>
	let email = $state('');

	const onSubmit = () => {
		console.log('Submit');
    event.preventDefault();
    console.log("email", email);
	};
</script>

<p>Email: {email}</p>

<form>
	<fieldset>
		<legend>Email</legend>
		<input bind:value={email} />
	</fieldset>
	<fieldset>
		<button onclick={() => onSubmit()}>Login</button>
	</fieldset>
</form>
