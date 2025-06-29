<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { api } from '$lib/api.svelte.js';
	import MaintenanceList from '$lib/components/maintenances/list.svelte';
	import Anchor from '$lib/components/anchor.svelte';

	const id = $derived($page.params.id);

	let maintenances = $state([]);

	$effect(async () => {
		if (id) {
			const residences = await api.getAllResidencesInSociety(id);
			const maintenancesByResidence = await Promise.all(
				residences.map((residence) => api.getAllMaintenances(id, residence.id))
			);
			maintenances = maintenancesByResidence.flat();
		}
	});
</script>

<section>
	<header>
		<h2>{$_('menu.maintenances')}</h2>
	</header>
	<MaintenanceList {maintenances} />
</section>
