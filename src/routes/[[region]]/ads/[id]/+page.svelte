<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { api } from '$lib/api.svelte.js';
	import { userState } from '$lib/states/user.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import Map from '$lib/components/map.svelte';
	import Anchor from '$lib/components/anchor.svelte';
	import AdDetails from '$lib/components/ads/details.svelte';
	import SocietyCard from '$lib/components/societies/card.svelte';
	import ResidencyCard from '$lib/components/residences/card.svelte';

	const id = $derived($page.params.id);
	let advert = $state({});
	let residency = $state(null);
	let society = $state(null);

	let coordinates = $derived(advert?.approxGeoCoordinate);
	let selectedLocation = $derived(residency || society);
	let locationCoordinates = $derived(selectedLocation?.geoCoordinate || coordinates);

	let markers = $derived(
		locationCoordinates
			? [
					{
						coordinates: [locationCoordinates.x, locationCoordinates.y],
						title: selectedLocation?.name || advert.title || advert.id
					}
				]
			: []
	);

	let isOwner = $derived(advert?.userId === userState?.user?.id);

	$effect(async () => {
		if (id) {
			const res = await api.getAdvertisementById(id);

			if (res.societyId || res.residencyId) {
				try {
					if (res.residencyId) {
						residency = await api.getResidencyById(res.residencyId);
						society = null; // Clear society if residency is found
					} else if (res.societyId) {
						society = await api.getSocietyById(res.societyId);
						residency = null; // Clear residency if society is found
					}
				} catch (error) {
					console.error('Error fetching location data:', error);
				}
			}

			advert = res;
		}
	});
</script>

<Page title={`${advert?.title || advert?.id}`} showHeader={true}>
	<article class="Detail">
		<header>
			<nav>
				{#if isOwner}
					<li>
						<Anchor href={`/update/ads/${id}`} title={$_('menu.update.ads')}>
							{$_('menu.update.ads')}
						</Anchor>
					</li>
					<li>
						<Anchor href={`/delete/ads/${id}`} title={$_('common.delete')}>
							{$_('common.delete')}
						</Anchor>
					</li>
				{/if}
				<li>
					<Anchor href="#" title={$_('report')}>
						{$_('report')}
					</Anchor>
				</li>
				<li>
					<Anchor href="#" title={$_('contact')}>
						{$_('contact')}
					</Anchor>
				</li>
			</nav>
		</header>
		<AdDetails {advert} />

		{#if markers.length}
			<aside>
				<Map {markers} />
			</aside>
		{/if}

		{#if selectedLocation}
			<aside>
				{#if residency}
					<ResidencyCard {residency} />
				{:else if society}
					<SocietyCard {society} />
				{/if}
			</aside>
		{/if}
	</article>

	{#snippet footer()}
		<nav>
			<li>
				<Anchor href={`/ads`}>← {$_('menu.ads')}</Anchor>
			</li>
		</nav>
	{/snippet}
</Page>

<style>
	.Detail {
		main {
			white-space: pre-wrap;
		}
	}
</style>
