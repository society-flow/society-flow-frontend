<script>
	import { _ } from 'svelte-i18n';
</script>

<svelte:head>
	<title>{$_('menu.about')}</title>
</svelte:head>

<header>
	<h1>{$_('menu.about')}</h1>
</header>

<section>
	<p>
		Different countries with same problem: Hidden expense management without clear visibility of
		costs and funds.
	</p>

	<p>
		Out goal is to provide detailed breakup of dynamically calculated monthly pricing to your
		knowledge.
	</p>

	<p>
		We do feel strongly that expense reduced or increased should make the contributions vary, not
		fixed. Also, different expenses need different way of distribution across residences.
	</p>

	<p>
		Along the way, our system allows you to create or find geo located ads from valid member of
		users, bypassing middle men. Next time reach out peer to peer for any services within your area
		of interest without overpaying!
	</p>
</section>

<style>
	section {
		/* max-width: var(--s-container); */
    font-style: italic;
    font-size: 1.3rem;
    line-height: 1.5;
	}
</style>
