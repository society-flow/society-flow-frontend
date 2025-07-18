<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { api } from '$lib/api.svelte.js';
	import { userState } from '$lib/states/user.svelte.js';
	import { _ } from 'svelte-i18n';
	import MessageComposer from '$lib/components/messages/MessageComposer.svelte';

	let loading = false;
	let error = '';

	// Get recipient from URL params if replying to an ad
	const recipientId = $page.url.searchParams.get('recipient') || '';
	const adId = $page.url.searchParams.get('ad');

	let subject = '';
	let messageType = 'GENERAL';

	if (adId) {
		subject = $_('messages.compose.adInquiry');
		messageType = 'ADVERTISEMENT_INQUIRY';
	}

	async function handleSubmit(event) {
		const messageData = event.detail;
		
		loading = true;
		error = '';

		try {
			await api.createMessage(messageData);
			goto('/messages');
		} catch (err) {
			error = err.message || $_('messages.compose.error.general');
		} finally {
			loading = false;
		}
	}

	function handleCancel() {
		goto('/messages');
	}
</script>

<svelte:head>
	<title>{$_('messages.compose.title')} - {$_('title')}</title>
</svelte:head>

<main>
	<header>
		<h1>{$_('messages.compose.title')}</h1>
		<a href="/messages">
			{$_('messages.compose.back')}
		</a>
	</header>

	{#if error}
		<div>
			{error}
		</div>
	{/if}

	<MessageComposer 
		{recipientId} 
		{subject} 
		{messageType}
		disabled={loading}
		on:submit={handleSubmit}
		on:cancel={handleCancel}
	/>
</main>

