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
		<div>
			<label for="societyId">Society ID</label>
			<input id="societyId" bind:value={societyId} required />
		</div>
	{/if}
	<div>
		<label for="residenceName">Residence Name</label>
		<input id="residenceName" bind:value={residenceName} required />
	</div>
	<div>
		<label for="floorCount">Floor Count</label>
		<input type="number" id="floorCount" bind:value={floorCount} min="1" />
	</div>
	<div>
		<label for="areaValue">Area (sqft)</label>
		<input type="number" id="areaValue" bind:value={areaValue} min="0" />
	</div>
	<div>
		<label for="residentsCount">Residents Count</label>
		<input type="number" id="residentsCount" bind:value={residentsCount} min="0" />
	</div>
	<div>
		<label for="description">Description</label>
		<textarea id="description" bind:value={description}></textarea>
	</div>
	<button type="submit">Create Residence</button>
</form>
