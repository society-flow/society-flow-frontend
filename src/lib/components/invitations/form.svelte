<script>
	import { _ } from 'svelte-i18n';
	import { api } from '$lib/api.svelte.js';
	import { userState } from '$lib/states/user.svelte.js';

	// Props: onsuccess callback
	const { onsuccess = () => {} } = $props();

	// Form state
	let form = $state({
		email: '',
		toJoinSociety: '',
		toJoinSocietyWithRole: 'MEMBER',
		toJoinResidence: ''
	});

	// Loading and error states
	let isLoading = $state(false);
	let error = $state('');

	// Available user societies (for dropdown)
	let userSocieties = $state([]);
	let residences = $state([]);

	// Load user societies on mount
	$effect(async () => {
		if (userState.user) {
			try {
				userSocieties = await api.getUserSocieties();
			} catch (err) {
				console.error('Error loading user societies:', err);
			}
		}
	});

	// Load residences when society is selected
	$effect(async () => {
		if (form.toJoinSociety) {
			try {
				residences = await api.getAllResidencesInSociety(form.toJoinSociety);
			} catch (err) {
				console.error('Error loading residences:', err);
				residences = [];
			}
		} else {
			residences = [];
		}
		// Reset residence selection when society changes
		form.toJoinResidence = '';
	});

	// Handle form submission
	async function handleSubmit() {
		if (!form.email.trim() || !form.toJoinSociety) {
			error = $_('errors.required_fields');
			return;
		}

		isLoading = true;
		error = '';

		try {
			// Prepare invitation data
			const invitationData = {
				email: form.email,
				toJoinSociety: form.toJoinSociety,
				toJoinSocietyWithRole: form.toJoinSocietyWithRole,
				toJoinResidence: form.toJoinResidence || null
			};

			const newInvitation = await api.createInvitation(invitationData);
			
			// Reset form
			form = {
				email: '',
				toJoinSociety: '',
				toJoinSocietyWithRole: 'MEMBER',
				toJoinResidence: ''
			};

			onsuccess(newInvitation);
		} catch (err) {
			error = err.message || $_('errors.generic');
		} finally {
			isLoading = false;
		}
	}

	function resetMessages() {
		error = '';
	}
</script>

<form onsubmit={handleSubmit}>
	<h3>{$_('components.invitations.form.title')}</h3>
	
	<!-- Email field -->
	<fieldset>
		<legend>{$_('components.invitations.form.email')}</legend>
		<input
			bind:value={form.email}
			type="email"
			placeholder={$_('components.invitations.form.email_placeholder')}
			required
			oninput={resetMessages}
		/>
	</fieldset>

	<!-- Society selection -->
	<fieldset>
		<legend>{$_('components.invitations.form.society')}</legend>
		<select bind:value={form.toJoinSociety} onchange={resetMessages} required>
			<option value="">{$_('components.invitations.form.select_society')}</option>
			{#each userSocieties as society}
				<option value={society.id}>
					{society.name}
				</option>
			{/each}
		</select>
	</fieldset>

	<!-- Role selection -->
	<fieldset>
		<legend>{$_('components.invitations.form.role')}</legend>
		<select bind:value={form.toJoinSocietyWithRole} onchange={resetMessages}>
			<option value="MEMBER">{$_('components.invitations.form.role_member')}</option>
			<option value="ADMIN">{$_('components.invitations.form.role_admin')}</option>
		</select>
	</fieldset>

	<!-- Residence selection (optional) -->
	<fieldset>
		<legend>{$_('components.invitations.form.residence')}</legend>
		<select bind:value={form.toJoinResidence} onchange={resetMessages}>
			<option value="">{$_('components.invitations.form.select_residence')}</option>
			{#each residences as residence}
				<option value={residence.id}>
					{residence.residenceName || residence.id}
				</option>
			{/each}
		</select>
	</fieldset>

	<!-- Submit button -->
	<fieldset>
		<button type="submit" disabled={isLoading}>
			{isLoading ? $_('common.loading') : $_('components.invitations.form.send_invitation')}
		</button>
	</fieldset>

	<!-- Error message -->
	{#if error}
		<fieldset data-type="error">
			{error}
		</fieldset>
	{/if}
</form>