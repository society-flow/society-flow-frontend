<script>
	import { _ } from 'svelte-i18n';
	import List from '$lib/components/list.svelte';
	import Card from '$lib/components/users/card.svelte';

	const { users = [], onRemoveUser } = $props();
</script>

{#if users.length > 0}
	<List items={users} className="List--users">
		{#snippet children(user)}
			<Card {user} />
		{/snippet}
		{#snippet aside(user)}
			{#if onRemoveUser}
				<li>
					<button type="button" on:click={() => onRemoveUser(user)}>
						{$_('common.delete')}
					</button>
				</li>
			{/if}
		{/snippet}
	</List>
{:else}
	<p class="text-center">{$_('components.users.list.no_user')}</p>
{/if}

<style>
	:global(.List--users) {
		:global(.List-item) {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0.5rem;
		}
	}
</style>
