<script>
	import { api } from '$lib/api.svelte.js';

	const { onLogout = () => {} } = $props();

	function onSubmit() {
		api.logout();
		onLogout();
	}
</script>

<form>
	<fieldset>
		<button onclick={() => onSubmit()}>Logout</button>
	</fieldset>
</form>
