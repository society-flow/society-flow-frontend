<script>
	import { _ } from 'svelte-i18n';
	import List from '$lib/components/list.svelte';
	import Card from '$lib/components/users/card.svelte';
	import { IconClose } from 'obra-icons-svelte';

	const { users = [], onRemoveUser } = $props();
</script>

{#if users.length > 0}
	<List items={users}>
		{#snippet children(user)}
			<Card {user} />
		{/snippet}
		{#snippet aside(user)}
			{#if onRemoveUser}
				<li>
					<button type="button" on:click={() => onRemoveUser(user)}>
						<IconClose />
						{$_('common.delete')}
					</button>
				</li>
			{/if}
		{/snippet}
	</List>
{:else}
	<span>{$_('components.users.list.no_user')}</span>
{/if}
