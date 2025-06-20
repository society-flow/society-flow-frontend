<script lang="javascript">
   import Map from '$lib/components/map.svelte';
   import { _ } from 'svelte-i18n';
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
       {$_('components.mapPicker.selectedPosition')} {selected.lat.toFixed(4)}, {selected.lng.toFixed(4)}
   </div>
{/if}
