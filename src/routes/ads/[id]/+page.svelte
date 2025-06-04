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
<article>
	<header>
		<h1>
			<a href={`${base}/ads/${id}`}>
				{advert.name}
			</a>
		</h1>
	</header>

	<main>
		<p>
			{advert.description}
		</p>
	</main>
	<footer>
		<nav>
			<a href={`${base}/ads`}> ← {$_('menu.adverts')}</a>
		</nav>
	</footer>
</article>

<style>
	article {
		width: 100%;
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
    nav a {
      display: inline-block;
      padding: var(--s);
    }
  }
</style>
