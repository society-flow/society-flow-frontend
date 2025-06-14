<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { api } from '$lib/api.svelte.js';
	import { userState } from '$lib/states/user.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import Map from '$lib/components/map.svelte';
	import Anchor from '$lib/components/anchor.svelte';

	const id = $derived($page.params.id);
	let advert = $state({});
	let markers = $derived(
		advert?.approxGeoCoordinate
			? [
					{
						coordinates: [advert.approxGeoCoordinate.x, advert.approxGeoCoordinate.y],
						title: advert.id
					}
				]
			: []
	);

	let isOwner = $derived(advert?.userId === userState?.user?.id);

	$effect(async () => {
		if (id) {
			advert = await api.getAdvertisementById(id);
		}
	});
</script>

<Page title={`${advert?.title} — ${$_('menu.adverts')}`}>
	{#snippet header()}
		<h1>
			{$_('menu.adverts')}
		</h1>
	{/snippet}

	<article class="Detail">
		<header>
			<h1>
				<Anchor href={`/ads/${id}`}>
					{advert?.title || id}
				</Anchor>
			</h1>
		</header>

		{#if isOwner}
			<aside>
				<nav>
					<li>
						<Anchor href={`/update/ads/${id}`} title={$_('menu.update.ads')} isButton>
							{$_('menu.update.ads')}
						</Anchor>
					</li>
				</nav>
			</aside>
		{/if}

		<main>
			<p>{advert?.adDescription}</p>
		</main>

		{#if markers.length}
			<aside>
				<Map {markers} />
			</aside>
		{/if}
	</article>

	{#snippet footer()}
		<nav>
			<li>
				<Anchor href={`/ads`}>← {$_('menu.adverts')}</Anchor>
			</li>
		</nav>
	{/snippet}
</Page>
