<script lang="javascript">
	import { _, locale } from 'svelte-i18n';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import Form from '$lib/components/expenses/form.svelte';

	requiresAuth(locale);

	const societyId = page.url.searchParams.get('society');

	async function onsuccess({ id }) {
		// Navigate to expense detail after creation
       goto(`${base}/${$locale}/expenses/${id}`);
	}
</script>

<Page title={$_('menu.create.expenses')}>
	<Form data={{ societyId }} {onsuccess} />
</Page>
