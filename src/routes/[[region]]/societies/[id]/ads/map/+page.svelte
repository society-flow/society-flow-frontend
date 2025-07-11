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

<Map {markers} />

<style>
  :global(.Map) {
    flex-grow: 1;
  }
</style>
