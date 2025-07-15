<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import { api } from '$lib/api.svelte.js';
	import { userState } from '$lib/states/user.svelte.js';
	import Error from '$lib/components/error.svelte';

	const { data: initialData = {}, onSuccess = () => {} } = $props();

	let form = $state({
		...{
			societyId: '',
			residenceName: '',
			floorCount: 0,
			areaValue: 0,
			residentsCount: 0,
			percentageOwnership: 0,
			description: ''
		},
		...initialData
	});

	let error = $state('');

	// Load user societies for dropdown
	let societiesOptions = $state([]);
	$effect(async () => {
		if (userState.user?.id && societiesOptions.length === 0) {
			societiesOptions = await api.getUserSocieties(userState.user.id);
		}
	});

	function resetMessages() {
		error = '';
	}

	async function submit() {
		if (!form.societyId) {
			error = $_('errors.required_fields') || 'Society is required';
			return;
		}

		try {
			const response = await api.createOrUpdateResidence({ ...form });
			form = { ...response };
			onSuccess(response);
		} catch (err) {
			console.error('Error creating residence:', err);
			error = err.message || $_('errors.generic') || 'Error occurred';
		}
	}
</script>

<form on:submit|preventDefault={submit}>
	<fieldset>
		<legend>{$_('components.residences.form.societyId')}</legend>
		<select bind:value={form.societyId} required on:change={resetMessages}>
			<option value="" disabled>
				{$_('components.residences.form.societyId_placeholder') || 'Select a society'}
			</option>
			{#each societiesOptions as soc}
				<option value={soc.id}>{soc.name}</option>
			{/each}
		</select>
	</fieldset>

	<fieldset>
		<legend>{$_('components.residences.form.residenceName')}</legend>
		<input
			bind:value={form.residenceName}
			placeholder={$_('components.residences.form.residenceName_placeholder')}
			required
			on:input={resetMessages}
		/>
	</fieldset>

	<fieldset>
		<legend>{$_('components.residences.form.floorCount')}</legend>
		<input
			type="number"
			bind:value={form.floorCount}
			placeholder={$_('components.residences.form.floorCount_placeholder')}
			on:input={resetMessages}
		/>
	</fieldset>

	<fieldset>
		<legend>{$_('components.residences.form.areaValue')}</legend>
		<input
			type="number"
			bind:value={form.areaValue}
			min="0"
			placeholder={$_('components.residences.form.areaValue_placeholder')}
			on:input={resetMessages}
		/>
	</fieldset>

	<fieldset>
		<legend>{$_('components.residences.form.residentsCount')}</legend>
		<input
			type="number"
			bind:value={form.residentsCount}
			min="0"
			placeholder={$_('components.residences.form.residentsCount_placeholder')}
			on:input={resetMessages}
		/>
	</fieldset>

	<fieldset>
		<legend>{$_('components.residences.form.percentageOwnership')}</legend>
		<input
			type="number"
			bind:value={form.percentageOwnership}
			min="0"
			max="100"
			step="any"
			placeholder={$_('components.residences.form.percentageOwnership_placeholder')}
			required
			on:input={resetMessages}
		/>
	</fieldset>

	<fieldset>
		<legend>{$_('components.residences.form.description')}</legend>
		<textarea
			bind:value={form.description}
			placeholder={$_('components.residences.form.description_placeholder')}
			on:input={resetMessages}
		></textarea>
	</fieldset>

	<fieldset>
		<button type="submit">
			{$_('common.submit')}
		</button>
	</fieldset>

	{#if error}
		<fieldset data-type="error" role="alert">
			<Error {error} />
		</fieldset>
	{/if}
</form>
