<script>
	import { _ } from 'svelte-i18n';
	import { page } from '$app/state';
	import { api } from '$lib/api.svelte.js';
	import Anchor from '$lib/components/anchor.svelte';
	import Icon from '$lib/components/icon.svelte';
	import Page from '$lib/components/routes/page.svelte';

	const { children } = $props();
	const isMap = $derived(page.url.pathname.split('/').pop() === 'map');
	const isDetailPage = $derived(page.params.id);
</script>

{#if !isDetailPage}
	<Page title={isMap ? `${$_('menu.ads')} — ${$_('menu.map')}` : $_('menu.ads')} isFull={isMap}>
		{#snippet nav()}
			<li>
				<Anchor href="/ads" title={$_('menu.ads')}>
					<Icon icon="unordered-list" />
				</Anchor>
			</li>
			<li>
				<Anchor href="/ads/map" title={$_('menu.map')}>
					<Icon icon="map" />
				</Anchor>
			</li>
			<li>
				<Anchor href="/create/ads" isButton title={$_('menu.create.ads')}>
					<Icon icon="add" />
				</Anchor>
			</li>
		{/snippet}
		{@render children()}
	</Page>
{:else}
	{@render children()}
{/if}
