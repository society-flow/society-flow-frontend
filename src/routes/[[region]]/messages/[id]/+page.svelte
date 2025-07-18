<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { api } from '$lib/api.svelte.js';
	import { _ } from 'svelte-i18n';

	let message = null;
	let threadMessages = [];
	let loading = true;
	let error = '';
	let replyContent = '';
	let showReplyForm = false;
	let replying = false;

	const messageId = $page.params.id;

	async function loadMessage() {
		try {
			message = await api.getMessageById(messageId);
			
			// Try to mark as read, but don't fail if it doesn't work
			try {
				await api.markMessageAsRead(messageId);
			} catch (readErr) {
				console.warn('Failed to mark message as read:', readErr);
			}
			
			// Load thread messages if there's a thread
			if (message.threadId) {
				try {
					console.log('Loading thread messages for threadId:', message.threadId);
					threadMessages = await api.getThreadMessages(message.threadId);
					console.log('Thread messages loaded:', threadMessages);
				} catch (threadErr) {
					console.warn('Failed to load thread messages:', threadErr);
					threadMessages = [];
				}
			}
		} catch (err) {
			console.error('Error loading message:', err);
			error = err.message || $_('messages.error.loadFailed');
		} finally {
			loading = false;
		}
	}

	async function handleReply() {
		if (!replyContent.trim()) {
			return;
		}

		replying = true;
		try {
			const replyData = {
				toUserId: message.fromUserId,
				toSocietyId: message.toSocietyId,
				toResidenceId: message.toResidenceId,
				subject: message.subject.startsWith('Re:') ? message.subject : `Re: ${message.subject}`,
				content: replyContent,
				messageType: message.messageType,
				threadId: message.threadId || message.id,
				parentMessageId: message.id,
				priority: 'MEDIUM',
				visibility: 'PRIVATE',
				advertisementId: message.advertisementId
			};

			await api.createMessage(replyData);
			replyContent = '';
			showReplyForm = false;
			
			// Reload the thread to show the new reply
			await loadMessage();
		} catch (err) {
			error = err.message || $_('messages.error.replyFailed');
		} finally {
			replying = false;
		}
	}

	async function handleDelete() {
		if (confirm($_('messages.confirmDelete'))) {
			try {
				await api.deleteMessage(messageId);
				goto('/messages');
			} catch (err) {
				error = err.message || $_('messages.error.deleteFailed');
			}
		}
	}

	async function handleInteraction(type) {
		try {
			await api.interactWithMessage(messageId, type);
			// Reload message to update interaction status
			await loadMessage();
		} catch (err) {
			error = err.message || $_('messages.error.interactionFailed');
		}
	}

	function formatDate(dateString) {
		const date = new Date(dateString);
		return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
	}

	onMount(loadMessage);
</script>

<svelte:head>
	<title>{message?.subject || $_('messages.loading')} - {$_('title')}</title>
</svelte:head>

<main>
	<header>
		<nav>
			<a href="/messages">{$_('messages.title')}</a>
			<span>›</span>
			<span>{message?.subject || $_('messages.loading')}</span>
		</nav>
	</header>

	{#if loading}
		<div>
			{$_('messages.loading')}
		</div>
	{:else if error}
		<div>
			{error}
		</div>
	{:else if message}
		<article>
			<div>
				<header>
					<h1>{message.subject}</h1>
					<div>
						<button on:click={() => showReplyForm = !showReplyForm}>
							{$_('messages.reply')}
						</button>
						<button on:click={() => handleInteraction('BOOKMARK')}>
							{$_('messages.bookmark')}
						</button>
						<button on:click={handleDelete}>
							{$_('messages.delete')}
						</button>
					</div>
				</header>

				<div>
					<div>
						<span>{$_('messages.from')}:</span>
						<span>{message.fromUserId}</span>
					</div>
					<div>
						<span>{$_('messages.date')}:</span>
						<span>{formatDate(message.createdAt)}</span>
					</div>
					<div>
						<span>{$_('messages.type')}:</span>
						<span>{message.messageType}</span>
					</div>
					<div>
						<span>{$_('messages.priority')}:</span>
						<span>{message.priority}</span>
					</div>
				</div>

				<div>
					<p>{message.content}</p>
				</div>

				{#if message.attachments && message.attachments.length > 0}
					<div>
						<h3>{$_('messages.attachments')}</h3>
						<ul>
							{#each message.attachments as attachment}
								<li>
									<a href={attachment.url} target="_blank">
										{attachment.filename}
									</a>
									<span>({attachment.size})</span>
								</li>
							{/each}
						</ul>
					</div>
				{/if}
			</div>

			{#if threadMessages.length > 1}
				<section>
					<h2>{$_('messages.conversation')}</h2>
					{#each threadMessages.filter(m => m.id !== message.id) as threadMessage}
						<div>
							<div>
								<span>{threadMessage.fromUserId}</span>
								<span>{formatDate(threadMessage.createdAt)}</span>
							</div>
							<div>
								<p>{threadMessage.content}</p>
							</div>
						</div>
					{/each}
				</section>
			{/if}

			{#if showReplyForm}
				<form on:submit|preventDefault={handleReply}>
					<h3>{$_('messages.replyTo', { values: { subject: message.subject } })}</h3>
					<textarea
						bind:value={replyContent}
						placeholder={$_('messages.replyPlaceholder')}
						rows="6"
						required
					></textarea>
					<div>
						<button type="button" on:click={() => showReplyForm = false}>
							{$_('messages.cancel')}
						</button>
						<button type="submit" disabled={replying}>
							{replying ? $_('messages.sending') : $_('messages.sendReply')}
						</button>
					</div>
				</form>
			{/if}
		</article>
	{/if}
</main>

