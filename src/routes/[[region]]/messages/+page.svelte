<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { api } from '$lib/api.svelte.js';
	import { userState } from '$lib/states/user.svelte.js';
	import { _ } from 'svelte-i18n';
	import MessageList from '$lib/components/messages/MessageList.svelte';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import { locale } from 'svelte-i18n';
	
	requiresAuth(locale);
	
	console.log('Messages page loaded');

	let activeTab = 'inbox';
	let messages = [];
	let loading = false;
	let unreadCount = 0;

	async function loadMessages() {
		loading = true;
		console.log('Loading messages for tab:', activeTab);
		try {
			let rawMessages = [];
			switch (activeTab) {
				case 'inbox':
					rawMessages = await api.getReceivedMessages();
					break;
				case 'sent':
					rawMessages = await api.getSentMessages();
					break;
				case 'unread':
					rawMessages = await api.getUnreadMessages();
					break;
			}
			
			// Group messages by thread and sort by most recent activity
			messages = groupMessagesByThread(rawMessages);
			console.log('Messages loaded and grouped:', messages);
		} catch (error) {
			console.error('Error loading messages:', error);
		} finally {
			loading = false;
		}
	}
	
	function groupMessagesByThread(messageList) {
		const threads = new Map();
		
		// Group messages by thread
		messageList.forEach(message => {
			const threadId = message.threadId || message.id;
			
			if (!threads.has(threadId)) {
				threads.set(threadId, {
					id: threadId,
					messages: [],
					latestMessage: null,
					latestTimestamp: null
				});
			}
			
			const thread = threads.get(threadId);
			thread.messages.push(message);
			
			// Update latest message info
			const messageTime = new Date(message.createdAt);
			if (!thread.latestTimestamp || messageTime > thread.latestTimestamp) {
				thread.latestTimestamp = messageTime;
				thread.latestMessage = message;
			}
		});
		
		// Convert to array and sort by latest activity (newest first)
		const threadArray = Array.from(threads.values());
		threadArray.sort((a, b) => b.latestTimestamp - a.latestTimestamp);
		
		// Sort messages within each thread by timestamp (newest first)
		threadArray.forEach(thread => {
			thread.messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
		});
		
		return threadArray;
	}

	async function loadUnreadCount() {
		try {
			unreadCount = await api.getUnreadMessageCount();
		} catch (error) {
			console.error('Error loading unread count:', error);
		}
	}

	onMount(() => {
		loadMessages();
		loadUnreadCount();
	});

	function setActiveTab(tab) {
		console.log('Setting active tab to:', tab);
		activeTab = tab;
		loadMessages();
	}

	$: showSender = activeTab !== 'sent';
	$: showRecipient = activeTab === 'sent';
	$: emptyMessage = activeTab === 'unread' ? $_('messages.noUnreadMessages') : $_('messages.empty');
</script>

<svelte:head>
	<title>{$_('messages.title')} - {$_('title')}</title>
</svelte:head>

<main>
	<header>
		<div>
			<h1>{$_('messages.title')}</h1>
			<p>{$_('messages.personal.description')}</p>
		</div>
		<a href="/messages/compose">
			{$_('messages.compose')}
		</a>
	</header>

	<nav>
		<button 
			on:click={() => setActiveTab('inbox')}
		>
			{$_('messages.inbox')} {activeTab === 'inbox' ? '(Active)' : ''}
		</button>
		<button 
			on:click={() => setActiveTab('sent')}
		>
			{$_('messages.sent')} {activeTab === 'sent' ? '(Active)' : ''}
		</button>
		<button 
			on:click={() => setActiveTab('unread')}
		>
			{$_('messages.unread')} {activeTab === 'unread' ? '(Active)' : ''} {unreadCount > 0 ? `(${unreadCount})` : ''}
		</button>
	</nav>

	{#if loading}
		<div>
			{$_('messages.loading')}
		</div>
	{:else if messages.length === 0}
		<div>
			<p>{emptyMessage}</p>
		</div>
	{:else}
		<div>
			{#each messages as thread}
				<details>
					<summary>
						<strong>{thread.latestMessage.subject || $_('messages.noSubject')}</strong>
						<span>({thread.messages.length} {thread.messages.length === 1 ? $_('messages.message') : $_('messages.messages')})</span>
						<span>{new Date(thread.latestTimestamp).toLocaleDateString()}</span>
					</summary>
					<div>
						{#each thread.messages as message}
							<div>
								<div>
									<a href={$page.params.region ? `/${$page.params.region}/messages/${message.id}` : `/messages/${message.id}`}>
										{message.subject || $_('messages.noSubject')}
									</a>
									<span>{new Date(message.createdAt).toLocaleDateString()}</span>
								</div>
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
									<span>{message.priority}</span>
								</div>
								{#if message.content}
									<div>
										<p>{message.content.substring(0, 150)}{message.content.length > 150 ? '...' : ''}</p>
									</div>
								{/if}
							</div>
						{/each}
					</div>
				</details>
			{/each}
		</div>
	{/if}
</main>