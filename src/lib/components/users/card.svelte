<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import FormatDateRelative from '$lib/components/format/date-relative.svelte';
	import { IconUser } from 'obra-icons-svelte';
	import Card from '$lib/components/card.svelte';

	const { user } = $props();
</script>

<Card>
	<div>
		{#if user?.name}
			<span class="Card-name" title={$_('components.users.card.user_name')}>
				<IconUser />
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
				<FormatDateRelative date={user.createdAt} />
			</span>
		{/if}
		<span class="Card-id" title={$_('components.users.card.user_id')}>
			{user.id}
		</span>
	</div>
</Card>

<style>
  div {
    display: flex;
    align-items: center;
    gap: var(--s);
  }
	.Card-id {
		display: none;
	}
	.Card-role {
		order: -1;
	}
	.Card-name {
		font-weight: bold;
		display: flex;
    align-items: center;
    gap: calc(var(--s) / 2);
	}
	.Card-name,
	.Card-role,
	.Card-date {
		padding: calc(var(--s) / 2);
	}
</style>
