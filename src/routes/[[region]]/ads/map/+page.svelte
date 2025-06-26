<script>
	import { _ } from 'svelte-i18n';
	import { page } from '$app/state';
	import { api } from '$lib/api.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import Map from '$lib/components/map.svelte';
	import Anchor from '$lib/components/anchor.svelte';

	const { data } = $props();
	const typeId = $derived(page.url.searchParams.get('type'));
	const { adTypes } = $derived(data);

	let adverts = $state([]);
	$effect(async () => {
		let ads;
		if (typeId) {
			ads = await api.getAllAdvertisements({ typeId, isActive: true });
		} else {
			ads = await api.getAllAdvertisements({
				isActive: true
			});
		}
		adverts = ads.filter((a) => a?.approxGeoCoordinate?.x || a?.approxGeoCoordinate?.y);
	});

	const selectedType = $derived(adTypes.find(({ id }) => id === typeId));

	const markers = $derived(
		adverts.map((a) => ({
			coordinates: [a.approxGeoCoordinate.x, a.approxGeoCoordinate.y],
			title: a.title || a.id,
			href: `/ads/${a.id}`
		}))
	);
</script>

<details>
	<summary>
		{$_('components.ads.form.type')}
		{#if selectedType}
			({$_(`const.ads_types.${selectedType.name}`)})
		{/if}
	</summary>
	<nav>
		{#each adTypes as option}
			<Anchor href={`/ads/map?type=${option.id}`} isActive={option.id === typeId}
				>{$_(`const.ads_types.${option.name}`)}</Anchor
			>
		{/each}
	</nav>
</details>

<Map {markers} />

<style>
	:global(.Map) {
		flex-grow: 1;
	}
</style>
