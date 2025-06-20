<script>
	import { _ } from 'svelte-i18n';
	import Anchor from '$lib/components/anchor.svelte';
	export let advert = {};
</script>

<header>
	<h1>
		<Anchor href={`/ads/${advert.id}`}>{advert.title || advert.id}</Anchor>
	</h1>
</header>

<main>
	{advert.adDescription}
</main>
