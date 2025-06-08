<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import { api } from '$lib/api.svelte.js';
	import Error from '$lib/components/error.svelte';

	const { email, name, onregister = () => {} } = $props();

	let user = $state({
		email: email || '',
		name: name || ''
	});
	let error = $state(null);

	async function onsubmit(event) {
		event.preventDefault();
		error = '';
		try {
			await api.register(user);
			onregister(user);
		} catch (err) {
			error = err;
		}
	}
</script>

<form {onsubmit}>
	<fieldset>
		<legend>{$_('components.auth.register.name.legend')}</legend>
		<input
			autofocus
			required
			type="text"
			bind:value={user.name}
			minlength="2"
			maxlength="50"
			placeholder={$_('components.auth.register.name.placeholder')}
		/>
	</fieldset>

	<fieldset>
		<legend>{$_('components.auth.register.email.legend')}</legend>
		<input
			required
			type="email"
			bind:value={user.email}
			placeholder={$_('components.auth.register.email.placeholder')}
		/>
	</fieldset>

	<fieldset>
		<button type="submit">{$_('components.auth.register.submit')}</button>
	</fieldset>

	{#if error}
		<fieldset data-type="error">
			<Error {error} />
		</fieldset>
	{/if}
</form>
