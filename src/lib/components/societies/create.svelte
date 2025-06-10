<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import { api } from '$lib/api.svelte.js';
	import Card from '$lib/components/card.svelte';

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
		if (!form.name.trim() || !form.city.trim() || !form.state.trim() || !form.country.trim()) {
			error = $_('errors.required_fields');
			return;
		}

		isLoading = true;
		error = '';
		success = '';

		try {
			const societyData = {
				...form,
				finerate: parseFloat(form.finerate) || 0
			};

			const result = await api.createOrUpdateSociety(societyData);
			success = $_('society.created_successfully');

			// Reset form
			form = {
				name: '',
				pincode: '',
				city: '',
				state: '',
				country: '',
				currency: 'USD',
				timezone: '',
				areaunit: 'sqft',
				finerate: 0
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

<Card>
	<h2>{$_('society.create_new')}</h2>

	<form onsubmit={handleSubmit}>
		<fieldset>
			<label for="society-name">{$_('society.name')} *</label>
			<input
				id="society-name"
				bind:value={form.name}
				placeholder={$_('society.name_placeholder')}
				required
				oninput={resetMessages}
			/>
		</fieldset>

		<fieldset>
			<legend>{$_('society.pincode')}</legend>
			<input
				id="pincode"
				bind:value={form.pincode}
				placeholder={$_('society.pincode_placeholder')}
				oninput={resetMessages}
			/>
		</fieldset>

		<fieldset>
			<legend>{$_('society.city')} *</legend>
			<input
				id="city"
				bind:value={form.city}
				placeholder={$_('society.city_placeholder')}
				required
				oninput={resetMessages}
			/>
		</fieldset>

		<fieldset>
			<legend>{$_('society.state')} *</legend>
			<input
				id="state"
				bind:value={form.state}
				placeholder={$_('society.state_placeholder')}
				required
				oninput={resetMessages}
			/>
		</fieldset>

		<fieldset>
			<legend>{$_('society.country')} *</legend>
			<input
				id="country"
				bind:value={form.country}
				placeholder={$_('society.country_placeholder')}
				required
				oninput={resetMessages}
			/>
		</fieldset>

		<fieldset>
			<legend>{$_('society.timezone')}</legend>
			<input
				id="timezone"
				bind:value={form.timezone}
				placeholder={$_('society.timezone_placeholder')}
				oninput={resetMessages}
			/>
		</fieldset>

		<fieldset>
			<legend>{$_('society.currency')}</legend>
			<select
				id="currency"
				bind:value={form.currency}
				options={currencyOptions}
				onchange={resetMessages}
			/>
		</fieldset>

		<fieldset>
			<legend>{$_('society.area_unit')}</legend>
			<select
				id="areaunit"
				bind:value={form.areaunit}
				options={areaUnitOptions}
				onchange={resetMessages}
			/>
		</fieldset>

		<fieldset>
			<legend>{$_('society.fine_rate')}</legend>
			<input
				id="finerate"
				type="number"
				step="0.01"
				min="0"
				bind:value={form.finerate}
				placeholder="0.00"
				oninput={resetMessages}
			/>
		</fieldset>
		<fieldset>
			<button type="submit" disabled={isLoading}>
				{isLoading ? $_('common.creating') : $_('society.create')}
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
</Card>
