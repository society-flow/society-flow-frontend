<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import { api } from '$lib/api.svelte.js';
	import Error from '$lib/components/error.svelte';

	const {
		maintenance,
		societies,
		residences,
		onSocietyChange = () => {},
		onSuccess = () => {}
	} = $props();

	let error = $state(null);
	let form = $state({
		id: maintenance?.id,
		societyId: maintenance?.societyId || '',
		residenceId: maintenance?.residenceId || '',
		yearMonth: maintenance?.yearMonth || '',
		isCurrent: maintenance?.isCurrent || true,
		previousAmountToPay: maintenance?.previousAmountToPay || 0,
		fineToPay: maintenance?.fineToPay || 0,
		thisMonthCalculation: maintenance?.thisMonthCalculation || 0,
		totalAmountToPay: maintenance?.totalAmountToPay || 0,
		withFormula: maintenance?.withFormula || ''
	});
	async function handleSubmit() {
		try {
			const res = await api.createOrUpdateMaintenance({ ...form });
			onSuccess(res);
			form = { ...res };
		} catch (e) {
			error = e;
		}
	}
</script>

<form onsubmit={handleSubmit}>
	<fieldset>
		<legend>{$_('components.maintenances.form.society')}</legend>
		<select bind:value={form.societyId} onchange={() => onSocietyChange(form.societyId)} required>
			<option value="">{$_('components.maintenances.form.selectSociety')}</option>
			{#each societies as society}
				<option value={society.id}>{society.name}</option>
			{/each}
		</select>
	</fieldset>

	<fieldset>
		<legend>{$_('components.maintenances.form.residence')}</legend>
		<select bind:value={form.residenceId} required>
			<option value="">{$_('components.maintenances.form.selectResidence')}</option>
			{#each residences as residence}
				<option value={residence.id}>{residence.residenceName}</option>
			{/each}
		</select>
	</fieldset>

	<fieldset>
		<legend>{$_('components.maintenances.form.yearMonth')}</legend>
		<input
			type="text"
			bind:value={form.yearMonth}
			required
			placeholder={$_('components.maintenances.form.yearMonth_placeholder')}
		/>
	</fieldset>

	<fieldset>
		<legend>{$_('components.maintenances.form.isCurrent')}</legend>
		<input type="checkbox" bind:checked={form.isCurrent} />
	</fieldset>

	<fieldset>
		<legend>{$_('components.maintenances.form.previousAmountToPay')}</legend>
		<input type="number" bind:value={form.previousAmountToPay} required />
	</fieldset>

	<fieldset>
		<legend>{$_('components.maintenances.form.fineToPay')}</legend>
		<input type="number" bind:value={form.fineToPay} required />
	</fieldset>

	<fieldset>
		<legend>{$_('components.maintenances.form.thisMonthCalculation')}</legend>
		<input type="number" bind:value={form.thisMonthCalculation} required />
	</fieldset>

	<fieldset>
		<legend>{$_('components.maintenances.form.totalAmountToPay')}</legend>
		<input type="number" bind:value={form.totalAmountToPay} required />
	</fieldset>

	<fieldset>
		<legend>{$_('components.maintenances.form.withFormula')}</legend>
		<input type="text" bind:value={form.withFormula} required />
	</fieldset>

	{#if error}
		<fieldset>
			<Error {error} />
		</fieldset>
	{/if}

	<fieldset>
		<button type="submit">{$_(form.id ? 'common.update' : 'common.create')}</button>
	</fieldset>
</form>
