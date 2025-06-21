<script>
	import Anchor from '$lib/components/anchor.svelte';
	import { _ } from 'svelte-i18n';
</script>

<nav class="Ads-nav">
	<Anchor href="/ads" isButton>{$_('menu.ads')}</Anchor>
	<Anchor href="/ads/map" isButton>{$_('menu.map')}</Anchor>
	<Anchor href="/create/ads" isButton>{$_('menu.create.ads')}</Anchor>
</nav>

<slot />
