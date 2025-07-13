<script>
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
	import FormatDateRelative from '$lib/components/format/date-relative.svelte';
	import {
		IconSendAlt,
		IconMessageAlt,
		IconHashtag,
		IconCalendarSelectedDate,
		IconWatch
	} from 'obra-icons-svelte';

	const { data } = $props();
	const { advert, residency, society, adTypes, isAdmin } = $derived(data);
	const id = $derived($page.params.id);

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
</script>

<Page
	title={`${advert?.title || advert?.id || ''}`}
	headTitle={`${advert?.title || advert?.id} — ${$_('menu.ads')}`}
>
	<header>
		<nav>
			<ul>
				{#if advert.createdAt}
					<li>
						<IconCalendarSelectedDate />
						<strong>
							{$_('common.created')}
						</strong>
						<FormatDateRelative date={advert.createdAt} />
					</li>
				{/if}
				{#if advert.updatedAt}
					<li>
						<IconWatch />
						<strong>
							{$_('common.updated')}
						</strong>
						<FormatDateRelative date={advert.updatedAt} />
					</li>
				{/if}
			</ul>
		</nav>
		<nav>
			<ul>
				<li>
					{#if isAdmin}
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
					<Anchor href={`/ads?type=${adOption?.id}`} isButton>
						{$_(`const.ads_types.${adOption?.name}`)}
						<IconHashtag />
					</Anchor>
				</li>
				{#if advert.updatedAt && advert.updatedAt !== advert.createdAt}
					<li>
						<span>
							{$_('common.updated')}
							<FormatDateRelative date={advert.updatedAt} />
						</span>
					</li>
				{/if}
				{#if isAdmin}
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
							<IconSendAlt />
						</Anchor>
					</li>
				{/if}
				<li>
					<Anchor href="#" title={$_('common.contact_admin')} isButton>
						{$_('common.contact_admin')}
						<IconMessageAlt />
					</Anchor>
				</li>
			</ul>
		</nav>
	</header>

	<section>
		<AdDetails {advert} />
	</section>

	{#if selectedLocation}
		<aside>
			{#if residency}
				<ResidencyCard {residency} />
			{:else if society}
				<SocietyCard {society} />
			{/if}
		</aside>
	{/if}

	{#if markers.length}
		<aside>
			<Map {markers} />
		</aside>
	{/if}
</Page>

<style>
	:global(main) header:has(nav) {
		justify-content: center;
	}
	nav ul {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		/* gap: calc(var(--s) * 2); */
		li {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-wrap: wrap;
			gap: calc(var(--s) / 2);
			:global(time) {
				/* color: red; */
			}
		}
	}
</style>
