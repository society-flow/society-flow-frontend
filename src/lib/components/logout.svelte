<script>
	import {userState} from '$lib/states/user.svelte.js';

  const {
    onLogout = () => {}
  } = $props();
  
	function onSubmit() {
		userState.logout();
    onLogout()
	}
</script>

<form>
	<fieldset>
		<button onclick={() => onSubmit()}>Logout</button>
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
