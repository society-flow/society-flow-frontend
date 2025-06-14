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
  const data = $derived({societyId})

	async function onsuccess({ id }) {
		setTimeout(() => goto(`${base}/${$locale}/residences/${id}`), 0);
	}
</script>

<Page title={$_('menu.create.residences')}>
	<section>
		<Form {onsuccess} {data} />
	</section>
</Page>
