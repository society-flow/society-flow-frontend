<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import FormatDateRelative from '$lib/components/format/date-relative.svelte';
	import Icon from '$lib/components/icon.svelte';
	import Card from '$lib/components/card.svelte';

	const { user } = $props();
	const isAdmin = $derived(user?.role === 'ADMIN');
</script>

<Card>
	<div>
		{#if user?.name}
			<span class="Card-name" title={$_('components.users.card.user_name')}>
				{#if isAdmin}
					<Icon icon="user-encircled-alt2-fill" />
				{:else}
					<Icon icon="user" />
				{/if}
				{user.name}
			</span>
		{/if}

		{#if user?.role}
			<span class="Card-role" title={$_('components.users.card.user_role')} class:isAdmin>
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
		/* order: -1; */
		&.isAdmin {
			font-weight: bold;
		}
	}
	.Card-name {
		font-weight: bold;
		display: flex;
		align-items: center;
		gap: calc(var(--s) / 1);
	}
	.Card-name,
	.Card-role,
	.Card-date {
		padding: calc(var(--s) / 2);
	}
</style>
