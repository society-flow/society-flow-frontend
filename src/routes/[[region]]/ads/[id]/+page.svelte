<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { api } from '$lib/api.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import Map from '$lib/components/map.svelte';
	import Anchor from '$lib/components/anchor.svelte';

	const id = $derived($page.params.id);
	let advert = $state({});
	let markers = $derived(
		advert?.approxGeoCoordinate
			? [
					{
						coordinates: [advert.approxGeoCoordinate.x, advert.approxGeoCoordinate.y],
						title: advert.id
					}
				]
			: []
	);
	let mapId = $derived(`advert-${advert.id}`);

	$effect(async () => {
		if (id) {
			advert = await api.getAdvertisementById(id);
		}
	});
</script>

<Page title={`${advert?.title} — ${$_('menu.adverts')}`}>
	{#snippet header()}
		<h1>
			{$_('menu.adverts')}
		</h1>
	{/snippet}

	<article class="Detail">
		<header>
			<h1>
				<Anchor href={`/ads/${id}`}>
					{advert?.title || id}
				</Anchor>
			</h1>
		</header>

		<main>
			<p>{advert?.adDescription}</p>
		</main>

		{#if markers.length}
			<aside>
				<Map {mapId} {markers} />
			</aside>
		{/if}

		<footer>
			<nav>
				<Anchor href={`/ads`}>← {$_('menu.adverts')}</Anchor>
			</nav>
		</footer>
	</article>
</Page>
