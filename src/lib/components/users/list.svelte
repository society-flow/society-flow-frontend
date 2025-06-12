<script>
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

{console.log('users', users)}

{#if users.length > 0}
	<ul>
		{#each users as user}
			<li>
				<div>
					<div>
						<strong>User ID:</strong>
						{user.id}
					</div>
					<div>
						<strong>User Name:</strong>
						{user.name}
					</div>
					<div>
						<span class="role-badge {getRoleBadgeClass(user.role)}">
							{user.role}
						</span>
					</div>
					{#if user.createdAt}
						<div>
							Member since: {formatDate(user.createdAt)}
						</div>
					{/if}
				</div>
			</li>
		{/each}
	</ul>
{:else}
	<p>No members found.</p>
{/if}
