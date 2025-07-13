<script>
	import { _ } from 'svelte-i18n';
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import { api } from '$lib/api.svelte.js';
	import MaintenanceList from '$lib/components/maintenances/list.svelte';
	import Anchor from '$lib/components/anchor.svelte';
	import { getCurrentYearMonth, generateYearMonthOptions } from '$lib/utils/yearMonth.js';
	import { IconCalculator } from 'obra-icons-svelte';

	const id = $derived($page.params.id);
	const { data } = $props();
	const { userRole, maintenances, society } = $derived(data);

	let triggering = $state(false);
	let selectedYearMonth = $state(getCurrentYearMonth());

	const yearMonthOptions = generateYearMonthOptions();

	async function triggerMaintenanceCalculation() {
		triggering = true;

		try {
			await api.triggerSocietyMaintenanceCalculation(id, selectedYearMonth);
		} catch (error) {
			console.error($_('pages.maintenances.calculationFailed'), error);
		} finally {
			triggering = false;
			invalidate('data:society/maintenances');
		}
	}
</script>

<section>
	<header>
		<h2>{$_('menu.maintenances')}</h2>
		{#if userRole}
			<nav>
				<ul>
					<li>
						<select bind:value={selectedYearMonth}>
							{#each yearMonthOptions as option}
								<option value={option.value}>{option.label}</option>
							{/each}
						</select>
					</li>
					<li>
						<button onclick={triggerMaintenanceCalculation} disabled={triggering}>
							{$_('pages.societies.detail.triggerCalculations')}
							<IconCalculator />
						</button>
					</li>
				</ul>
			</nav>
		{/if}
	</header>
	<MaintenanceList {maintenances} {society} />
</section>
