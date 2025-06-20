<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import { api } from '$lib/api.svelte.js';
	import { userState } from '$lib/states/user.svelte.js';

	// Props: data (initial expense) and onsuccess callback
	const { data = {}, onsuccess = () => {} } = $props();

	let isLoading = $state(false);
	let error = $state('');
	let success = $state('');

	let form = $state({
		name: '',
		amountPerMonth: 0,
		isActive: true,
		societyId: '',
		...data
	});

	// Load user societies for dropdown
	let societiesOptions = $state([]);
	$effect(async () => {
		if (userState.user?.id && societiesOptions.length === 0) {
			societiesOptions = await api.getUserSocieties(userState.user.id);
		}
	});

	function resetMessages() {
		error = '';
		success = '';
	}

	async function handleSubmit() {
		if (!form.name.trim() || !form.societyId) {
			error = $_('errors.required_fields') || 'Name and Society are required';
			return;
		}
		isLoading = true;
		error = '';
		success = '';
		try {
			const result = await api.createOrUpdateExpense(form);
			success = 'Expense saved successfully';
			onsuccess(result);
			form = { ...result };
		} catch (err) {
			error = err.message || $_('errors.generic') || 'Error occurred';
		} finally {
			isLoading = false;
		}
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<fieldset>
		<legend>{$_('components.expenses.form.name') || 'Name'}</legend>
		<input
			type="text"
			bind:value={form.name}
			placeholder={$_('components.expenses.form.name_placeholder') || ''}
			required
			on:input={resetMessages}
		/>
	</fieldset>
	<fieldset>
		<legend>{$_('components.expenses.form.amount') || 'Amount per Month'}</legend>
		<input
			type="number"
			step="any"
			bind:value={form.amountPerMonth}
			placeholder={$_('components.expenses.form.amount') || ''}
			required
			on:input={resetMessages}
		/>
	</fieldset>
	<fieldset>
		<legend>{$_('components.expenses.form.society') || 'Society'}</legend>
		<select bind:value={form.societyId} required on:change={resetMessages}>
			<option value="" disabled
				>{$_('components.expenses.form.society_placeholder') || 'Select a society'}</option
			>
			{#each societiesOptions as soc}
				<option value={soc.id}>{soc.name}</option>
			{/each}
		</select>
	</fieldset>
	<fieldset>
		<legend>{$_('components.expenses.form.active') || 'Active'}</legend>
		<input type="checkbox" bind:checked={form.isActive} on:change={resetMessages} />
	</fieldset>
	<fieldset>
		<button type="submit" disabled={isLoading}>
			{isLoading ? $_('common.creating') || 'Saving...' : $_('common.submit') || 'Submit'}
		</button>
	</fieldset>
	{#if error}
		<fieldset data-type="error" role="alert">{error}</fieldset>
	{/if}
	{#if success}
		<fieldset data-type="success" role="alert">{success}</fieldset>
	{/if}
</form>
