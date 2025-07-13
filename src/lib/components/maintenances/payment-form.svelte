<script>
	import { _ } from 'svelte-i18n';
	import { api } from '$lib/api.svelte.js';
	import { userState } from '$lib/states/user.svelte.js';
	import Error from '$lib/components/error.svelte';

	const { maintenance, residenceId, onSuccess = () => {} } = $props();

	let error = $state(null);
	let isSubmitting = $state(false);
	let showForm = $state(false);

	function getTodaysDate() {
		return new Date().toISOString().split('T')[0];
	}

	let form = $state({
		residenceId: residenceId || '',
		amount: '',
		transactionDate: getTodaysDate(),
		yearMonth: getTodaysDate(),
		description: '',
		userId: userState.user?.id || ''
	});

	async function handleSubmit() {
		try {
			isSubmitting = true;
			error = null;

			// Validate amount is a valid number (can be negative for refunds)
			const amount = parseFloat(form.amount);
			console.log('Parsed amount:', amount);
			if (isNaN(amount)) {
				error = { message: $_('components.maintenances.payment.invalidAmount') };
				return;
			}

			const yearMonthDate = new Date(form.yearMonth);
			const year = yearMonthDate.getFullYear();
			const month = (yearMonthDate.getMonth() + 1).toString().padStart(2, '0');
			const yearMonthValue = parseInt(`${year}${month}`, 10);

			const paymentData = {
				...form,
				amount: amount,
				transactionDate: new Date(form.transactionDate).toISOString(),
				yearMonth: yearMonthValue
			};

			const result = await api.createMaintenancePayment(paymentData);
			onSuccess(result);

			// Reset form
			form = {
				residenceId: residenceId || '',
				amount: '',
				transactionDate: getTodaysDate(),
				yearMonth: getTodaysDate(),
				description: '',
				userId: userState.user?.id || ''
			};
			showForm = false;
		} catch (e) {
			console.error('Maintenance payment creation failed:', e);
			console.error('Error details:', e.response || e.message || e);
			error = e;
		} finally {
			isSubmitting = false;
		}
	}
</script>

<form onsubmit={handleSubmit}>
	<fieldset>
		<legend>{$_('components.maintenances.payment.amount')}</legend>
		<input
			type="text"
			inputmode="decimal"
			pattern="-?[0-9]*\.?[0-9]*"
			bind:value={form.amount}
			placeholder={$_('components.maintenances.payment.amountPlaceholder')}
			required
		/>
	</fieldset>

	<fieldset>
		<legend>{$_('components.maintenances.payment.transactionDate')}</legend>
		<input type="date" bind:value={form.transactionDate} required />
	</fieldset>

	<fieldset>
		<legend>{$_('components.maintenances.payment.yearMonth')}</legend>
		<input type="date" bind:value={form.yearMonth} required />
	</fieldset>

	<fieldset>
		<legend>{$_('components.maintenances.payment.description')}</legend>
		<input
			type="text"
			bind:value={form.description}
			placeholder={$_('components.maintenances.payment.descriptionPlaceholder')}
		/>
	</fieldset>

	{#if error}
		<fieldset>
			<Error {error} />
		</fieldset>
	{/if}

	<fieldset>
		<button type="submit" disabled={isSubmitting}>
			{isSubmitting ? $_('common.saving') : $_('common.save')}
		</button>
	</fieldset>
</form>
