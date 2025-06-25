<script>
	import Anchor from '$lib/components/anchor.svelte';
	import { _ } from 'svelte-i18n';
	import { api } from '$lib/api.svelte.js';

	const { children } = $props();
</script>

<nav class="Page-nav">
	<ul>
		<li>
			<Anchor href="/ads" isButton>{$_('menu.ads')}</Anchor>
		</li>
		<li>
			<Anchor href="/ads/map" isButton>{$_('menu.map')}</Anchor>
		</li>
		<li>
			<Anchor href="/create/ads" isButton>{$_('menu.create.ads')}</Anchor>
		</li>
	</ul>
</nav>

{@render children()}
