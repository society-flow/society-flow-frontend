<script>
	import { _, locale } from 'svelte-i18n';
	import { invalidate } from '$app/navigation';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Anchor from '$lib/components/anchor.svelte';

	requiresAuth(locale);

	const { children, data } = $props();
	const { society } = $derived(data);
	const id = $derived(society.id);
</script>

<section>
	<nav class="Page-nav">
		<ul>
			<li>
				<Anchor href={`/societies/${id}/ads`}>{$_('menu.ads')}</Anchor>
			</li>
			<li>
				<Anchor href={`/societies/${id}/ads/map`}>{$_('menu.map')}</Anchor>
			</li>
			<li>
				<Anchor href={`/create/ads?society=${id}`} isButton>
					{$_('menu.create.ads')}
				</Anchor>
			</li>
		</ul>
	</nav>
</section>

{@render children()}
