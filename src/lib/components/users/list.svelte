<script lang="javascript">
	import UserCard from '$lib/components/users/card.svelte';
	import { _ } from 'svelte-i18n';

	let { users = [] } = $props();
</script>

{#if users.length > 0}
	<ul>
		{#each users as user}
			<li><UserCard {user} /></li>
		{/each}
	</ul>
{:else}
	<p>{$_('components.users.list.no_user')}</p>
{/if}
