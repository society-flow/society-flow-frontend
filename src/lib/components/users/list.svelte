<script lang="javascript">
	import { _ } from 'svelte-i18n';

	let { users = [] } = $props();

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

{#if users.length > 0}
	<ul>
		{#each users as user}
			<li>
				<div>
					<div>
						<strong>{$_('components.users.list.user_id')}:</strong>
						{user.id}
					</div>
					<div>
						<strong>{$_('components.users.list.user_name')}:</strong>
						{user.name}
					</div>
					<div>
						<strong>{$_('components.users.list.user_role')}:</strong>
						<span class="role-badge {getRoleBadgeClass(user.role)}">
							{user.role}
						</span>
					</div>
					{#if user.createdAt}
						<div>
							{$_('components.users.list.member_since')}: {formatDate(user.createdAt)}
						</div>
					{/if}
				</div>
			</li>
		{/each}
	</ul>
{:else}
	<p>{$_('components.users.list.no_members')}</p>
{/if}
