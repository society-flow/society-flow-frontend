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
	<div>
		<strong>{$_('components.users.card.user_id')}:</strong>
		{user.id}
	</div>
	<div>
		<strong>{$_('components.users.card.user_name')}:</strong>
		{user.name}
	</div>
	<div>
		<strong>{$_('components.users.card.user_role')}:</strong>
		<span>{user.role}</span>
	</div>
	{#if user.createdAt}
		<div>
			{$_('components.users.card.member_since')}: {formatDate(user.createdAt)}
		</div>
	{/if}
</article>
