<script lang="javascript">
	import { _, locale } from 'svelte-i18n';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import Form from '$lib/components/residences/form.svelte';

	requiresAuth(locale);

	const societyId = $derived($page.params.societyId);
	const data = $derived({ societyId });
  
	async function onSuccess({ id }) {
		goto(`${base}/${$locale}/residences/${id}`);
	}
</script>

<Page title={$_('menu.create.residences')}>
	<Form {onSuccess} {data} />
</Page>
