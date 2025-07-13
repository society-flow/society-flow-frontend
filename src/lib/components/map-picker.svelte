<script>
	import Map from '$lib/components/map.svelte';
	import { _ } from 'svelte-i18n';

	const { initialMarkers = [], onselect = () => {}, zoom = 1 } = $props();

	let selected = $state(null);

	function onMapClick(event) {
		selected = event.detail;
		onselect(selected);
	}
</script>

<Map markers={initialMarkers} selectMode={true} on:mapClick={onMapClick} {zoom} />

<div>
	<span>
		{$_('menu.map')}:
	</span>
	{#if selected}
		{selected.lat.toFixed(4)}, {selected.lng.toFixed(4)}
	{/if}
</div>
