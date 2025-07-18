<script>
	import { _ } from 'svelte-i18n';
	import { page } from '$app/stores';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Anchor from '$lib/components/anchor.svelte';
	import Icon from '$lib/components/icon.svelte';
	import Page from '$lib/components/routes/page.svelte';

	requiresAuth(page);

	const { children, data } = $props();
	const { residence, isMember, isAdmin } = $derived(data);
	const id = $derived(residence.id);
	console.log('isAdmin', isAdmin);
</script>

<Page
	title={residence?.residenceName || $_('menu.residences')}
	titleHref={`/residences/${id}`}
	headTitle={`${residence?.residenceName || residence?.id} — ${$_('menu.residences')}`}
	showHeader={!!residence?.residenceName}
>
	{#snippet nav()}
		{#if isMember || isAdmin}
			<li>
				<Anchor href={`/residences/${id}/members`}>
					{#if isAdmin}
						<Icon icon="user-encircled-alt2-fill" />
					{:else}
						<Icon icon="users" />
					{/if}
					{$_('pages.residences.detail.members')}
				</Anchor>
			</li>
			<li>
				<Anchor href={`/residences/${id}/maintenances`}>
					<Icon icon="paint-roller" />
					{$_('menu.maintenances')}
				</Anchor>
			</li>
			<li>
				<Anchor href={`/residences/${id}/messages`}>
					<Icon icon="paint-roller" />
					{$_('menu.messages')}
				</Anchor>
			</li>
		{/if}
	{/snippet}

	{@render children()}
</Page>
