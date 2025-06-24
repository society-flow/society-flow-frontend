<script>
	import { locale } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { createEventDispatcher } from 'svelte';
	import L from 'leaflet';

	// Props via Runes $props()
	const {
		mapId = Date.now().toString(),
		markers = [],
		center = [0, 0],
		zoom = 2,
		selectMode = false
	} = $props();

	const dispatch = createEventDispatcher();
	let map;
	let markerGroup;
	let newMarker;

	// Derive only the valid markers
	const validMarkers = $derived(markers.filter((m) => m.coordinates && m.title));

	function getCssVar(name) {
		return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
	}

	function createIcon(color) {
		const svg =
			`<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\">` +
			`<circle cx=\"12\" cy=\"12\" r=\"10\" fill=\"${color}\" stroke=\"white\" stroke-width=\"2\"/>` +
			`</svg>`;
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
			attribution: '&copy; OpenStreetMap contributors',
      className: 'Map-tiles'
		}).addTo(map);

		// Create an empty feature group container
		markerGroup = L.featureGroup().addTo(map);

		// Click-to-select marker logic
		if (selectMode) {
			map.on('click', (e) => {
				const { lat, lng } = e.latlng;
				dispatch('mapClick', { lat, lng });
				if (newMarker) map.removeLayer(newMarker);
				newMarker = L.marker([lat, lng], {
					icon: createIcon(fillNew),
					title: 'New Position'
				})
					.addTo(map)
					.bindPopup(`Selected: ${lat.toFixed(4)}, ${lng.toFixed(4)}`)
					.openPopup();
			});
		}

		return {
			destroy() {
				map.remove();
			}
		};
	}

	// Redraw markers whenever validMarkers change
	$effect(() => {
		if (!map) return;

		markerGroup.clearLayers();

		const fill = getCssVar('--c-link');
		for (const {
			coordinates: [lat, lon],
			title,
			href
		} of validMarkers) {
			const popup = href ? `<a href=\"${base}/${$locale}${href}\">${title}</a>` : title;
			L.marker([lat, lon], { icon: createIcon(fill), title })
				.addTo(markerGroup)
				.bindPopup(popup);
		}

		if (validMarkers.length) {
			map.fitBounds(markerGroup.getBounds().pad(0.2));
		}
	});
</script>

<div id={mapId} class="Map" use:setup></div>

<style>
	.Map {
    --map-tiles-filter: brightness(0.6) invert(1) contrast(3) hue-rotate(200deg) saturate(0.3) brightness(0.7);
		width: 100%;
		height: 35dvh;
		z-index: 1;
    border: 1px solid var(--c-border);
    border-radius: var(--border-radius);
    :global(.leaflet-popup-content a) {
      color: var(--c-link);
    }
    :global(.leaflet-popup-content) {
      color: var(--c-fg);
    }
    :global(.leaflet-popup-content-wrapper, .leaflet-popup-tip) {
      background: var(--c-bg);
    }
    :global(.leaflet-popup a.leaflet-popup-close-button) {
      color: var(--c-fg);
    }
    @media (prefers-color-scheme: dark) {
      :global(.Map-tiles) {
        filter:var(--map-tiles-filter, none);
	    }
    }
	}
</style>
