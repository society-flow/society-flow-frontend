<script>
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { api } from '$lib/api.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import Map from '$lib/components/map.svelte';
	import Anchor from '$lib/components/anchor.svelte';

	const id = $derived($page.params.id);
	let advert = $state({});
	let markers = $derived(advert ? [advert] : []);
	let mapId = $derived(`advert-${advert.id}`);

	$effect(() => {
		if (id) {
			api.getAdvert(Number(id)).then((ad) => {
				advert = ad;
			});
		}
	});
</script>

<Page title={`${advert?.name} — ${$_('menu.adverts')}`}>
	<article>
		<header>
			<h1>
				<Anchor href={`${base}/ads/${id}`}>
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
				<Anchor href={`${base}/ads`}>← {$_('menu.adverts')}</Anchor>
			</nav>
		</footer>
	</article>
</Page>

<style>
	article {
		width: 100%;
		max-width: var(--s-container);
	}
	main {
		background-color: var(--c-bg--secondary);
		padding: var(--s) calc(var(--s) * 2);
		margin: var(--s);
		border-radius: var(--border-radius);
		p:last-of-type {
			margin-bottom: 0;
		}
	}
	footer {
		nav :global(a) {
			display: inline-block;
			padding: var(--s);
		}
	}
</style>
