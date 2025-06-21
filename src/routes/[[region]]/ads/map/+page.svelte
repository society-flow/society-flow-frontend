<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import { api } from '$lib/api.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import Map from '$lib/components/map.svelte';
	import Anchor from '$lib/components/anchor.svelte';

	let adverts = $state([]);
	$effect(async () => {
		adverts = await api.getAllAdvertisements();
	});

	const markers = $derived(
		adverts
			.filter((a) => a?.approxGeoCoordinate?.x || a?.approxGeoCoordinate?.y)
			.map((a) => ({
				coordinates: [a.approxGeoCoordinate.x, a.approxGeoCoordinate.y],
				title: a.title || a.id,
				href: `/ads/${a.id}`
			}))
	);
</script>

<Page title={$_('menu.map')} isFull>
	{#if markers.length}
		<Map {markers} />
	{/if}
</Page>

<style>
	:global(.Map) {
		flex-grow: 1;
	}
</style>
