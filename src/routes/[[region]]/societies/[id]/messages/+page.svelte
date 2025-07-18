<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { api } from '$lib/api.svelte.js';
	import { userState } from '$lib/states/user.svelte.js';
	import { _ } from 'svelte-i18n';
	import MessageComposer from '$lib/components/messages/MessageComposer.svelte';

	let society = null;
	let messages = [];
	let loading = false;
	let error = '';
	let showComposer = false;
	let composerLoading = false;

	const societyId = $page.params.id;

	async function loadSociety() {
		try {
			society = await api.getSocietyById(societyId);
		} catch (err) {
			error = err.message || $_('societies.error.loadFailed');
		}
	}

	async function loadMessages() {
		loading = true;
		try {
			const rawMessages = await api.getSocietyMessages(societyId);
			messages = groupMessagesByThread(rawMessages);
			console.log('Society messages loaded and grouped:', messages);
		} catch (err) {
			error = err.message || $_('messages.error.loadFailed');
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

	async function handleComposeSubmit(event) {
		const messageData = event.detail;
		
		composerLoading = true;
		try {
			await api.createMessage(messageData);
			showComposer = false;
			console.log('Message sent, refreshing society messages...');
			await loadMessages();
		} catch (err) {
			error = err.message || $_('messages.compose.error.general');
		} finally {
			composerLoading = false;
		}
	}

	function handleComposeCancel() {
		showComposer = false;
	}

	onMount(() => {
		loadSociety();
		loadMessages();
	});
</script>

<svelte:head>
	<title>{$_('messages.society.title')} - {society?.name || ''} - {$_('title')}</title>
</svelte:head>

<main>
	<header>
		<nav>
			<a href="/societies">{$_('menu.societies')}</a>
			<span>›</span>
			<a href="/societies/{societyId}">{society?.name || societyId}</a>
			<span>›</span>
			<span>{$_('messages.society.title')}</span>
		</nav>
		
		<div>
			{#if userState.isAuth}
				<button on:click={() => showComposer = !showComposer}>
					{showComposer ? $_('messages.compose.cancel') : $_('messages.compose')}
				</button>
			{/if}
		</div>
	</header>

	{#if error}
		<div>
			{error}
		</div>
	{/if}

	<section>
		<h1>{$_('messages.society.title')}</h1>
		{#if society}
			<p>{society.name}</p>
			<p>{$_('messages.society.description')}</p>
		{/if}
	</section>

	{#if showComposer}
		<section>
			<h2>{$_('messages.society.compose')}</h2>
			<MessageComposer
				toSocietyId={societyId}
				subject=""
				messageType="COMMUNITY_EVENT"
				disabled={composerLoading}
				on:submit={handleComposeSubmit}
				on:cancel={handleComposeCancel}
			/>
		</section>
	{/if}

	{#if loading}
		<div>
			{$_('messages.loading')}
		</div>
	{:else if messages.length === 0}
		<div>
			<p>{$_('messages.society.empty')}</p>
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
								{#if message.fromUserId}
									<div>
										<span>{$_('messages.from')}:</span>
										<span>{message.fromUserId}</span>
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