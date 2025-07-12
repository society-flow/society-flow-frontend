<script>
	import { _ } from 'svelte-i18n';
    import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import { api } from '$lib/api.svelte.js';
	import MaintenanceList from '$lib/components/maintenances/list.svelte';
	import Anchor from '$lib/components/anchor.svelte';

	const id = $derived($page.params.id);
	const { data } = $props();
	const { userRole, maintenances, society } = $derived(data);

	let triggering = $state({});
	async function triggerMaintenanceCalculation() {
		const currentDate = new Date();
		const yearMonth = parseInt(
			`${currentDate.getFullYear()}${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`
		);

		triggering = true;

		try {
			await api.triggerSocietyMaintenanceCalculation(id, yearMonth);
			// You could add a success notification here
		} catch (error) {
			console.error($_('pages.maintenances.calculationFailed'), error);
			// You could add an error notification here
		} finally {
			triggering = false;
      invalidate("data:society/maintenances")
		}
	}
</script>

<section>
	<header>
		<h2>{$_('menu.maintenances')}</h2>

		{#if userRole}
			<nav>
				<li>
					<button onclick={triggerMaintenanceCalculation}>
						{$_('pages.societies.detail.triggerCalculations')}
					</button>
				</li>
			</nav>
		{/if}
	</header>
	<MaintenanceList {maintenances} {society} />
</section>
