<script lang="javascript">
	import { _, locale } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { api } from '$lib/api.svelte.js';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import Anchor from '$lib/components/anchor.svelte';
	import ResidenceDetails from '$lib/components/residences/details.svelte';

	requiresAuth(locale);

	const id = $derived($page.params.id);

	let residence = $state({});

	$effect(async () => {
		if (id) {
			residence = await api.getResidenceById(id);
			console.log('residence', residence);
		}
	});
</script>

<Page title={$_('menu.residences')}>
	{#snippet header()}
		<h1>{$_('menu.residences')}</h1>
	{/snippet}
	<section>
		<header>
			<h2>{residence?.name}</h2>
		</header>

		<ResidenceDetails {residence} />
	</section>

	<section>
		<Anchor href={'/residences'}>← {$_('components.residences.details.back')}</Anchor>
	</section>
</Page>
