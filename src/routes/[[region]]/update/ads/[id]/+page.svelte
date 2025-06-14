<script>
	import { _ } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { api } from '$lib/api.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import Form from '$lib/components/ads/form.svelte';

	const id = $derived($page.params.id);
	let data = $state(null);
	let error = $state('');

	$effect(async () => {
		try {
			data = await api.getAdvertisementById(id);
			console.log(data);
		} catch (e) {
			error = e.message;
		}
	});

	function handleUpdated(updatedData) {
		console.log('Updated:', updatedData);
	}
</script>

<Page title={$_('menu.update.ads')}>
	{#if error}
		<p>{error}</p>
	{:else if !data}
		<progress />
	{:else}
		<Form initialData={data} onSuccess={handleUpdated} />
	{/if}
</Page>
