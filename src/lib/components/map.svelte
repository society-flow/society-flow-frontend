<script lang="javascript">
	import { onDestroy } from 'svelte';
	import L from 'leaflet';

	const { mapId, markers = [] } = $props();

	let mapLeaflet;

	function getCssVariable(name) {
		return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
	}

	function createSvgIcon(color) {
		const svg = `
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
				<circle cx="12" cy="12" r="10" fill="${color}" stroke="white" stroke-width="2"/>
			</svg>
		`;
		return L.icon({
			iconUrl: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`,
			iconSize: [24, 24],
			iconAnchor: [12, 12]
		});
	}

	const setupMap = (node) => {
    $effect(() => {
			const fillColor = getCssVariable('--c-link') || '#007bff';

		  mapLeaflet = L.map(node).setView([0, 0], 2); // default view

		  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			  attribution: '&copy; OpenStreetMap contributors'
		  }).addTo(mapLeaflet);

		  const validMarkers = markers.filter((m) => m.map?.coordinates);

		  if (validMarkers.length) {
			  const markerGroup = L.featureGroup(
	        validMarkers.map(({ map, name }) => {
		        const [lon, lat] = map.coordinates;
		        return L.marker([lat, lon], {
			        icon: createSvgIcon(fillColor),
			        title: name
		        }).bindPopup(name).openPopup();
	        })
        ).addTo(mapLeaflet);


			  mapLeaflet.fitBounds(markerGroup.getBounds().pad(0.2));
		  }

			return () => {
				mapLeaflet.remove();
				mapLeaflet = null;
			};
		});
	};
</script>

<div id={mapId} class="map" use:setupMap></div>

<style>
	.map {
		width: 100%;
		height: 35dvh;
	}
</style>
