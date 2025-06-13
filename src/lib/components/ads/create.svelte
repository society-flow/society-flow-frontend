<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import { api } from '$lib/api.svelte.js';
	import MapPicker from '$lib/components/map-picker.svelte';

	const { onCreate = () => {} } = $props();

	let isLoading = $state(false);
	let error = $state('');
	let success = $state('');

	// Form state matching AdvertisementDto
	let form = $state({
		adDescription: '',
		anonymousUserName: '',
		adType: '',
		isActive: true,
		approxGeoCoordinate: { x: '', y: '' }
	});

	// Options loaded via reactive effect
	let adTypeOptions = $state([]);

	$effect(async () => {
		if (adTypeOptions.length === 0) {
			adTypeOptions = await api.getAllAdTypes();
		}
	});

	function onMapSelect(event) {
		const { detail } = event;
		form = {
			...form,
			approxGeoCoordinate: {
				x: detail.lat,
				y: detail.lng
			}
		};
	}

	async function handleSubmit() {
		if (!form.adDescription.trim() || !form.anonymousUserName.trim() || !form.adType) {
			error = $_('errors.required_fields');
			return;
		}

		isLoading = true;
		error = '';
		success = '';

		try {
			const payload = {
				adDescription: form.adDescription,
				anonymousUserName: form.anonymousUserName,
				adType: form.adType,
				isActive: form.isActive,
				approxGeoCoordinate:
					form.approxGeoCoordinate.x && form.approxGeoCoordinate.y
						? { x: +form.approxGeoCoordinate.x, y: +form.approxGeoCoordinate.y }
						: undefined
			};

			const newAd = await api.createAdvertisement(payload);
			success = $_('components.advertisements.create.created_successfully');
			onCreate(newAd);

			// reset form
			form = {
				adDescription: '',
				anonymousUserName: '',
				adType: '',
				isActive: true,
				approxGeoCoordinate: { x: '', y: '' }
			};
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
		<legend>{$_('components.advertisements.create.adDescription')}</legend>
		<textarea
			bind:value={form.adDescription}
			placeholder={$_('components.advertisements.create.adDescription_placeholder')}
			required
			on:input={resetMessages}
		/>
	</fieldset>

	<fieldset>
		<legend>{$_('components.advertisements.create.anonymousUserName')}</legend>
		<input
			type="text"
			bind:value={form.anonymousUserName}
			placeholder={$_('components.advertisements.create.anonymousUserName_placeholder')}
			required
			on:input={resetMessages}
		/>
	</fieldset>

	<fieldset>
		<legend>{$_('components.advertisements.create.adType')}</legend>
		<select bind:value={form.adType} on:change={resetMessages}>
			<option value="" disabled>
				{$_('components.advertisements.create.adType_placeholder')}
			</option>
			{#each adTypeOptions as opt}
				<option value={opt.id}>{opt.name}</option>
			{/each}
		</select>
	</fieldset>

	<fieldset>
		<label>
			{$_('components.advertisements.create.map')}
		</label>
		<MapPicker on:select={onMapSelect} />
	</fieldset>

	<fieldset>
		<legend>{$_('components.advertisements.create.coordinates')}</legend>
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
			{isLoading ? $_('common.creating') : $_('components.advertisements.create.create')}
		</button>
	</fieldset>

	{#if error}
		<fieldset data-type="error" role="alert">{error}</fieldset>
	{/if}
	{#if success}
		<fieldset data-type="success" role="alert">{success}</fieldset>
	{/if}
</form>
