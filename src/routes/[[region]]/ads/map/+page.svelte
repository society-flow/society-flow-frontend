<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import { page } from '$app/state';
	import { api } from '$lib/api.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import Map from '$lib/components/map.svelte';
	import Anchor from '$lib/components/anchor.svelte';

	const typeId = $derived(page.url.searchParams.get('type'));

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

	let adTypeOptions = $state([]);
	$effect(async () => {
		if (adTypeOptions.length === 0) {
			adTypeOptions = await api.getAllAdTypes();
		}
	});

	const markers = $derived(
		adverts.map((a) => ({
			coordinates: [a.approxGeoCoordinate.x, a.approxGeoCoordinate.y],
			title: a.title || a.id,
			href: `/ads/${a.id}`
		}))
	);
</script>

<Page title={$_('menu.map')} isFull>
	<details>
		<summary>
			{$_('components.ads.form.type')}
		</summary>
		<nav>
			{#each adTypeOptions as option}
				<Anchor href={`/ads/map?type=${option.id}`} isButton disabled={option.id === typeId}
					>{$_(`const.ads_types.${option.name}`)}</Anchor
				>
			{/each}
		</nav>
	</details>

	<Map {markers} />
</Page>

<style>
	:global(.Map) {
		flex-grow: 1;
	}
</style>
