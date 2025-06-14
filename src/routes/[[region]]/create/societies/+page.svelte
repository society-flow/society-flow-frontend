<script lang="javascript">
	import { _, locale } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import { api } from '$lib/api.svelte.js';
	import { userState } from '$lib/states/user.svelte.js';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import Form from '$lib/components/societies/form.svelte';

	requiresAuth(locale);

	function onsuccess(newSociety) {
		setTimeout(() => goto(`${base}/${$locale}/societies/${newSociety.id}`), 0);
	}
</script>

<Page title={$_('menu.create.societies')}>
	<Form {onsuccess} />
</Page>
