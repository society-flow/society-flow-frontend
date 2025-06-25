<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { api } from '$lib/api.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import MaintenanceForm from '$lib/components/maintenances/form.svelte';

	const id = $derived($page.params.id);

	let maintenance = $state(null);

	$effect(async () => {
		if (id) {
			maintenance = await api.getMaintenanceById(id);
		}
	});
</script>

<Page title={$_('menu.update.maintenances')}>
	{#if maintenance}
		<MaintenanceForm {maintenance} />
	{/if}
</Page>
