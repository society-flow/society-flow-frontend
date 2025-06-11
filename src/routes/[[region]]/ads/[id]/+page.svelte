<script>
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	// import { api } from '$lib/api.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import Map from '$lib/components/map.svelte';
	import Anchor from '$lib/components/anchor.svelte';

	const id = $derived($page.params.id);
	let advert = $state({});
	let markers = $derived(advert ? [advert] : []);
	let mapId = $derived(`advert-${advert.id}`);

	$effect(() => {
		if (id) {
			// api.getAdvert(Number(id)).then((ad) => {
			// 	advert = ad;
			// });
		}
	});
</script>

<Page title={`${advert?.name} — ${$_('menu.adverts')}`}>
	{#snippet header()}
		<h1>
			{$_('menu.adverts')}
		</h1>
	{/snippet}

	<article class="Detail">
		<header>
			<h1>
				<Anchor href={`/ads/${id}`}>
					{advert?.name}
				</Anchor>
			</h1>
		</header>

		<main>
			<p>{advert?.description}</p>
		</main>

		<aside>
			<Map {mapId} {markers} />
		</aside>

		<footer>
			<nav>
				<Anchor href={`/ads`}>← {$_('menu.adverts')}</Anchor>
			</nav>
		</footer>
	</article>
</Page>
