<script lang="javascript">
	import { _, locale } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import { api } from '$lib/api.svelte.js';
	import { userState } from '$lib/states/user.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import MaintenanceForm from '$lib/components/maintenances/form.svelte';

	let societies = $state([]);
	let residences = $state([]);
	let societyId = $state($page.url.searchParams.get('societyId') || '');
	let residenceId = $state($page.url.searchParams.get('residenceId') || '');

	$effect(async () => {
		if (userState.user?.id) {
			societies = await api.getUserSocieties();
		}
	});

	$effect(async () => {
		if (societyId) {
			residences = await api.getAllResidencesInSociety(societyId);
		}
	});

	async function onSocietyChange(newSocietyId) {
		societyId = newSocietyId;
		if (societyId) {
			residences = await api.getAllResidencesInSociety(societyId);
		} else {
			residences = [];
		}
	}

	async function onSuccess(res) {
    console.log("res",res)
		setTimeout(() => goto(`${base}/${$locale}/societies/${res.societyId}/maintenances`), 0);
	}
</script>

<Page title={$_('menu.create.maintenances')}>
	<MaintenanceForm
		maintenance={{ societyId, residenceId }}
		{societies}
		{residences}
		{onSocietyChange}
		{onSuccess}
	/>
</Page>
