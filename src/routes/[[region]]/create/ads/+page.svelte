<script>
	import { _, locale } from 'svelte-i18n';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { api } from '$lib/api.svelte.js';
	import { userState } from '$lib/states/user.svelte.js';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import Form from '$lib/components/ads/form.svelte';

	requiresAuth(locale);

	const societyId = page.url.searchParams.get('society');
	const residencyId = page.url.searchParams.get('residency');

	const data = $derived({ societyId, residencyId });

	async function onsuccess({ id }) {
       goto(`${base}/${$locale}/ads/${id}`);
	}
</script>

<Page title={$_('menu.create.ads')}>
	<Form {onsuccess} {data} />
</Page>
