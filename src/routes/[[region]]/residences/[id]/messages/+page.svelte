<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { api } from '$lib/api.svelte.js';
	import { userState } from '$lib/states/user.svelte.js';
	import { _ } from 'svelte-i18n';
	import MessageComposer from '$lib/components/messages/MessageComposer.svelte';

	let residence = null;
	let society = null;
	let messages = [];
	let loading = false;
	let error = '';
	let showComposer = false;
	let composerLoading = false;

	const residenceId = $page.params.id;

	async function loadResidence() {
		try {
			residence = await api.getResidenceById(residenceId);
			if (residence?.societyId) {
				society = await api.getSocietyById(residence.societyId);
			}
		} catch (err) {
			error = err.message || $_('residences.error.loadFailed');
		}
	}

	async function loadMessages() {
		loading = true;
		try {
			const rawMessages = await api.getResidenceMessages(residenceId);
			messages = groupMessagesByThread(rawMessages);
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
		loadResidence();
		loadMessages();
	});
</script>

<svelte:head>
	<title>{$_('messages.residence.title')} - {residence?.residenceName || ''} - {$_('title')}</title>
</svelte:head>


<header>
    <nav>
        <a href="/residences">{$_('menu.residences')}</a>
        <span>›</span>
        {#if residence}
            <a href="/residences/{residenceId}">{residence.name}</a>
            <span>›</span>
        {/if}
        <a href="/residences/{residenceId}">{residence?.residenceName || residenceId}</a>
        <span>›</span>
        <span>{$_('messages.residence.title')}</span>
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
    <h1>{$_('messages.residence.title')}</h1>
    {#if residence}
        <div>
            <p>{residence.residenceName}</p>
            {#if society}
                <p>{$_('messages.residence.society')}: {society.name}</p>
            {/if}
            <p>{$_('messages.residence.description')}</p>
        </div>
    {/if}
</section>

{#if showComposer}
    <section>
        <h2>{$_('messages.residence.compose')}</h2>
        <MessageComposer
            toResidenceId={residenceId}
            subject=""
            messageType="MAINTENANCE_NOTICE"
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
        <p>{$_('messages.residence.empty')}</p>
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