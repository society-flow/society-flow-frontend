<script lang="javascript">
	import { _, locale } from 'svelte-i18n';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { api } from '$lib/api.svelte.js';
	import { userState } from '$lib/states/user.svelte.js';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import Form from '$lib/components/ads/form.svelte';

	requiresAuth(locale);

	async function onsuccess({ id }) {
		setTimeout(() => goto(`${base}/${$locale}/ads/${id}`), 0);
	}
</script>

<Page title={$_('menu.create.ads')}>
	<Form {onsuccess} />
</Page>
