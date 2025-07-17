<script>
	import { _ } from 'svelte-i18n';
	import { api } from '$lib/api.svelte.js';
	import { userState } from '$lib/states/user.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import Anchor from '$lib/components/anchor.svelte';
	import InvitationsList from '$lib/components/invitations/list.svelte';
	import CreateInvitationForm from '$lib/components/invitations/form.svelte';

	// State for showing/hiding create form
	let showCreateForm = $state(false);
	
	// Data loading states
	let receivedInvitations = $state([]);
	let sentInvitations = $state([]);
	let loading = $state(true);
	let error = $state('');

	// Load invitations on mount
	$effect(async () => {
		if (userState.user) {
			try {
				// Load both received and sent invitations
				const [received, sent] = await Promise.all([
					api.getMyInvitations(),
					api.getSentInvitations()
				]);
				receivedInvitations = received;
				sentInvitations = sent;
			} catch (err) {
				error = err.message;
			} finally {
				loading = false;
			}
		}
	});

	// Handle successful invitation creation
	function handleInvitationCreated(newInvitation) {
		sentInvitations = [...sentInvitations, newInvitation];
		showCreateForm = false;
	}

	// Handle invitation actions (accept/decline/cancel)
	async function handleInvitationAction(action, invitationId) {
		try {
			if (action === 'accept') {
				await api.acceptInvitation(invitationId);
				// Remove from received invitations
				receivedInvitations = receivedInvitations.filter(inv => inv.id !== invitationId);
			} else if (action === 'decline') {
				await api.declineInvitation(invitationId);
				// Remove from received invitations
				receivedInvitations = receivedInvitations.filter(inv => inv.id !== invitationId);
			} else if (action === 'cancel') {
				await api.cancelInvitation(invitationId);
				// Remove from sent invitations
				sentInvitations = sentInvitations.filter(inv => inv.id !== invitationId);
			}
		} catch (err) {
			error = err.message;
		}
	}
</script>

<Page title={$_('pages.invitations.title')}>
	<section>
		<h1>{$_('pages.invitations.title')}</h1>
		
		{#if error}
			<div class="error">{error}</div>
		{/if}

		{#if loading}
			<div>{$_('common.loading')}</div>
		{:else}
			<!-- Create invitation button -->
			<div class="actions">
				<button onclick={() => showCreateForm = !showCreateForm}>
					{showCreateForm ? $_('common.cancel') : $_('pages.invitations.create_invitation')}
				</button>
			</div>

			<!-- Create invitation form -->
			{#if showCreateForm}
				<CreateInvitationForm onsuccess={handleInvitationCreated} />
			{/if}

			<!-- Received invitations -->
			<section>
				<h2>{$_('pages.invitations.received_invitations')}</h2>
				{#if receivedInvitations.length === 0}
					<p>{$_('pages.invitations.no_received_invitations')}</p>
				{:else}
					<InvitationsList 
						invitations={receivedInvitations} 
						type="received" 
						onaction={handleInvitationAction} 
					/>
				{/if}
			</section>

			<!-- Sent invitations -->
			<section>
				<h2>{$_('pages.invitations.sent_invitations')}</h2>
				{#if sentInvitations.length === 0}
					<p>{$_('pages.invitations.no_sent_invitations')}</p>
				{:else}
					<InvitationsList 
						invitations={sentInvitations} 
						type="sent" 
						onaction={handleInvitationAction} 
					/>
				{/if}
			</section>
		{/if}
	</section>
</Page>