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
				} else {
					error = `Unsupported model: ${model}`;
				}
			} catch (e) {
				error = e;
			}
		}
	});

	async function handleDelete() {
		isDeleting = true;
		try {
			if (model === 'ads') {
				await api.updateAdvertisement(id, { ...item, isActive: false });
			} else if (model === 'residences') {
				await api.createOrUpdateResidence({ ...item, isActive: false });
			} else if (model === 'societies') {
				await api.createOrUpdateSociety({ ...item }); // no isActive flag for societies
			} else if (model === 'expenses') {
				// Attempt hard delete via HTTP DELETE if supported
				const url = `${PUBLIC_API_URL}/api/expenses/${id}`;
				const headers = { 'Content-Type': 'application/json' };
				if (userState.token) headers['Authorization'] = `Bearer ${userState.token}`;
				const resp = await fetch(url, { method: 'DELETE', headers });
				if (!resp.ok) {
					const text = await resp.text();
					throw new Error(text || `Failed to delete expense ${id}`);
				}
			}
			setTimeout(() => goto(`${base}/${$locale}/${model}`), 0);
		} catch (e) {
			error = e;
		} finally {
			isDeleting = false;
		}
	}
</script>

<Page title={`Delete ${model.slice(0, -1)}`} isCenter>
	{#if error}
		<Error {error} />
	{:else if !item.id}
		<progress></progress>
	{:else}
		<p class="text-center">
			{$_('pages.delete.confirm')} "<strong>{item.name || item.title || item.residenceName}</strong
			>"?
		</p>
		<form>
			<fieldset>
				<button onclick={handleDelete} disabled={isDeleting}>
					{isDeleting ? $_('common.deleting') : $_('common.delete')}
				</button>
			</fieldset>
		</form>
	{/if}

	{#snippet footer()}
		{#if item.id}
			<Anchor href={`/${model}/${item.id}`}>{$_('common.cancel') || 'Cancel'}</Anchor>
		{/if}
	{/snippet}
</Page>
