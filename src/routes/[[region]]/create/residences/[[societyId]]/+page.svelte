<script lang="javascript">
	import { _, locale } from 'svelte-i18n';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import CreateResidence from '$lib/components/residences/create.svelte';
	import { page } from '$app/stores';

	const societyId = $derived($page.params.societyId);

	requiresAuth(locale);

	function handleResidenceCreated(newResidence) {
		console.log('New Residence', newResidence);
		// Optionally handle UI updates or navigation after creation
	}
</script>

<Page title={$_('menu.create.residences')}>
	{#snippet header()}
		<div class="header-content">
			<h1>{$_('menu.create.residences')}</h1>
		</div>
	{/snippet}

	<section>
		<CreateResidence onSuccess={handleResidenceCreated} {societyId} />
	</section>
</Page>
