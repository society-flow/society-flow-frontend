<script>
	import { _ } from 'svelte-i18n';
	import { api } from '$lib/api.svelte.js';
	import Error from '$lib/components/error.svelte';
	import Icon from '$lib/components/icon.svelte';

	const { onLogout = () => {} } = $props();

	let error = $state(null);

	async function onSubmit(event) {
		event.preventDefault();
		error = '';
		try {
			await api.logout();
			onLogout();
		} catch (err) {
			error = err;
		}
	}
</script>

<form on:submit={onSubmit}>
	<fieldset>
		<button type="submit">
			<Icon icon="log-out" />
			{$_('menu.auth.logout')}
		</button>
	</fieldset>

	{#if error}
		<fieldset data-type="error">
			<Error {error} />
		</fieldset>
	{/if}
</form>
