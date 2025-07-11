<script>
	import { _, locale } from 'svelte-i18n';
	import { invalidate } from '$app/navigation';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Anchor from '$lib/components/anchor.svelte';
	import { IconMap, IconUnorderedList, IconAdd } from 'obra-icons-svelte';

	requiresAuth(locale);

	const { children, data } = $props();
	const { society } = $derived(data);
	const id = $derived(society.id);
</script>

<div>
	<header>
		<nav class="Nav">
			<ul>
				<li>
					<Anchor href={`/societies/${id}/ads`} title={$_('menu.ads')}>
						<IconUnorderedList />
					</Anchor>
				</li>
				<li>
					<Anchor href={`/societies/${id}/ads/map`} title={$_('menu.map')}>
						<IconMap />
					</Anchor>
				</li>
				<li>
					<Anchor href={`/create/ads?society=${id}`} title={$_('menu.create.ads')} isButton>
						<IconAdd />
					</Anchor>
				</li>
			</ul>
		</nav>
	</header>

	{@render children()}
</div>

<style>
	div {
		flex-grow: 1;
    display: flex;
    flex-direction: column;
	}
</style>

