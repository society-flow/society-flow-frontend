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

<section>
	<h1>
		<a href={`${base}/ads`}> ← {$_('menu.adverts')}</a>
	</h1>
</section>

<article>
	<header>
		<h2>
			<a href={`${base}/ads/${id}`}>
				{advert.name}
			</a>
		</h2>
	</header>

	<main>
		<p>
			{advert.description}
		</p>
	</main>
</article>

<style>
	article {
		width: 100%;
		flex-grow: 1;
		max-width: var(--s-container);
	}
  :is(h1, h2) a {
      text-decoration: none;
  }
  :is(h2) a {
    background-color: var(--c-bg--secondary);
    padding: var(--s);
    border-radius: var(--border-radius);
  }
</style>
