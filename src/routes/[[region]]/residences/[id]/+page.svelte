<script>
	import { _ } from 'svelte-i18n';
	import { invalidate } from '$app/navigation';
	import { api } from '$lib/api.svelte.js';
	import Anchor from '$lib/components/anchor.svelte';
	import ResidenceDetails from '$lib/components/residences/details.svelte';
	import SocietyCard from '$lib/components/societies/card.svelte';
	import ResidenceJoin from '$lib/components/residences/join.svelte';
	import FundCard from '$lib/components/funds/card.svelte';
	import MaintenancesList from '$lib/components/maintenances/list.svelte';
	import MaintenancePaymentForm from '$lib/components/maintenances/payment-form.svelte';
	import MaintenancePaymentList from '$lib/components/maintenances/payment-list.svelte';

	const { data } = $props();
	const { residence, fund, isMember, society, isAdmin } = $derived(data);
	const { totalFund: total } = $derived(fund);
	const { currency } = $derived(society);
	const id = $derived(residence.id);

	// Fetch maintenances for this residence
	let maintenances = $state([]);
	$effect(async () => {
		if (id && residence.societyId) {
			try {
				console.log('Fetching maintenances for residence:', id, 'society:', residence.societyId);
				const result = await api.getAllMaintenances(residence.societyId, id);
				console.log('Fetched maintenances:', result);
				maintenances = result;
			} catch (error) {
				console.error('Error fetching maintenances:', error);
				maintenances = [];
			}
		}
	});

	// Fetch maintenance payments for this residence
	let maintenancePayments = $state([]);
	$effect(async () => {
		if (id) {
			try {
				console.log('Fetching maintenance payments for residence:', id);
				const result = await api.getMaintenancePaymentsByResidenceId(id);
				console.log('Fetched maintenance payments:', result);
				maintenancePayments = result;
			} catch (error) {
				console.error('Error fetching maintenance payments:', error);
				maintenancePayments = [];
			}
		}
	});

	// Get the latest active maintenance for payment form
	const latestActiveMaintenance = $derived(() => {
		return maintenances.find((m) => m.isCurrent) || null;
	});

	async function onMaintenancePaymentSuccess(newPayment) {
		// Refresh maintenance payments list
		maintenancePayments = await api.getMaintenancePaymentsByResidenceId(id);
		// Also refresh fund information
		invalidate('data:residence');
	}

	async function handleJoin(data) {
		invalidate('data:residence');
	}
</script>

<aside>
	<SocietyCard {society} />
</aside>

<ResidenceDetails {residence} {isMember} {society} />

<aside>
	<nav>
		<ul>
			{#if isAdmin || isMember}
				<li>
					<Anchor href={`/update/residences/${id}`} title={$_('menu.update.residences')} isButton>
						{$_('menu.update.residences')}
					</Anchor>
				</li>
			{/if}
			{#if isAdmin}
				<li>
					<Anchor href={`/delete/residences/${id}`} title={$_('common.delete')} isButton>
						{$_('common.delete')}
					</Anchor>
				</li>
			{/if}
			{#if !isMember}
				<li>
					<ResidenceJoin
						residenceId={id}
						societyId={residence.societyId}
						{isMember}
						onJoin={handleJoin}
					/>
				</li>
			{/if}
		</ul>
	</nav>
</aside>

<section>
	<header>
		<h2>
			{$_('pages.funds')}
		</h2>
	</header>
	<FundCard {total} {currency} />
</section>

{#if isMember || isAdmin}
	<section>
		<MaintenancesList {maintenances} {society} {residence} />
	</section>

	{#if latestActiveMaintenance}
		<section>
			<MaintenancePaymentForm
				maintenance={latestActiveMaintenance}
				residenceId={id}
				onSuccess={onMaintenancePaymentSuccess}
			/>
		</section>
	{/if}

	<section>
		<MaintenancePaymentList payments={maintenancePayments} {society} />
	</section>
{/if}
