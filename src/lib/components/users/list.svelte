<script lang="javascript">
	import UserCard from '$lib/components/users/card.svelte';
	import { _ } from 'svelte-i18n';

	// Optional callback: onRemoveUser(user)
	const { users = [], onRemoveUser } = $props();
</script>

{#if users.length > 0}
	<ul class="List">
		{#each users as user}
			<li class="List-item">
				<UserCard {user} />
				{#if onRemoveUser}
					<button type="button" on:click={() => onRemoveUser(user)}>
						{$_('common.delete')}
					</button>
				{/if}
			</li>
		{/each}
	</ul>
{:else}
	<p class="text-center">{$_('components.users.list.no_user')}</p>
{/if}

<style>
	.List-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem;
	}
</style>
