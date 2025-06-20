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

<Page title={`${advert?.adTitle || advert?.id} — ${$_('menu.ads')}`} showHeader={false}>
	<article class="Detail">
		{#if isOwner}
			<aside>
				<nav>
					<li>
						<Anchor href={`/update/ads/${id}`} title={$_('menu.update.ads')} isButton>
							{$_('menu.update.ads')}
						</Anchor>
					</li>
					<li>
						<Anchor
							href={`/delete/ads/${id}`}
							title={$_('common.delete')}
							isButton
							data-type="error"
						>
							{$_('common.delete')}
						</Anchor>
					</li>
				</nav>
			</aside>
		{/if}
		<header>
			<h1>
				<Anchor href={`/ads/${id}`}>
					{advert?.adTitle || id}
				</Anchor>
			</h1>
		</header>

		{#if markers.length}
			<aside>
				<Map {markers} />
			</aside>
		{/if}

		<main>
			<p>{advert?.adDescription}</p>
		</main>
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
