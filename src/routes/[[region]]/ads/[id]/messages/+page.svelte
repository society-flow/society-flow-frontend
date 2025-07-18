<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { api } from '$lib/api.svelte.js';
	import { userState } from '$lib/states/user.svelte.js';
	import { _ } from 'svelte-i18n';
	import MessageList from '$lib/components/messages/MessageList.svelte';
	import MessageComposer from '$lib/components/messages/MessageComposer.svelte';

	let ad = null;
	let messages = [];
	let loading = false;
	let error = '';
	let showComposer = false;
	let composerLoading = false;
	let isOwner = false;

	const adId = $page.params.id;

	async function loadAd() {
		try {
			ad = await api.getAdvertisementById(adId);
			console.log('Loaded ad:', ad);
			console.log('Ad userId:', ad.userId);
			isOwner = userState.user?.id === ad.userId;
		} catch (err) {
			error = err.message || $_('ads.error.loadFailed');
		}
	}

	async function loadMessages() {
		loading = true;
		try {
			messages = await api.getAdMessages(adId);
		} catch (err) {
			error = err.message || $_('messages.error.loadFailed');
		} finally {
			loading = false;
		}
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
		loadAd();
		loadMessages();
	});
</script>

<svelte:head>
	<title>{$_('messages.ad.title')} - {ad?.title || ''} - {$_('title')}</title>
</svelte:head>

<main>
	<header>
		<nav>
			<a href="/ads">{$_('menu.ads')}</a>
			<span>›</span>
			<a href="/ads/{adId}">{ad?.title || adId}</a>
			<span>›</span>
			<span>{$_('messages.ad.title')}</span>
		</nav>
		
		<div>
			{#if userState.isAuth && !isOwner}
				<button on:click={() => showComposer = !showComposer}>
					{showComposer ? $_('messages.compose.cancel') : $_('messages.ad.inquire')}
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
		<h1>{$_('messages.ad.title')}</h1>
		{#if ad}
			<div>
				<p>{ad.title}</p>
				<p>{ad.description}</p>
				<div>
					<span>{ad.price ? `€${ad.price}` : $_('ads.priceOnRequest')}</span>
					<span>{ad.isActive ? $_('ads.active') : $_('ads.inactive')}</span>
				</div>
			</div>
		{/if}
	</section>

	{#if showComposer}
		<section>
			<h2>{$_('messages.ad.compose')}</h2>
			<MessageComposer
				toUserId={ad?.userId || ''}
				subject={$_('messages.compose.adInquiry')}
				messageType="AD_INQUIRY"
				advertisementId={adId}
				disabled={composerLoading}
				on:submit={handleComposeSubmit}
				on:cancel={handleComposeCancel}
			/>
		</section>
	{/if}

	<section>
		{#if isOwner}
			<h2>{$_('messages.ad.inquiries')}</h2>
			<p>{$_('messages.ad.inquiriesDescription')}</p>
		{:else}
			<h2>{$_('messages.ad.myInquiries')}</h2>
			<p>{$_('messages.ad.myInquiriesDescription')}</p>
		{/if}
		
		<MessageList 
			{messages} 
			{loading} 
			emptyMessage={isOwner ? $_('messages.ad.noInquiries') : $_('messages.ad.noMyInquiries')}
			showSender={isOwner}
			showRecipient={!isOwner}
		/>
	</section>
</main>