<script>
	import Anchor from '$lib/components/anchor.svelte';
	import { _ } from 'svelte-i18n';
	import { api } from '$lib/api.svelte.js';
</script>

<nav class="Ads-nav">
	<Anchor href="/ads">{$_('menu.ads')}</Anchor>
	<Anchor href="/ads/map">{$_('menu.map')}</Anchor>
	<Anchor href="/create/ads" isButton>{$_('menu.create.ads')}</Anchor>
</nav>

<slot />
