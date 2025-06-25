<script>
	import { _, locale } from 'svelte-i18n';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import Anchor from '$lib/components/anchor.svelte';

	requiresAuth(locale);

	const { children, data } = $props();
	const { society } = data;
	const id = $derived(society.id);
</script>

<aside>
	<nav>
		<ul>
			<li>
				<Anchor href={`/societies/${id}`}>
					{society.name}
				</Anchor>
			</li>
			<li>
				<Anchor href={`/societies/${id}/user-residences`}
					>{$_('pages.societies.detail.user_residences')}</Anchor
				>
			</li>
			<li>
				<Anchor href={`/societies/${id}/members`}>{$_('pages.societies.detail.members')}</Anchor>
			</li>
			<li><Anchor href={`/societies/${id}/residences`}>{$_('menu.residences')}</Anchor></li>
			<li><Anchor href={`/societies/${id}/expenses`}>{$_('menu.expenses')}</Anchor></li>
			<li><Anchor href={`/societies/${id}/ads`}>{$_('menu.ads')}</Anchor></li>
		</ul>
	</nav>
</aside>

<Page title={society?.name || $_('menu.societies')} showHeader={!!society?.name}>
	{@render children()}
</Page>
