<script>
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { api } from '$lib/api.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import Map from '$lib/components/map.svelte';
	import Anchor from '$lib/components/anchor.svelte';
	import Icon from '$lib/components/icon.svelte';
	import Dialog from '$lib/components/dialog.svelte';
	import AdDetails from '$lib/components/ads/details.svelte';
	import SocietyCard from '$lib/components/societies/card.svelte';
	import ResidencyCard from '$lib/components/residences/card.svelte';
	import FormatDateRelative from '$lib/components/format/date-relative.svelte';
	import { userState } from '$lib/states/user.svelte.js';
	import MessageComposer from '$lib/components/messages/MessageComposer.svelte';

	const { data } = $props();
	const { advert, residency, society, adTypes, isAdmin, isOwner } = $derived(data);
	const id = $derived($page.params.id);

	let coordinates = $derived(advert?.approxGeoCoordinate);
	let selectedLocation = $derived(residency || society);
	let locationCoordinates = $derived(selectedLocation?.geoCoordinate || coordinates);
	let adOption = $derived(adTypes?.find((type) => advert?.type === type.id));

	let markers = $derived(
		locationCoordinates
			? [
					{
						coordinates: [locationCoordinates.y, locationCoordinates.x],
						title: selectedLocation?.name || advert.title || advert.id
					}
				]
			: []
	);

	let adminMessageLoading = false;
	let adminMessageError = '';
	let userMessageLoading = false;
	let userMessageError = '';

	async function handleAdminMessageSubmit(event) {
		const messageData = event.detail;
		
		adminMessageLoading = true;
		adminMessageError = '';
		
		try {
			await api.createMessage(messageData);
			// The dialog should close automatically after successful submission
		} catch (err) {
			adminMessageError = err.message || $_('messages.compose.error.general');
		} finally {
			adminMessageLoading = false;
		}
	}

	function handleAdminMessageCancel() {
		adminMessageError = '';
	}

	async function handleUserMessageSubmit(event) {
		const messageData = event.detail;
		
		userMessageLoading = true;
		userMessageError = '';
		
		try {
			await api.createMessage(messageData);
			// The dialog should close automatically after successful submission
		} catch (err) {
			userMessageError = err.message || $_('messages.compose.error.general');
		} finally {
			userMessageLoading = false;
		}
	}

	function handleUserMessageCancel() {
		userMessageError = '';
	}
</script>

<Page
	title={`${advert?.title || advert?.id || ''}`}
	headTitle={`${advert?.title || advert?.id} — ${$_('menu.ads')}`}
>
	<header>
		<nav>
			<ul>
				{#if advert.createdAt}
					<li>
						<Icon icon="calendar-selected-date" />
						<strong>
							{$_('common.created')}
						</strong>
						<FormatDateRelative date={advert.createdAt} />
					</li>
				{/if}
				{#if advert.updatedAt}
					<li>
						<Icon icon="watch" />
						<strong>
							{$_('common.updated')}
						</strong>
						<FormatDateRelative date={advert.updatedAt} />
					</li>
				{/if}
			</ul>
		</nav>
		<nav>
			<ul>
				<li>
					{#if isAdmin || isOwner}
						<span>
							{#if advert.isActive}
								{$_('pages.ads.detail.isActive')}
							{:else}
								{$_('pages.ads.detail.isNotActive')}
							{/if}
						</span>
					{/if}
				</li>
				<li>
					<Anchor href={`/ads?type=${adOption?.id}`} isButton>
						{$_(`const.ads_types.${adOption?.name}`)}
						<Icon icon="hashtag" />
					</Anchor>
				</li>
				{#if advert.updatedAt && advert.updatedAt !== advert.createdAt}
					<li>
						<span>
							{$_('common.updated')}
							<FormatDateRelative date={advert.updatedAt} />
						</span>
					</li>
				{/if}
				{#if isAdmin || isOwner}
					<li>
						<Anchor href={`/delete/ads/${id}`} title={$_('common.delete')} isButton>
							{$_('common.delete')}
						</Anchor>
					</li>
					<li>
						<Anchor href={`/update/ads/${id}`} title={$_('menu.update.ads')} isButton>
							{$_('menu.update.ads')}
						</Anchor>
					</li>
				{:else}
					{#if userState.isAuth}
						<li>
							<Anchor href={`/messages/compose?recipient=${advert.userId}&ad=${id}`} isButton>
								{$_('messages.compose')}
								<Icon icon="message" />
							</Anchor>
						</li>
					{/if}
					<li title={$_('common.contact_publisher')}>
						<Dialog>
							{#snippet buttonOpen()}
								{$_('common.contact_publisher')}
								<Icon icon="send-alt" />
							{/snippet}
							<div>
								<h3>{$_('common.contact_publisher')}</h3>
								<p>{$_('messages.compose.publisherInquiry')}</p>
								
								{#if userMessageError}
									<div>
										{userMessageError}
									</div>
								{/if}
								
								<MessageComposer
									toUserId={advert.userId}
									subject={`Inquiry about ad: ${advert.title}`}
									messageType="ADVERTISEMENT_INQUIRY"
									advertisementId={advert.id}
									disabled={userMessageLoading}
									on:submit={handleUserMessageSubmit}
									on:cancel={handleUserMessageCancel}
								/>
							</div>
						</Dialog>
					</li>
				{/if}
			</ul>
		</nav>
	</header>

	<section>
		<AdDetails {advert} />
	</section>

	{#if selectedLocation}
		<aside>
			{#if residency}
				<ResidencyCard {residency} />
			{:else if society}
				<SocietyCard {society} />
			{/if}
		</aside>
	{/if}

	{#if markers.length}
		<aside>
			<Map {markers} />
		</aside>
	{/if}
</Page>

<style>
	:global(main) header:has(nav) {
		justify-content: center;
	}
	nav ul {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		/* gap: calc(var(--s) * 2); */
		li {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-wrap: wrap;
			gap: calc(var(--s) / 2);
			:global(time) {
				/* color: red; */
			}
		}
	}
</style>
