<script>
	import { _ } from 'svelte-i18n';
	import { page } from '$app/stores';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import Anchor from '$lib/components/anchor.svelte';

	requiresAuth(page);

	const { children, data } = $props();
	const { residence, isMember } = $derived(data);
	const id = $derived(residence.id);
</script>

<Page
	title={residence?.residenceName || $_('menu.residences')}
	headTitle={`${residence?.residenceName || residence?.id} — ${$_('menu.residences')}`}
	showHeader={!!residence?.residenceName}
>
	{#snippet nav()}
		<ul>
			<li>
				<Anchor href={`/residences/${id}`}>
					{residence.residenceName}
				</Anchor>
			</li>
			<li>
				<Anchor href={`/residences/${id}/expenses`}
					>{$_('pages.residences.detail.myExpenseDues')}</Anchor
				>
			</li>
			<li>
				<Anchor href={`/residences/${id}/members`}>{$_('pages.residences.detail.members')}</Anchor>
			</li>
			<li>
				<Anchor href={`/residences/${id}/maintenances`}>{$_('menu.maintenances')}</Anchor>
			</li>
		</ul>
	{/snippet}

	<article class="Detail">
		{@render children()}
	</article>
</Page>
