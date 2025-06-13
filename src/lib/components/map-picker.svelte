<script lang="javascript">
	import Map from '$lib/components/map.svelte';
	import { createEventDispatcher } from 'svelte';

	export let initialMarkers = [];
	export let selected = null;

	const dispatch = createEventDispatcher();

	function onMapClick(event) {
		selected = event.detail;
		dispatch('select', selected);
	}
</script>

<Map markers={initialMarkers} selectMode={true} on:mapClick={onMapClick} />

{#if selected}
	<div>
		Selected Position: {selected.lat.toFixed(4)}, {selected.lng.toFixed(4)}
	</div>
{/if}
