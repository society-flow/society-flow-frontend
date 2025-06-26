<script>
	import { _ } from 'svelte-i18n';
	import { page } from '$app/state';
	import { api } from '$lib/api.svelte.js';
	import Anchor from '$lib/components/anchor.svelte';
	import Page from '$lib/components/routes/page.svelte';

	const { children } = $props();
	const isMap = $derived(page.url.pathname.split('/').pop() === 'map');
	const isDetailPage = $derived(page.params.id);
</script>

{#if !isDetailPage}
	<Page title={isMap ? `${$_('menu.ads')} — ${$_('menu.map')}` : $_('menu.ads')} isFull={isMap}>
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
{:else}
	{@render children()}
{/if}
