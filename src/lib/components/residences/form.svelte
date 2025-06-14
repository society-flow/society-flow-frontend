<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import { api } from '$lib/api.svelte.js';
	import Error from '$lib/components/error.svelte';

	const { data: initialData = {}, onsuccess = () => {} } = $props();

	let form = $state({
		...{
			societyId: '',
			residenceName: '',
			floorCount: 0,
			areaValue: 0,
			residentsCount: 0,
			description: ''
		},
		...initialData
	});
	let error = $state('');

	async function submit() {
		try {
			const response = await api.createOrUpdateResidence({ ...form });
			onsuccess(response);
			form = { ...response };
		} catch (error) {
			console.error('Error creating residence:', error);
			error = error.message;
			dispatch('error', error);
		}
	}
</script>

<form on:submit|preventDefault={submit}>
	{#if !form.societyId}
		<fieldset>
			<legend>{$_('components.residences.form.societyId')}</legend>
			<input
				bind:value={form.societyId}
				placeholder={$_('components.residences.form.societyId_placeholder')}
				required
			/>
		</fieldset>
	{/if}

	<fieldset>
		<legend>{$_('components.residences.form.residenceName')}</legend>
		<input
			bind:value={form.residenceName}
			placeholder={$_('components.residences.form.residenceName_placeholder')}
			required
			on:input={() => (form.description = form.description)}
		/>
	</fieldset>

	<fieldset>
		<legend>{$_('components.residences.form.floorCount')}</legend>
		<input
			type="number"
			bind:value={form.floorCount}
			placeholder={$_('components.residences.form.floorCount_placeholder')}
		/>
	</fieldset>

	<fieldset>
		<legend>{$_('components.residences.form.areaValue')}</legend>
		<input
			type="number"
			bind:value={form.areaValue}
			min="0"
			placeholder={$_('components.residences.form.areaValue_placeholder')}
		/>
	</fieldset>

	<fieldset>
		<legend>{$_('components.residences.form.residentsCount')}</legend>
		<input
			type="number"
			bind:value={form.residentsCount}
			min="0"
			placeholder={$_('components.residences.form.residentsCount_placeholder')}
		/>
	</fieldset>

	<fieldset>
		<legend>{$_('components.residences.form.description')}</legend>
		<textarea
			bind:value={form.description}
			placeholder={$_('components.residences.form.description_placeholder')}
		></textarea>
	</fieldset>

	<fieldset>
		<button type="submit">
			{$_('common.submit')}
		</button>
	</fieldset>

	{#if error}
		<fieldset data-type="error">
			<Error {error} />
		</fieldset>
	{/if}
</form>
