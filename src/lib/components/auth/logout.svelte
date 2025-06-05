<script>
	import { _ } from 'svelte-i18n';
	import { api } from '$lib/api.svelte.js';

	const { onLogout = () => {} } = $props();

	function onSubmit() {
		api.logout();
		onLogout();
	}
</script>

<form>
	<fieldset>
		<button onclick={() => onSubmit()}>{$_('menu.logout')}</button>
	</fieldset>
</form>
