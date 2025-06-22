<script lang="javascript">
  import { locale } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { createEventDispatcher } from 'svelte';
	import L from 'leaflet';

	const {
    mapId = Date.now().toString(),
	  markers = [],
	  center = [0, 0],
	  zoom = 2,
	  selectMode = false
  } = $props();

  console.log("markers received", markers)

	const dispatch = createEventDispatcher();
	let map;
	let markerGroup;
	let newMarker;

	function getCssVar(name) {
		return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
	}

	function createIcon(color) {
		const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <circle cx="12" cy="12" r="10" fill="${color}" stroke="white" stroke-width="2"/>
    </svg>`;
		return L.icon({
			iconUrl: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`,
			iconSize: [24, 24],
			iconAnchor: [12, 12]
		});
	}

		function setup(node) {
			const fill = getCssVar('--c-fg');
			const fillNew = getCssVar('--c-link');
			map = L.map(node).setView(center, zoom);

			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution: '&copy; OpenStreetMap contributors'
			}).addTo(map);

			// draw initial markers
			const valid = markers.filter(m => m.coordinates && m.title);
			markerGroup = L.featureGroup(
				valid.map(({ coordinates: [lat, lon], title, href }) => {
          const popup = href ? `<a href="${base + "/" + locale + href}">${title}</a>` : title
					return L.marker([lat, lon], { icon: createIcon(fill), title }).bindPopup(popup)
        })
			).addTo(map);
			if (valid.length) {
				map.fitBounds(markerGroup.getBounds().pad(0.2));
			}

			// click-to-select marker placement
			if (selectMode) {
				map.on('click', (e) => {
					const { lat, lng } = e.latlng;
					dispatch('mapClick', { lat, lng });
					if (newMarker) map.removeLayer(newMarker);
					newMarker = L.marker([lat, lng], { icon: createIcon(fillNew), title: 'New Position' })
						.addTo(map)
						.bindPopup(`Selected: ${lat.toFixed(4)}, ${lng.toFixed(4)}`)
						.openPopup();
				});
			}

			// cleanup on destroy
			return { destroy() { map.remove(); } };
		}
</script>

<div id={mapId} class="Map" use:setup></div>

<style>
	.Map {
		width: 100%;
		height: 35dvh;
    z-index: 1;
	}
</style>
