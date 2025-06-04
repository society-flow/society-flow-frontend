<script lang="javscript">
	import { api } from '$lib/api.svelte.js';

	const props = $props();

	let apiUrl = $state(api.url);

	$effect(() => {
		if (apiUrl !== api.url) {
			api.url = apiUrl;
		}
	});
</script>

<form>
	<fieldset>
		<legend>Api URL</legend>
		<input id="api-url" type="text" bind:value={apiUrl} required />
		<label for="api-url">Where the API on the backend servers is located.</label>
	</fieldset>
</form>
