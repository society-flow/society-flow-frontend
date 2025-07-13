<script lang="javascript">
   import Map from '$lib/components/map.svelte';
   import { _ } from 'svelte-i18n';
	const { latitude = null, longitude = null, title = '', onselect = () => {} } = $props();

  let selected = $state(null)

  const markers = $derived(
    latitude && longitude
      ? [
          {
            coordinates: [latitude, longitude],
            title: title || ''
          }
        ]
      : []
  );

	function onMapClick(event) {
		selected = event.detail;
		onselect(selected);
	}
</script>

<Map markers={markers} selectMode={true} on:mapClick={onMapClick} />

{#if selected}
   <div>
       {$_('components.mapPicker.selectedPosition')} {selected.lat.toFixed(4)}, {selected.lng.toFixed(4)}
   </div>
{/if}