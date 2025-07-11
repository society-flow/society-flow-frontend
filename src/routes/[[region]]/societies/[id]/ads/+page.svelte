<script>
	import { _, locale } from 'svelte-i18n';
	import { page } from '$app/stores';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import AdsList from '$lib/components/ads/list.svelte';

	requiresAuth(locale);

	const { data } = $props();
	const { adverts: ads } = $derived(data);
	const id = $derived($page.params.id);
</script>

<section>
	<header>
		<h2>{$_('menu.ads')}</h2>
	</header>
	<AdsList {ads} />
</section>

<style>
	header {
		/* for SEO */
		display: none;
	}
</style>
