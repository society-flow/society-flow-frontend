<script lang="javascript">
	import Map from '$lib/components/map.svelte';
	const { initialMarkers = [], onselect = () => {} } = $props();

  let selected = $state(null)

	function onMapClick(event) {
		selected = event.detail;
		onselect(selected);
	}
</script>

<Map markers={initialMarkers} selectMode={true} on:mapClick={onMapClick} />

{#if selected}
	<div>
		Selected Position: {selected.lat.toFixed(4)}, {selected.lng.toFixed(4)}
	</div>
{/if}
