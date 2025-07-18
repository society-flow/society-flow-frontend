<script lang="javascript">
	import { _, locale } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import { api } from '$lib/api.svelte.js';
	import { PUBLIC_API_URL } from '$env/static/public';
	import { userState } from '$lib/states/user.svelte.js';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import Anchor from '$lib/components/anchor.svelte';
	import Error from '$lib/components/error.svelte';

	requiresAuth(locale);

	const model = $derived($page.params.model);
	const id = $derived($page.params.id);

	let item = $state({});
	let error = $state(null);
	let isDeleting = $state(false);

	$effect(async () => {
		if (model && id) {
			try {
				if (model === 'ads') {
					item = await api.getAdvertisementById(id);
				} else if (model === 'residences') {
					item = await api.getResidenceById(id);
				} else if (model === 'societies') {
					item = await api.getSocietyById(id);
				} else if (model === 'expenses') {
					item = await api.getExpenseById(id);
				} else if (model === 'invitations') {
					item = await api.getInvitationById(id);
				} else {
					error = `Unsupported model: ${model}`;
				}
			} catch (e) {
				error = e.message || e;
			}
		}
	});

	async function handleDelete() {
		isDeleting = true;
		try {
			console.log(`Deleting ${model} with ID: ${id}`);
			
			if (model === 'ads') {
				// Soft delete by setting isActive to false
				console.log('Soft deleting advertisement...');
				await api.updateAdvertisement({ ...item, isActive: false });
			} else if (model === 'residences') {
				// Soft delete by setting isActive to false
				console.log('Soft deleting residence...');
				await api.createOrUpdateResidence({ ...item, isActive: false });
			} else if (model === 'societies') {
				// Soft delete by setting isActive to false
				console.log('Soft deleting society...');
				await api.createOrUpdateSociety({ ...item, isActive: false });
			} else if (model === 'expenses') {
				// Soft delete by setting isActive to false
				console.log('Soft deleting expense...');
				await api.createOrUpdateExpense({ ...item, isActive: false });
			} else if (model === 'invitations') {
				// Hard delete via cancel invitation API
				console.log('Hard deleting invitation...');
				await api.cancelInvitation(id);
			} else {
				throw new Error(`Delete not supported for model: ${model}`);
			}
			
			console.log(`Successfully deleted ${model} with ID: ${id}`);
			
			// Navigate back to the model list page
			goto(`${base}/${$locale}/${model}`);
		} catch (e) {
			console.error(`Error deleting ${model}:`, e);
			error = e.message || e;
		} finally {
			isDeleting = false;
		}
	}
</script>

<Page title={`Delete ${model}`} isCenter>
	{#if error}
		<Error {error} />
	{:else if !item.id}
		<progress></progress>
	{:else}
		<form>
			<p>
				{$_('pages.delete.confirm')} "<strong
					>{item.name || item.title || item.residenceName || item.email}</strong
				>"?
			</p>
			<fieldset>
				<button onclick={handleDelete} disabled={isDeleting}>
					{isDeleting ? $_('common.deleting') : $_('common.delete')}
				</button>
			</fieldset>
		</form>
	{/if}

	{#snippet footer()}
		{#if item.id}
			<nav>
				<ul>
					<li>
						<Anchor href={`/${model}/${item.id}`}>{$_('common.cancel') || 'Cancel'}</Anchor>
					</li>
				</ul>
			</nav>
		{/if}
	{/snippet}
</Page>
