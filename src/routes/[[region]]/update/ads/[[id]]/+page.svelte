<script>
	import { _, locale } from 'svelte-i18n';
	import { page } from '$app/stores';
  import { base } from '$app/paths';
  import { goto } from '$app/navigation';
	import { api } from '$lib/api.svelte.js';
	import Error from '$lib/components/error.svelte';
	import Page from '$lib/components/routes/page.svelte';
	import Form from '$lib/components/ads/form.svelte';

	const id = $derived($page.params.id);
	let data = $state(null);
	let error = $state('');

	$effect(async () => {
		try {
			data = await api.getAdvertisementById(id);
		} catch (e) {
			error = e;
		}
	});

	function onsuccess(ad) {
    setTimeout(() => goto(`${base}/${$locale}/ads/${ad.id}`), 0);
	}
</script>

<Page title={$_('menu.update.ads')}>
	{#if error}
		<Error {error} />
  {:else if !data}
    <progress></progress>
	{:else}
		<Form {data} {onsuccess} />
	{/if}
</Page>
