<script>
  import { _, locale } from 'svelte-i18n';
	import { page } from '$app/stores';
  import { base } from '$app/paths';
  import { goto } from '$app/navigation';
	import { api } from '$lib/api.svelte.js';
  import Page from '$lib/components/routes/page.svelte';
	import Form from '$lib/components/residences/form.svelte';

	const id = $derived($page.params.id);
	let data = $state(null);
	let error = $state('');

	$effect(async () => {
		try {
			data = await api.getResidenceById(id);
		} catch (e) {
			error = e.message;
		}
	});

	function onsuccess(residence) {
    setTimeout(() => goto(`${base}/${$locale}/residences/${residence.id}`), 0);
  }
</script>

<Page title={$_('menu.update.residences')}>
	{#if error}
		<p>{error}</p>
	{:else if !data}
		<progress />
	{:else}
		<Form {data} {onsuccess} />
	{/if}
</Page>
