<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { api } from '$lib/api.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import ListAds from '$lib/components/ads/list.svelte';
	import Anchor from '$lib/components/anchor.svelte';

	let ads = $state([]);
	$effect(async () => {
		ads = await api.getAllAdvertisements();
	});
</script>

<Page title={$_('menu.adverts')}>
	{#snippet header()}
		<h1>{$_('menu.adverts')}</h1>
		<Anchor href="/create/ads" isButton>
			{$_('menu.create.ads')}
		</Anchor>
	{/snippet}
	<section>
		<ListAds {ads} />
	</section>
</Page>
