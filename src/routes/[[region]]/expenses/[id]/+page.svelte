<script>
	import { _, locale } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { invalidate } from '$app/navigation';
	import { api } from '$lib/api.svelte.js';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Anchor from '$lib/components/anchor.svelte';
	import Page from '$lib/components/routes/page.svelte';
	import ExpenseDetails from '$lib/components/expenses/details.svelte';
	import DistributionList from '$lib/components/expenses/distributions/list.svelte';
	import CalculationsList from '$lib/components/calculations/list.svelte';
	import PaymentForm from '$lib/components/expenses/payment-form.svelte';
	import PaymentList from '$lib/components/expenses/payment-list.svelte';
	import { IconShuffle, IconMath, IconBills, IconHistory, IconClose, IconEdit } from 'obra-icons-svelte';

	requiresAuth(locale);

	const { id } = $derived($page.params);
	const { data } = $props();
	const { expense, society, calculations, payments, distributions } = $derived(data);

	async function onPaymentSuccess(newPayment) {
		invalidate('data:expense');
	}
</script>

<Page title={expense.name || $_('menu.expenses')} showHeader={!!expense?.name}>
	{#if expense.id}
		<header>
			<nav>
				<ul>
					<li>
						<Anchor href={`/update/expenses/${expense.id}`} isButton title={$_('common.update')}>
							{$_('common.update')}
							<IconEdit />
						</Anchor>
					</li>
					<li>
						<Anchor href={`/delete/expenses/${expense.id}`} title={$_('common.delete')} isButton>
							{$_('common.delete')}
							<IconClose />
						</Anchor>
					</li>
				</ul>
			</nav>
		</header>

		<section>
			<ExpenseDetails {expense} {society} />
		</section>

		<section>
			<header>
				<h2>
					<IconShuffle />
					{$_('pages.expenses.detail.distributions')}
				</h2>
				<nav>
					<ul>
						<li>
							{#if distributions.filter((d) => d.isActive).length}
								<Anchor href={`/update/expenses/distributions?id=${expense.id}`} isButton>
									{$_('pages.expenses.detail.editDistributions')}
								</Anchor>
							{:else}
								<Anchor href={`/create/expenses/distributions?expense=${expense.id}`} isButton>
									{$_('pages.expenses.detail.addDistribution')}
								</Anchor>
							{/if}
						</li>
					</ul>
				</nav>
			</header>
			<DistributionList {distributions} />
		</section>
		<section>
			<header>
				<h3>
					<IconMath />
					{$_('pages.expenses.detail.calculations')}
				</h3>
			</header>
			<CalculationsList {calculations} {society} />
		</section>

		<section>
			<header>
				<header>
					<h3>
						<IconBills />
						{$_('components.expenses.payment.title')}
					</h3>
				</header>
			</header>
			<PaymentForm {expense} onSuccess={onPaymentSuccess} />
		</section>

		<section>
			<header>
				<h3>
					<IconHistory />
					{$_('components.expenses.payment.paymentHistory')}
				</h3>
			</header>
			<PaymentList {payments} {society} />
		</section>
	{:else}
		<progress />
	{/if}
</Page>
