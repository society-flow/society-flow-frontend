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
	import RelativeDate from '$lib/components/date/relative.svelte';

	const id = $derived($page.params.id);
	let advert = $state({});
	let residency = $state(null);
	let society = $state(null);
	let adTypes = $state([]);

	let isOwner = $derived(advert?.userId === userState?.user?.id);
	let coordinates = $derived(advert?.approxGeoCoordinate);
	let selectedLocation = $derived(residency || society);
	let locationCoordinates = $derived(selectedLocation?.geoCoordinate || coordinates);
	let adOption = $derived(adTypes?.find((type) => advert?.type === type.id));

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

	$effect(async () => {
		if (adTypes.length === 0) {
			adTypes = await api.getAllAdTypes();
		}
	});

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

<Page title={`${advert?.title || advert?.id || $_('menu.ads')}`} showHeader={true}>
	<article class="Detail">
		<header>
			<nav>
				<ul>
					{#if isOwner}
						<li>
							<Anchor href={`/delete/ads/${id}`} title={$_('common.delete')} isButton>
								{$_('common.delete')}
							</Anchor>
						</li>
						<li>
							<Anchor href={`/update/ads/${id}`} title={$_('menu.update.ads')} isButton>
								{$_('menu.update.ads')}
							</Anchor>
						</li>
					{:else}
						<li>
							<Anchor href="#" title={$_('common.contact_user')} isButton>
								{$_('common.contact_user')}
							</Anchor>
						</li>
					{/if}
				</ul>
			</nav>
		</header>

		<aside>
			<nav>
				<ul>
					<li>
						{#if isOwner}
							<span>
								{#if advert.isActive}
									{$_('pages.ads.detail.isActive')}
								{:else}
									{$_('pages.ads.detail.isNotActive')}
								{/if}
							</span>
						{/if}
					</li>
					<li>
						<Anchor href={`/ads?type=${adOption?.id}`}>
							{$_(`const.ads_types.${adOption?.name}`)}
						</Anchor>
					</li>
					{#if advert.updatedAt && advert.updatedAt !== advert.createdAt}
						<li>
							<span>
								{$_('common.updated')}
								<RelativeDate date={advert.updatedAt} />
							</span>
						</li>
					{/if}
					{#if advert.createdAt}
						<li>
							<span>
								{$_('common.created')}
								<RelativeDate date={advert.createdAt} />
							</span>
						</li>
					{/if}
				</ul>
			</nav>
		</aside>

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
			<ul>
				<li>
					<Anchor href={`/ads`}>← {$_('menu.ads')}</Anchor>
				</li>
				<li>
					<Anchor href="#" title={$_('common.contact_admin')}>
						{$_('common.contact_admin')}
					</Anchor>
				</li>
			</ul>
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
