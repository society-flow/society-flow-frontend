<script lang="janvascript">
	import { _ } from 'svelte-i18n';
	import { api } from '$lib/api.svelte.js';
	import MapPicker from '$lib/components/map-picker.svelte';

	const { data: initialData = {}, onsuccess = () => {} } = $props();

	let isLoading = $state(false);
	let error = $state('');
	let success = $state('');

	let form = $state({
		...{
			title: '',
			adDescription: '',
			anonymousUserName: '',
			type: '',
			isActive: true,
			approxGeoCoordinate: { x: '', y: '' }
		},
		...initialData
	});

	const markers = $derived([
		{
			coordinates: [form.approxGeoCoordinate.x, form.approxGeoCoordinate.y],
			title: form.adDescription || ''
		}
	]);

	// Options loaded via reactive effect
	let adTypeOptions = $state([]);
	$effect(async () => {
		if (adTypeOptions.length === 0) {
			adTypeOptions = await api.getAllAdTypes();
		}
	});

	function onMapSelect(detail) {
		form.approxGeoCoordinate = {
			x: detail.lat,
			y: detail.lng
		};
	}

	async function handleSubmit() {
		if (!form.adDescription.trim() || !form.anonymousUserName.trim() || !form.type) {
			error = $_('errors.required_fields');
			return;
		}

		isLoading = true;
		error = '';
		success = '';

		try {
			const newAd = await api.createAdvertisement({ ...form });
			success = $_('components.ads.form.created_successfully');
			onsuccess(newAd);

			// reset form
			form = { ...newAd };
		} catch (err) {
			error = err.message || $_('errors.generic');
		} finally {
			isLoading = false;
		}
	}

	function resetMessages() {
		error = '';
		success = '';
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<fieldset>
		<legend>{$_('components.ads.form.title')}</legend>
		<input
			bind:value={form.title}
			placeholder={$_('components.ads.form.title_placeholder')}
			required
			on:input={resetMessages}
		/>
	</fieldset>

	<fieldset>
		<legend>{$_('components.ads.form.adDescription')}</legend>
		<textarea
			bind:value={form.adDescription}
			placeholder={$_('components.ads.form.adDescription_placeholder')}
			required
			on:input={resetMessages}
		/>
	</fieldset>

	<fieldset>
		<legend>{$_('components.ads.form.anonymousUserName')}</legend>
		<input
			type="text"
			bind:value={form.anonymousUserName}
			placeholder={$_('components.ads.form.anonymousUserName_placeholder')}
			required
			on:input={resetMessages}
		/>
	</fieldset>

	<fieldset>
		<legend>{$_('components.ads.form.type')}</legend>
		<select bind:value={form.type} on:change={resetMessages} required>
			<option value="" disabled>
				{$_('components.ads.form.type_placeholder')}
			</option>
			{#each adTypeOptions as opt}
				<option value={opt.id}>{$_(`const.ads_types.${opt.name}`)}</option>
			{/each}
		</select>
	</fieldset>

	<fieldset>
		<legend>
			{$_('components.ads.form.map')}
		</legend>
		<MapPicker onselect={onMapSelect} initialMarkers={markers} />
	</fieldset>

	<fieldset style="display: none;">
		<legend>{$_('components.ads.form.coordinates')}</legend>
		<input
			type="number"
			step="any"
			bind:value={form.approxGeoCoordinate.x}
			placeholder="Lat"
			on:input={resetMessages}
		/>
		<input
			type="number"
			step="any"
			bind:value={form.approxGeoCoordinate.y}
			placeholder="Lng"
			on:input={resetMessages}
		/>
	</fieldset>

	<fieldset>
		<button type="submit" disabled={isLoading}>
			{$_('common.submit')}
		</button>
	</fieldset>

	{#if error}
		<fieldset data-type="error" role="alert">{error}</fieldset>
	{/if}
	{#if success}
		<fieldset data-type="success" role="alert">{success}</fieldset>
	{/if}
</form>
