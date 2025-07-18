<script>
	import { _ } from 'svelte-i18n';
	import MessageCard from './MessageCard.svelte';
	
	export let messages = [];
	export let loading = false;
	export let emptyMessage = $_('messages.empty');
	export let showSender = true;
	export let showRecipient = false;
	export let compact = false;
</script>

<section>
	{#if loading}
		<div>
			<p>{$_('messages.loading')}</p>
		</div>
	{:else if messages.length === 0}
		<div>
			<p>{emptyMessage}</p>
		</div>
	{:else}
		<div>
			{#each messages as message}
				<MessageCard 
					{message} 
					{showSender} 
					{showRecipient} 
					{compact} 
				/>
			{/each}
		</div>
	{/if}
</section>