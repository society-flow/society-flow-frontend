<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { api } from '$lib/api.svelte.js';
	import MaintenanceList from '$lib/components/maintenances/list.svelte';

	const id = $derived($page.params.id);

	let maintenances = $state([]);

	$effect(async () => {
		if (id) {
			const residence = await api.getResidenceById(id);
			if (residence.societyId) {
				maintenances = await api.getAllMaintenances(residence.societyId, id);
			}
		}
	});
</script>

<section>
	<header>
		<h2>{$_('menu.maintenances')}</h2>
	</header>
	<MaintenanceList {maintenances} />
</section>
