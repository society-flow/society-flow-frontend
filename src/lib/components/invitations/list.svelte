<script>
	import { _ } from 'svelte-i18n';

	// Props: invitations array, type (received/sent), onaction callback
	const { invitations, type, onaction } = $props();

	// Handle action button clicks
	function handleAction(action, invitationId) {
		onaction(action, invitationId);
	}
</script>

<div>
	{#each invitations as invitation}
		<div>
			<!-- Invitation details -->
			<div>
				<div>
					<strong>{$_('components.invitations.list.email')}:</strong> {invitation.email}
				</div>
				<div>
					<strong>{$_('components.invitations.list.society')}:</strong> {invitation.toJoinSociety}
				</div>
				<div>
					<strong>{$_('components.invitations.list.role')}:</strong> {invitation.toJoinSocietyWithRole}
				</div>
				{#if invitation.toJoinResidence}
					<div>
						<strong>{$_('components.invitations.list.residence')}:</strong> {invitation.toJoinResidence}
					</div>
				{/if}
				<div>
					<strong>{$_('components.invitations.list.created')}:</strong> 
					{invitation.createdAt ? new Date(invitation.createdAt).toLocaleDateString() : 'N/A'}
				</div>
			</div>

			<!-- Action buttons based on type -->
			<div>
				{#if type === 'received'}
					<!-- Actions for received invitations -->
					<button onclick={() => handleAction('accept', invitation.id)}>
						{$_('components.invitations.list.accept')}
					</button>
					<button onclick={() => handleAction('decline', invitation.id)}>
						{$_('components.invitations.list.decline')}
					</button>
				{:else if type === 'sent'}
					<!-- Actions for sent invitations -->
					<button onclick={() => handleAction('cancel', invitation.id)}>
						{$_('components.invitations.list.cancel')}
					</button>
				{/if}
			</div>
		</div>
	{/each}
</div>