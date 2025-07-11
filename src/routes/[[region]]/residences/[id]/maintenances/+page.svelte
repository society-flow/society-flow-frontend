<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { api } from '$lib/api.svelte.js';
	import MaintenancesList from '$lib/components/maintenances/list.svelte';
	import MaintenancePaymentForm from '$lib/components/maintenances/payment-form.svelte';
	import MaintenancePaymentList from '$lib/components/maintenances/payment-list.svelte';

	let { data } = $props();
	const { residence, fund, society, isMember, isAdmin, maintenances, maintenancePayments } =
		$derived(data);

	const latestActiveMaintenance = $derived(() => {
		return maintenances.find((m) => m.isCurrent) || null;
	});

	function onUpdate() {
		invalidate('data:residence');
	}
</script>

{#if isMember || isAdmin}
	<!-- <header> -->
	<!-- 	<h2>{$_('menu.maintenances')}</h2> -->
	<!-- </header> -->

	{#if latestActiveMaintenance}
		<section>
			<MaintenancePaymentForm
				maintenance={latestActiveMaintenance}
				residenceId={residence?.id}
				onSuccess={onUpdate}
			/>
		</section>
	{/if}

	<section>
		<MaintenancesList {maintenances} />
	</section>

	<section>
		<MaintenancePaymentList payments={maintenancePayments} {society} />
	</section>
{/if}
