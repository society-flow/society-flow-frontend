<script>
	import { _, locale } from 'svelte-i18n';
	import { api } from '$lib/api.svelte.js';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Map from '$lib/components/map.svelte';
	import Anchor from '$lib/components/anchor.svelte';
	import Error from '$lib/components/error.svelte';
	import SocietyDetails from '$lib/components/societies/details.svelte';
	import SocietyJoin from '$lib/components/societies/join.svelte';

	requiresAuth(locale);

	const { data } = $props();
	const { society,  userRole } = data;
	const id = society.id;

	const markers = $derived(
		society?.geoCoordinate
			? [
				{
					coordinates: [society.geoCoordinate.x, society.geoCoordinate.y],
					title: society.name || society.id
				}
			]
		: []
	);
</script>

<SocietyDetails {society} {userRole} />

{#if markers.length}
	<aside>
		<Map {markers} />
	</aside>
{/if}
