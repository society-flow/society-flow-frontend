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
			console.log('form', form);
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
			<legend>{$_('components.residences.create.societyId')}</legend>
			<input
				bind:value={form.societyId}
				placeholder={$_('components.residences.create.societyId_placeholder')}
				required
			/>
		</fieldset>
	{/if}

	<fieldset>
		<legend>{$_('components.residences.create.residenceName')}</legend>
		<input
			bind:value={form.residenceName}
			placeholder={$_('components.residences.create.residenceName_placeholder')}
			required
			on:input={() => (form.description = form.description)}
		/>
	</fieldset>

	<fieldset>
		<legend>{$_('components.residences.create.floorCount')}</legend>
		<input
			type="number"
			bind:value={form.floorCount}
			placeholder={$_('components.residences.create.floorCount_placeholder')}
		/>
	</fieldset>

	<fieldset>
		<legend>{$_('components.residences.create.areaValue')}</legend>
		<input
			type="number"
			bind:value={form.areaValue}
			min="0"
			placeholder={$_('components.residences.create.areaValue_placeholder')}
		/>
	</fieldset>

	<fieldset>
		<legend>{$_('components.residences.create.residentsCount')}</legend>
		<input
			type="number"
			bind:value={form.residentsCount}
			min="0"
			placeholder={$_('components.residences.create.residentsCount_placeholder')}
		/>
	</fieldset>

	<fieldset>
		<legend>{$_('components.residences.create.description')}</legend>
		<textarea
			bind:value={form.description}
			placeholder={$_('components.residences.create.description_placeholder')}
		></textarea>
	</fieldset>

	<fieldset>
		<button type="submit">
			{$_('components.residences.create.submit')}
		</button>
	</fieldset>

	{#if error}
		<fieldset data-type="error">
			<Error {error} />
		</fieldset>
	{/if}
</form>
