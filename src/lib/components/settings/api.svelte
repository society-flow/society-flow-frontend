<script lang="javascript">
	import { _ } from 'svelte-i18n';
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
		<legend>{$_('components.settings.api.legend')}</legend>
		<input id="api-url" type="text" bind:value={apiUrl} required />
		<label for="api-url">
			{$_('components.settings.api.label')}
		</label>
	</fieldset>
</form>
