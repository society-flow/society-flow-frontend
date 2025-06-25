<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import { api } from '$lib/api.svelte.js';

	const { maintenance, societies, residences, onSocietyChange } = $props();

	let id = $state(maintenance?.id || '');
	let societyId = $state(maintenance?.societyId || '');
	let residenceId = $state(maintenance?.residenceId || '');
	let yearMonth = $state(maintenance?.yearMonth || '');
	let isCurrent = $state(maintenance?.isCurrent || true);
	let previousAmountToPay = $state(maintenance?.previousAmountToPay || 0);
	let fineToPay = $state(maintenance?.fineToPay || 0);
	let thisMonthCalculation = $state(maintenance?.thisMonthCalculation || 0);
	let totalAmountToPay = $state(maintenance?.totalAmountToPay || 0);
	let withFormula = $state(maintenance?.withFormula || '');

	async function handleSubmit() {
		await api.createOrUpdateMaintenance({
			id,
			societyId,
			residenceId,
			yearMonth,
			isCurrent,
			previousAmountToPay,
			fineToPay,
			thisMonthCalculation,
			totalAmountToPay,
			withFormula
		});
	}
</script>

<form onsubmit={handleSubmit}>
	<fieldset>
		<legend>{$_('components.maintenances.form.society')}</legend>
		<select bind:value={societyId} onchange={() => onSocietyChange(societyId)} required>
			<option value="">{$_('components.maintenances.form.selectSociety')}</option>
			{#each societies as society}
				<option value={society.id}>{society.name}</option>
			{/each}
		</select>
	</fieldset>

	<fieldset>
		<legend>{$_('components.maintenances.form.residence')}</legend>
		<select bind:value={residenceId} required>
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
			bind:value={yearMonth}
			required
			placeholder={$_('components.maintenances.form.yearMonth_placeholder')}
		/>
	</fieldset>

	<fieldset>
		<legend>{$_('components.maintenances.form.isCurrent')}</legend>
		<input type="checkbox" bind:checked={isCurrent} />
	</fieldset>

	<fieldset>
		<legend>{$_('components.maintenances.form.previousAmountToPay')}</legend>
		<input type="number" bind:value={previousAmountToPay} required />
	</fieldset>

	<fieldset>
		<legend>{$_('components.maintenances.form.fineToPay')}</legend>
		<input type="number" bind:value={fineToPay} required />
	</fieldset>

	<fieldset>
		<legend>{$_('components.maintenances.form.thisMonthCalculation')}</legend>
		<input type="number" bind:value={thisMonthCalculation} required />
	</fieldset>

	<fieldset>
		<legend>{$_('components.maintenances.form.totalAmountToPay')}</legend>
		<input type="number" bind:value={totalAmountToPay} required />
	</fieldset>

	<fieldset>
		<legend>{$_('components.maintenances.form.withFormula')}</legend>
		<input type="text" bind:value={withFormula} required />
	</fieldset>

	<fieldset>
		<button type="submit">{$_(id ? 'common.update' : 'common.create')}</button>
	</fieldset>
</form>
