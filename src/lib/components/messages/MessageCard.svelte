<script>
	import { _ } from 'svelte-i18n';
	import { page } from '$app/stores';
	
	export let message;
	export let showSender = true;
	export let showRecipient = false;
	export let compact = false;

	function formatDate(dateString) {
		const date = new Date(dateString);
		return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
	}

	function truncateContent(content, maxLength = 150) {
		if (!content || content.length <= maxLength) return content;
		return content.substring(0, maxLength) + '...';
	}

	// Create proper message link with region parameter
	$: messageLink = $page.params.region ? `/${$page.params.region}/messages/${message.id}` : `/messages/${message.id}`;
</script>

<article>
	<header>
		<h3>
			<a href={messageLink}>
				{message.subject || $_('messages.noSubject')}
			</a>
		</h3>
		<div>
			<span>{formatDate(message.createdAt)}</span>
			{#if message.priority === 'HIGH'}
				<span>{$_('messages.priorities.high')}</span>
			{/if}
		</div>
	</header>

	<div>
		{#if showSender && message.fromUserId}
			<div>
				<span>{$_('messages.from')}:</span>
				<span>{message.fromUserId}</span>
			</div>
		{/if}
		
		{#if showRecipient && message.toUserId}
			<div>
				<span>{$_('messages.to')}:</span>
				<span>{message.toUserId}</span>
			</div>
		{/if}
		
		<div>
			<span>{message.messageType}</span>
		</div>
	</div>

	{#if !compact && message.content}
		<div>
			<p>{truncateContent(message.content)}</p>
		</div>
	{/if}
</article>