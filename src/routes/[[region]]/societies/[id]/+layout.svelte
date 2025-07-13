<script>
	import { _, locale } from 'svelte-i18n';
	import { invalidate } from '$app/navigation';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import Anchor from '$lib/components/anchor.svelte';
	import {
		IconUsers,
    IconUserEncircledAlt2Fill,
		IconWorld,
		IconBusiness,
		IconPaintRoller,
		IconBudgetAlt,
		IconUserEncircledAltFill,
		IconLogIn,
	} from 'obra-icons-svelte';

	requiresAuth(locale);

	const { children, data } = $props();
	const { society, userRole, isAdmin } = $derived(data);
	const id = $derived(society.id);

	async function handleRoleUpdate() {
		invalidate('data:society');
	}
</script>

<Page
	title={society?.name || $_('menu.societies')}
	titleHref={`/societies/${id}`}
	headTitle={`${society?.name || society?.id} — ${$_('menu.societies')}`}
	showHeader={!!society?.name}
>
	{#snippet nav()}
		<li>
			<Anchor href={`/societies/${id}/residences`}>
				<IconBusiness />
				{$_('menu.residences')}
			</Anchor>
		</li>
		<li>
			<Anchor href={`/societies/${id}/expenses`}>
				<IconBudgetAlt />
				{$_('menu.expenses')}
			</Anchor>
		</li>
		<li>
			<Anchor href={`/societies/${id}/maintenances`}>
				<IconPaintRoller />
				{$_('menu.maintenances')}
			</Anchor>
		</li>
		<li>
			<Anchor href={`/societies/${id}/members`}>
        {#if isAdmin}
          <IconUserEncircledAlt2Fill />
        {:else}
					<IconUsers />
        {/if}
				{$_('pages.societies.detail.members')}
			</Anchor>
		</li>
		<li>
			<Anchor href={`/societies/${id}/ads`}>
				<IconWorld />
				{$_('menu.ads')}
			</Anchor>
		</li>
		{#if !userRole}
			<li><SocietyJoin societyId={id} {userRole} onJoin={handleRoleUpdate} /></li>
		{/if}
	{/snippet}

	{@render children()}
</Page>
