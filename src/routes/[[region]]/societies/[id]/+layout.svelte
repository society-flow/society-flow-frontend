<script>
	import { _, locale } from 'svelte-i18n';
	import { invalidate } from '$app/navigation';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import Anchor from '$lib/components/anchor.svelte';

	requiresAuth(locale);

	const { children, data } = $props();
	const { society, isAdmin, userRole } = $derived(data);
	const id = $derived(society.id);

	async function handleRoleUpdate() {
		invalidate('data:society');
	}
</script>

<Page
	title={society?.name || $_('menu.societies')}
	headTitle={`${society?.name || society?.id} — ${$_('menu.societies')}`}
	showHeader={!!society?.name}
>
	{#snippet nav()}
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
			<li><Anchor href={`/societies/${id}/maintenances`}>{$_('menu.maintenances')}</Anchor></li>
			<li><Anchor href={`/societies/${id}/ads`}>{$_('menu.ads')}</Anchor></li>
			{#if !userRole}
				<li><SocietyJoin societyId={id} {userRole} onJoin={handleRoleUpdate} /></li>
			{/if}
			{#if isAdmin}
				<li>
					<Anchor href={`/update/societies/${id}`} title={$_('menu.update.societies')}>
						{$_('menu.update.societies')}
					</Anchor>
				</li>
				<li>
					<Anchor href={`/delete/societies/${id}`} title={$_('common.delete')}>
						{$_('common.delete')}
					</Anchor>
				</li>
			{/if}
		</ul>
	{/snippet}

	<article class="Detail">
		{@render children()}
	</article>
</Page>
