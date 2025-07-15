<script>
	import { _ } from 'svelte-i18n';
	import List from '$lib/components/list.svelte';
	import Card from '$lib/components/users/card.svelte';
	import Icon from '$lib/components/icon.svelte';

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
						{$_('common.delete')}
						<Icon icon="close" />
					</button>
				</li>
			{/if}
		{/snippet}
	</List>
{:else}
	<span>{$_('components.users.list.no_user')}</span>
{/if}
