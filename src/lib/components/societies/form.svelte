<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import { api } from '$lib/api.svelte.js';
	import { nominatim } from '$lib/geo.js';
	import { AREA_UNITS as areaUnitOptions } from '$lib/const/area.js';
	import { CURRENCIES as currencyOptions } from '$lib/const/currencies.js';
	import MapPicker from '$lib/components/map-picker.svelte';

	const { data: initialData = {}, onsuccess = () => {} } = $props();
	const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

	let isLoading = $state(false);
	let error = $state('');

	// Form state
	let form = $state({
		...{
			name: '',
			postcode: '',
			city: '',
			state: '',
			country: '',
			currency: 'EUR',
			timezone: userTimezone || '',
			areaUnit: 'sqm',
			fineRate: 0,
			geoCoordinate: { x: '', y: '' }
		},
		...initialData
	});

	const markers = $derived(
		form.geoCoordinate
			? [
					{
						coordinates: [form?.geoCoordinate?.x, form?.geoCoordinate?.y],
						title: form.name || ''
					}
				]
			: []
	);

	async function onMapSelect(detail) {
		const lat = detail.lat;
		const lng = detail.lng;

		form = {
			...form,
			geoCoordinate: {
				x: lat,
				y: lng
			}
		};

		try {
			const data = await nominatim(lat, lng);

			if (data.address) {
				form = {
					...form,
					postcode: data.address.postcode || '',
					city: data.address.city || data.address.town || data.address.village || '',
					state: data.address.state || '',
					country: data.address.country || ''
				};
			}
		} catch (err) {
			console.error('Error fetching OSM data:', err);
		}
	}

	async function handleSubmit() {
		if (!form.name.trim()) {
			error = $_('errors.required_fields');
			return;
		}

		isLoading = true;
		error = '';

		try {
			const res = await api.createOrUpdateSociety({ ...form });
			form = { ...res };
			onsuccess(res);
		} catch (err) {
			error = err.message || $_('errors.generic');
		} finally {
			isLoading = false;
		}
	}

	function resetMessages() {
		error = '';
	}
</script>

<form onsubmit={handleSubmit}>
	<fieldset>
		<legend>{$_('components.societies.form.name')}</legend>
		<input
			bind:value={form.name}
			placeholder={$_('components.societies.form.name_placeholder')}
			required
			oninput={resetMessages}
		/>
	</fieldset>

	<fieldset>
		<legend>
			{$_('components.ads.create.map')}
		</legend>
		<MapPicker onselect={onMapSelect} initialMarkers={markers} />
	</fieldset>

	<fieldset>
		<legend>{$_('components.societies.form.postcode')}</legend>
		<input
			bind:value={form.postcode}
			placeholder={$_('components.societies.form.postcode_placeholder')}
			oninput={resetMessages}
		/>
	</fieldset>

	<fieldset>
		<legend>{$_('components.societies.form.city')}</legend>
		<input
			bind:value={form.city}
			placeholder={$_('components.societies.form.city_placeholder')}
			oninput={resetMessages}
		/>
	</fieldset>

	<fieldset>
		<legend>{$_('components.societies.form.state')}</legend>
		<input
			bind:value={form.state}
			placeholder={$_('components.societies.form.state_placeholder')}
			oninput={resetMessages}
		/>
	</fieldset>

	<fieldset>
		<legend>{$_('components.societies.form.country')}</legend>
		<input
			bind:value={form.country}
			placeholder={$_('components.societies.form.country_placeholder')}
			oninput={resetMessages}
		/>
	</fieldset>

	<fieldset>
		<legend>{$_('components.societies.form.timezone')}</legend>
		<select bind:value={form.timezone} onchange={resetMessages}>
			{#each Intl.supportedValuesOf('timeZone').sort() as tz}
				<option value={tz}>
					{tz}
				</option>
			{/each}
		</select>
	</fieldset>

	<fieldset>
		<legend>{$_('components.societies.form.currency')}</legend>
		<select bind:value={form.currency} onchange={resetMessages}>
			{#each currencyOptions as option}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
	</fieldset>

	<fieldset>
		<legend>{$_('components.societies.form.area_unit')}</legend>
		<select bind:value={form.areaUnit} onchange={resetMessages}>
			{#each areaUnitOptions as option}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
	</fieldset>

	<fieldset>
		<button type="submit" disabled={isLoading}>
			{$_('common.submit')}
		</button>
	</fieldset>

	{#if error}
		<fieldset data-type="error">
			{error}
		</fieldset>
	{/if}
</form>
