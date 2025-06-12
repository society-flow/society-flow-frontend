<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import { api } from '$lib/api.svelte.js';

	const { onSuccess = () => {} } = $props();

	let isLoading = $state(false);
	let error = $state('');
	let success = $state('');

	// Form state
	let form = $state({
		name: '',
		pincode: '',
		city: '',
		state: '',
		country: '',
		currency: 'USD',
		timezone: '',
		areaunit: 'sqft',
		finerate: 0
	});

	// Currency options
	const currencyOptions = [
		{ value: 'USD', label: 'USD - US Dollar' },
		{ value: 'EUR', label: 'EUR - Euro' },
		{ value: 'GBP', label: 'GBP - British Pound' },
		{ value: 'INR', label: 'INR - Indian Rupee' },
		{ value: 'CAD', label: 'CAD - Canadian Dollar' },
		{ value: 'AUD', label: 'AUD - Australian Dollar' }
	];

	// Area unit options
	const areaUnitOptions = [
		{ value: 'sqft', label: 'Square Feet' },
		{ value: 'sqm', label: 'Square Meters' },
		{ value: 'acres', label: 'Acres' },
		{ value: 'hectares', label: 'Hectares' }
	];

	async function handleSubmit() {
		if (!form.name.trim()) {
			error = $_('errors.required_fields');
			return;
		}

		isLoading = true;
		error = '';
		success = '';

		try {
			const result = await api.createOrUpdateSociety({ ...form });
			success = $_('components.societies.create.created_successfully');

			// Reset form
			form = {
				name: '',
				pincode: '',
				city: '',
				state: '',
				country: '',
				currency: 'USD',
				timezone: '',
				areaunit: 'sqft'
			};

			onSuccess(result);
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

<form onsubmit={handleSubmit}>
		<fieldset>
			<legend for="society-name">{$_('components.societies.create.name')}</legend>
			<input
				id="society-name"
				bind:value={form.name}
				placeholder={$_('components.societies.create.name_placeholder')}
				required
				oninput={resetMessages}
			/>
		</fieldset>

		<fieldset>
			<legend>{$_('components.societies.create.pincode')}</legend>
			<input
				id="pincode"
				bind:value={form.pincode}
				placeholder={$_('components.societies.create.pincode_placeholder')}
				oninput={resetMessages}
			/>
		</fieldset>

		<fieldset>
			<legend>{$_('components.societies.create.city')}</legend>
			<input
				id="city"
				bind:value={form.city}
				placeholder={$_('components.societies.create.city_placeholder')}
				oninput={resetMessages}
			/>
		</fieldset>

		<fieldset>
			<legend>{$_('components.societies.create.state')}</legend>
			<input
				id="state"
				bind:value={form.state}
				placeholder={$_('components.societies.create.state_placeholder')}
				oninput={resetMessages}
			/>
		</fieldset>

		<fieldset>
			<legend>{$_('components.societies.create.country')}</legend>
			<input
				id="country"
				bind:value={form.country}
				placeholder={$_('components.societies.create.country_placeholder')}
				oninput={resetMessages}
			/>
		</fieldset>

		<fieldset>
			<legend>{$_('components.societies.create.timezone')}</legend>
			<input
				id="timezone"
				bind:value={form.timezone}
				placeholder={$_('components.societies.create.timezone_placeholder')}
				oninput={resetMessages}
			/>
		</fieldset>

		<fieldset>
			<legend>{$_('components.societies.create.currency')}</legend>
			<select id="currency" bind:value={form.currency} onchange={resetMessages}>
				{#each currencyOptions as option}
					<option value={option.value}>{option.label}</option>
				{/each}
			</select>
		</fieldset>

		<fieldset>
			<legend>{$_('components.societies.create.area_unit')}</legend>
			<select id="areaunit" bind:value={form.areaunit} onchange={resetMessages}>
				{#each areaUnitOptions as option}
					<option value={option.value}>{option.label}</option>
				{/each}
			</select>
		</fieldset>

		<fieldset>
			<button type="submit" disabled={isLoading}>
				{isLoading ? $_('common.creating') : $_('components.societies.create.create')}
			</button>
		</fieldset>
		{#if error}
			<fieldset data-type="error" role="alert">
				{error}
			</fieldset>
		{/if}
		{#if success}
			<fieldset data-type="success" role="alert">
				{success}
			</fieldset>
		{/if}
	</form>
