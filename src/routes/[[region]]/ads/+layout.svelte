<script>
	import { _ } from 'svelte-i18n';
	import { api } from '$lib/api.svelte.js';
	import Anchor from '$lib/components/anchor.svelte';
	import Page from '$lib/components/routes/page.svelte';

	const { children } = $props();
</script>

<Page title={$_('menu.ads')}>
	{#snippet nav()}
		<ul>
			<li>
				<Anchor href="/ads">{$_('menu.ads')}</Anchor>
			</li>
			<li>
				<Anchor href="/ads/map">{$_('menu.map')}</Anchor>
			</li>
			<li>
				<Anchor href="/create/ads">{$_('menu.create.ads')}</Anchor>
			</li>
		</ul>
	{/snippet}
	{@render children()}
</Page>
