<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import RelativeDate from '$lib/components/date/relative.svelte';

	const { user } = $props();
</script>

<article class="Card">
	<span class="Card-id" title={$_('components.users.card.user_id')}>
		{user.id}
	</span>
	{#if user?.name}
		<span class="Card-name" title={$_('components.users.card.user_name')}>
			{user.name}
		</span>
	{/if}
	{#if user?.role}
		<span class="Card-role" title={$_('components.users.card.user_role')}>
			{$_(`const.society_roles.${user.role}`)}
		</span>
	{/if}
	{#if user?.createdAt}
		<span class="Card-date" title={$_('components.users.card.member_since')}>
			<RelativeDate date={user.createdAt} />
		</span>
	{/if}
</article>

<style>
	.Card {
		display: flex;
		flex-wrap: wrap;
		padding: calc(var(--s) / 3);
	}
	.Card-id {
		display: none;
	}
	.Card-role {
		order: -1;
	}
	.Card-name {
		font-weight: bold;
	}
	.Card-name,
	.Card-role,
	.Card-date {
		padding: calc(var(--s) / 2);
	}
</style>
