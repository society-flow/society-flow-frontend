<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import { createEventDispatcher } from 'svelte';
	import { api } from '$lib/api.svelte.js';

	const { societyId: initialSocietyId = '' } = $props();
	const dispatch = createEventDispatcher();

	// single form state
	let form = $state({
		societyId: initialSocietyId,
		residenceName: '',
		floorCount: 0,
		areaValue: 0,
		residentsCount: 0,
		description: ''
	});

	// keep a copy of the initial state for reset
	const defaultForm = { ...form };

	async function submit() {
		try {
			const response = await api.createOrUpdateResidence({ ...form });
			dispatch('success', response);
			// reset form to defaults
			form = {
				...defaultForm,
				societyId: initialSocietyId
			};
		} catch (error) {
			console.error('Error creating residence:', error);
			dispatch('error', error);
		}
	}
</script>

<form on:submit|preventDefault={submit}>
	{#if !initialSocietyId}
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
</form>
