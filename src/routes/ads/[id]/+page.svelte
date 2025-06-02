<script lang="typescript">
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { api } from '$lib/api.svelte.js';

	const id = $derived($page.params.id);

	let advert = $state({});

	$effect(async () => {
		if (id) {
			advert = await api.getAdvert(Number(id));
		}
	});
</script>

<svelte:head>
	<title>{$_('menu.adverts')}</title>
</svelte:head>

<h1>{$_('menu.adverts')}</h1>

<p>id: {id}</p>

<p>
	<a href={`${base}/ads`}>← Back to all adverts</a>
</p>

<article>
	<header>
		<h2>{advert.name}</h2>
	</header>

	<main>
		<p>
			{advert.description}
		</p>
	</main>
</article>
