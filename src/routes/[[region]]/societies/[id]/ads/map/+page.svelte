<script>
	import Map from '$lib/components/map.svelte';

	const { data } = $props();
	const { adverts } = $derived(data);

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

<aside>
	<Map {markers} />
</aside>

<style>
	aside {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		:global(.Map) {
			flex-grow: 1;
		}
	}
</style>
