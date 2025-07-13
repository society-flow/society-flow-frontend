<script>
  import { _, locale } from 'svelte-i18n';
	import { page } from '$app/stores';
  import { base } from '$app/paths';
  import { goto } from '$app/navigation';
	import { api } from '$lib/api.svelte.js';
  import Error from '$lib/components/error.svelte';
  import Page from '$lib/components/routes/page.svelte';
	import Form from '$lib/components/residences/form.svelte';

	const id = $derived($page.params.id);
	let data = $state(null);
	let error = $state('');

	$effect(async () => {
		try {
			data = await api.getResidenceById(id);
		} catch (e) {
			error = e;
		}
	});

  function onSuccess({ id }) {
    goto(`${base}/${$locale}/residences/${id}`);
  }
</script>

<Page title={$_('menu.update.residences')}>
	{#if error}
		<Error {error} />
  {:else if !data}
    <progress></progress>
    {:else}
      <Form {data} {onSuccess} />
	{/if}
</Page>
