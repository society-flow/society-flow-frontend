<script>
	import { _ } from 'svelte-i18n';
	import { api } from '$lib/api.svelte.js';
	import { userState } from '$lib/states/user.svelte.js';
	import Error from '$lib/components/error.svelte';

	const { expense, onSuccess = () => {} } = $props();

	let error = $state(null);
	let isSubmitting = $state(false);

	function getCurrentYearMonth() {
		const now = new Date();
		const year = now.getFullYear();
		const month = (now.getMonth() + 1).toString().padStart(2, '0');
		return parseInt(`${year}${month}`);
	}

	let form = $state({
		expenseId: expense?.id || '',
		amount: '',
		transactionDate: new Date().toISOString().split('T')[0],
		yearMonth: getCurrentYearMonth(),
		description: '',
		userId: userState.user?.id || ''
	});

	async function handleSubmit() {
		try {
			isSubmitting = true;
			error = null;

			// Validate amount is a valid number (can be negative for refunds)
			const amount = parseFloat(form.amount);
			if (isNaN(amount)) {
				error = { message: $_('components.expenses.payment.invalidAmount') };
				return;
			}

			const paymentData = {
				...form,
				amount: amount,
				transactionDate: new Date(form.transactionDate).toISOString()
			};

			const result = await api.createExpensePayment(paymentData);
			console.log('Payment created successfully:', result);
			console.log('Calling onSuccess callback...');
			onSuccess(result);

			// Reset form
			form = {
				expenseId: expense?.id || '',
				amount: '',
				transactionDate: new Date().toISOString().split('T')[0],
				yearMonth: getCurrentYearMonth(),
				description: '',
				userId: userState.user?.id || ''
			};
		} catch (e) {
			error = e;
		} finally {
			isSubmitting = false;
		}
	}

	function cancelForm() {
		error = null;
		form = {
			expenseId: expense?.id || '',
			amount: '',
			transactionDate: new Date().toISOString().split('T')[0],
			yearMonth: getCurrentYearMonth(),
			description: '',
			userId: userState.user?.id || ''
		};
	}
</script>

<form onsubmit={handleSubmit}>
	<fieldset>
		<legend>{$_('components.expenses.payment.amount')}</legend>
		<input
			type="text"
			inputmode="decimal"
			pattern="-?[0-9]*\.?[0-9]*"
			bind:value={form.amount}
			placeholder={$_('components.expenses.payment.amountPlaceholder')}
			required
		/>
	</fieldset>

	<fieldset>
		<legend>{$_('components.expenses.payment.transactionDate')}</legend>
		<input type="date" bind:value={form.transactionDate} required />
	</fieldset>

	<fieldset>
		<legend>{$_('components.expenses.payment.yearMonth')}</legend>
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
		<legend>{$_('components.expenses.payment.description')}</legend>
		<input
			type="text"
			bind:value={form.description}
			placeholder={$_('components.expenses.payment.descriptionPlaceholder')}
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
	</fieldset>
</form>

<style>
	.expense-payment-form {
		/* border: 1px solid var(--c-background); */
		border-radius: var(--border-radius);
		padding: 1rem;
		margin: 1rem 0;
	}

	.expense-payment-form header {
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
