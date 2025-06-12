<script lang="javascript">
	import { createEventDispatcher } from 'svelte';
	import { api } from '$lib/api.svelte.js';

	const { societyId: id = '' } = $props();

	const dispatch = createEventDispatcher();

	let societyId = $state(id);
	let residenceName = $state('');
	let floorCount = $state(0);
	let areaValue = $state(0);
	let residentsCount = $state(0);
	let description = $state('');

	async function submit() {
		const residenceData = {
			societyId,
			residenceName,
			floorCount,
			areaValue,
			residentsCount,
			description
		};

		try {
			const response = await api.createOrUpdateResidence(residenceData);
			dispatch('success', response.data);
		} catch (error) {
			console.error('Error creating residence:', error);
		}
	}
</script>

<form on:submit|preventDefault={submit}>
	{#if !id}
		<fieldset>
			<legend>Society ID</legend>
			<input bind:value={societyId} required />
		</fieldset>
	{/if}
	<fieldset>
		<legend>Residence Name</legend>
		<input bind:value={residenceName} required />
	</fieldset>
	<fieldset>
		<legend>Floor Count</legend>
		<input type="number" bind:value={floorCount} />
	</fieldset>
	<fieldset>
		<legend>Area (sqft)</legend>
		<input type="number" bind:value={areaValue} min="0" />
	</fieldset>
	<fieldset>
		<legend>Residents Count</legend>
		<input type="number" bind:value={residentsCount} min="0" />
	</fieldset>
	<fieldset>
		<legend>Description</legend>
		<textarea bind:value={description}></textarea>
	</fieldset>
	<fieldset>
		<button type="submit">Create Residence</button>
	</fieldset>
</form>
