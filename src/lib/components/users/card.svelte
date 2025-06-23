<script lang="javascript">
	import { _ } from 'svelte-i18n';

	const { user } = $props();

	function formatDate(dateString) {
		if (!dateString) return '';
		return new Date(dateString).toLocaleDateString();
	}

	function getRoleBadgeClass(role) {
		const roleMap = {
			ADMIN: 'admin',
			MANAGER: 'manager',
			MEMBER: 'member',
			OWNER: 'owner'
		};
		return roleMap[role] || 'member';
	}
</script>

<article class="Card">
	<span class="Card-id" title={$_('components.users.card.user_id')}>
		{user.id}
	</span>
	<span class="Card-name" title={$_('components.users.card.user_name')}>
		{user.name}
	</span>
	<span class="Card-role" title={$_('components.users.card.user_role')}>{user.role}</span>

	{#if user.createdAt}
		<span class="Card-date" title={$_('components.users.card.member_since')}
			>{formatDate(user.createdAt)}</span
		>
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
