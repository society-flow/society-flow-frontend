<script>
	import { createEventDispatcher } from 'svelte';
	import { _ } from 'svelte-i18n';
	
	const dispatch = createEventDispatcher();
	
	export let toUserId = '';
	export let toSocietyId = '';
	export let toResidenceId = '';
	export let subject = '';
	export let messageType = 'GENERAL';
	export let isReply = false;
	export let disabled = false;
	export let advertisementId = '';
	export let threadId = '';
	export let parentMessageId = '';

	let form = {
		toUserId: '',
		toSocietyId: '',
		toResidenceId: '',
		subject: '',
		content: '',
		messageType: 'GENERAL',
		priority: 'MEDIUM',
		visibility: 'PRIVATE',
		advertisementId: '',
		threadId: '',
		parentMessageId: '',
		attachments: [],
		emailNotification: false,
		pushNotification: false,
		smsNotification: false,
		notifyRecipients: true,
		tags: [],
		metadata: {}
	};

	let errors = {};

	function validateForm() {
		errors = {};
		
		// At least one recipient type is required
		if (!form.toUserId && !form.toSocietyId && !form.toResidenceId) {
			errors.recipient = $_('messages.compose.error.recipientRequired');
		}
		
		if (!form.content.trim()) {
			errors.content = $_('messages.compose.error.contentRequired');
		}
		
		return Object.keys(errors).length === 0;
	}

	function handleSubmit() {
		if (!validateForm()) return;
		
		const messageData = {
			...form,
			content: form.content.trim()
		};
		
		dispatch('submit', messageData);
	}

	function handleCancel() {
		dispatch('cancel');
	}

	$: form.toUserId = toUserId;
	$: form.toSocietyId = toSocietyId;
	$: form.toResidenceId = toResidenceId;
	$: form.subject = subject;
	$: form.messageType = messageType;
	$: form.advertisementId = advertisementId;
	$: form.threadId = threadId;
	$: form.parentMessageId = parentMessageId;
</script>

<form on:submit|preventDefault={handleSubmit}>
	<div>
		{#if form.toSocietyId}
			<label for="recipient">{$_('messages.compose.society')}</label>
			<input
				type="text"
				id="recipient"
				bind:value={form.toSocietyId}
				placeholder={$_('messages.compose.societyPlaceholder')}
				{disabled}
				readonly
			/>
		{:else if form.toResidenceId}
			<label for="recipient">{$_('messages.compose.residence')}</label>
			<input
				type="text"
				id="recipient"
				bind:value={form.toResidenceId}
				placeholder={$_('messages.compose.residencePlaceholder')}
				{disabled}
				readonly
			/>
		{:else}
			<label for="recipient">{$_('messages.compose.recipient')}</label>
			<input
				type="text"
				id="recipient"
				bind:value={form.toUserId}
				placeholder={$_('messages.compose.recipientPlaceholder')}
				{disabled}
				readonly
			/>
		{/if}
		{#if errors.recipient}
			<span>{errors.recipient}</span>
		{/if}
	</div>

	<div>
		<label for="subject">{$_('messages.compose.subject')}</label>
		<input
			type="text"
			id="subject"
			bind:value={form.subject}
			placeholder={$_('messages.compose.subjectPlaceholder')}
			{disabled}
		/>
	</div>

	<div>
		<div>
			<label for="messageType">{$_('messages.compose.type')}</label>
			<select id="messageType" bind:value={form.messageType} {disabled}>
				<option value="GENERAL">{$_('messages.compose.types.general')}</option>
				<option value="COMPLAINT">{$_('messages.compose.types.complaint')}</option>
				<option value="INQUIRY">{$_('messages.compose.types.inquiry')}</option>
				<option value="ANNOUNCEMENT">{$_('messages.compose.types.announcement')}</option>
				<option value="MAINTENANCE_NOTICE">{$_('messages.compose.types.maintenanceNotice')}</option>
				<option value="PAYMENT_REMINDER">{$_('messages.compose.types.paymentReminder')}</option>
				<option value="COMMUNITY_EVENT">{$_('messages.compose.types.communityEvent')}</option>
				<option value="EMERGENCY_ALERT">{$_('messages.compose.types.emergencyAlert')}</option>
				<option value="ADVERTISEMENT_INQUIRY">{$_('messages.compose.types.advertisementInquiry')}</option>
				<option value="FEEDBACK">{$_('messages.compose.types.feedback')}</option>
				<option value="SUGGESTION">{$_('messages.compose.types.suggestion')}</option>
			</select>
		</div>

		<div>
			<label for="priority">{$_('messages.compose.priority')}</label>
			<select id="priority" bind:value={form.priority} {disabled}>
				<option value="LOW">{$_('messages.compose.priorities.low')}</option>
				<option value="MEDIUM">{$_('messages.compose.priorities.medium')}</option>
				<option value="HIGH">{$_('messages.compose.priorities.high')}</option>
				<option value="URGENT">{$_('messages.compose.priorities.urgent')}</option>
			</select>
		</div>
		
		<div>
			<label for="visibility">{$_('messages.compose.visibility')}</label>
			<select id="visibility" bind:value={form.visibility} {disabled}>
				<option value="PUBLIC">{$_('messages.compose.visibilities.public')}</option>
				<option value="PRIVATE">{$_('messages.compose.visibilities.private')}</option>
				<option value="SOCIETY_WIDE">{$_('messages.compose.visibilities.societyWide')}</option>
				<option value="RESIDENCE_ONLY">{$_('messages.compose.visibilities.residenceOnly')}</option>
				<option value="ADMIN_ONLY">{$_('messages.compose.visibilities.adminOnly')}</option>
			</select>
		</div>
	</div>

	<div>
		<label for="content">{$_('messages.compose.message')}</label>
		<textarea
			id="content"
			bind:value={form.content}
			rows="8"
			placeholder={$_('messages.compose.messagePlaceholder')}
			{disabled}
		></textarea>
		{#if errors.content}
			<span>{errors.content}</span>
		{/if}
	</div>

	<div>
		<button type="button" on:click={handleCancel} {disabled}>
			{$_('messages.compose.cancel')}
		</button>
		<button type="button" {disabled} on:click={handleSubmit}>
			{isReply ? $_('messages.compose.sendReply') : $_('messages.compose.send')}
		</button>
	</div>
</form>