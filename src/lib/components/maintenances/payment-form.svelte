<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import { api } from '$lib/api.svelte.js';
	import { userState } from '$lib/states/user.svelte.js';
	import Error from '$lib/components/error.svelte';

	const { maintenance, residenceId, onSuccess = () => {} } = $props();

	let error = $state(null);
	let isSubmitting = $state(false);
	let showForm = $state(false);

	function getCurrentYearMonth() {
		const now = new Date();
		const year = now.getFullYear();
		const month = (now.getMonth() + 1).toString().padStart(2, '0');
		return parseInt(`${year}${month}`);
	}

	let form = $state({
		residenceId: residenceId || '',
		amount: '',
		transactionDate: new Date().toISOString().split('T')[0],
		yearMonth: getCurrentYearMonth(),
		description: '',
		userId: userState.user?.id || ''
	});

	async function handleSubmit() {
		try {
			console.log('handleSubmit called');
			console.log('Form data:', form);
			console.log('Maintenance prop:', maintenance);
			
			isSubmitting = true;
			error = null;
			
			// Validate amount is a valid number (can be negative for refunds)
			const amount = parseFloat(form.amount);
			console.log('Parsed amount:', amount);
			if (isNaN(amount)) {
				error = { message: $_('components.maintenances.payment.invalidAmount') };
				return;
			}
			
			const paymentData = {
				...form,
				amount: amount,
				transactionDate: new Date(form.transactionDate).toISOString()
			};

			console.log('Sending maintenance payment data:', paymentData);
			console.log('Maintenance object:', maintenance);
			
			const result = await api.createMaintenancePayment(paymentData);
			console.log('Maintenance payment created successfully:', result);
			onSuccess(result);
			
			// Reset form
			form = {
				residenceId: residenceId || '',
				amount: '',
				transactionDate: new Date().toISOString().split('T')[0],
				yearMonth: getCurrentYearMonth(),
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

	function cancelForm() {
		showForm = false;
		error = null;
		form = {
			residenceId: residenceId || '',
			amount: '',
			transactionDate: new Date().toISOString().split('T')[0],
			yearMonth: getCurrentYearMonth(),
			description: '',
			userId: userState.user?.id || ''
		};
	}
</script>

<section class="maintenance-payment-form">
	<header>
		<h3>{$_('components.maintenances.payment.title')}</h3>
		{#if !showForm}
			<button type="button" onclick={() => showForm = true}>
				{$_('components.maintenances.payment.addPayment')}
			</button>
		{/if}
	</header>

	{#if showForm}
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
				<input
					type="date"
					bind:value={form.transactionDate}
					required
				/>
			</fieldset>

			<fieldset>
				<legend>{$_('components.maintenances.payment.yearMonth')}</legend>
				<input
					type="number"
					min="202301"
					max="209912"
					bind:value={form.yearMonth}
					placeholder="202507"
					required
				/>
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

			<fieldset class="form-actions">
				<button type="submit" disabled={isSubmitting}>
					{isSubmitting ? $_('common.saving') : $_('common.save')}
				</button>
				<button type="button" onclick={cancelForm}>
					{$_('common.cancel')}
				</button>
			</fieldset>
		</form>
	{/if}
</section>

<style>
	.maintenance-payment-form {
		border: 1px solid #e0e0e0;
		border-radius: 8px;
		padding: 1rem;
		margin: 1rem 0;
	}

	.maintenance-payment-form header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.form-actions {
		display: flex;
		gap: 0.5rem;
		justify-content: flex-end;
	}

	.form-actions button {
		padding: 0.5rem 1rem;
	}
</style>