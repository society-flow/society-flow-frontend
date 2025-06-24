<script>
	import Anchor from '$lib/components/anchor.svelte';
	import { _ } from 'svelte-i18n';
	import { api } from '$lib/api.svelte.js';
</script>

<nav class="Page-nav">
	<Anchor href="/ads" isButton>{$_('menu.ads')}</Anchor>
	<Anchor href="/ads/map" isButton>{$_('menu.map')}</Anchor>
	<Anchor href="/create/ads" isButton>{$_('menu.create.ads')}</Anchor>
</nav>

<slot />
