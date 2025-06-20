<script>
	import { _ } from 'svelte-i18n';
	import Anchor from '$lib/components/anchor.svelte';
	export let advert = {};
</script>

<header>
	<h1>
		<Anchor href={`/ads/${advert.id}`}>{advert.adTitle || advert.id}</Anchor>
	</h1>
</header>

<main>
	<p><strong>{$_('ads.details.description')}:</strong> {advert.adDescription}</p>
</main>
