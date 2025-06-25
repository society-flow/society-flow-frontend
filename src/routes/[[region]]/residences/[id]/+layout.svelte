<script>
	import { _ } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { invalidate } from '$app/navigation';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import Anchor from '$lib/components/anchor.svelte';
	import ResidenceJoin from '$lib/components/residences/join.svelte';

	requiresAuth(page);

	const { children, data } = $props();
	const { residence, isMember } = data;
	const id = $derived(residence.id);

	function handleJoin() {
		invalidate();
	}
</script>

<Page
	title={residence?.residenceName || $_('menu.residences')}
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
			{#if !isMember}
				<li>
					<ResidenceJoin
						residenceId={id}
						societyId={residence.societyId}
						{isMember}
						onJoin={handleJoin}
					/>
				</li>
			{/if}
			{#if isMember}
				<li>
					<Anchor href={`/update/residences/${id}`} title={$_('menu.update.residences')}>
						{$_('menu.update.residences')}
					</Anchor>
				</li>
				<li>
					<Anchor href={`/delete/residences/${id}`} title={$_('common.delete')}>
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
