<script lang="javascript">
	import { _, locale } from 'svelte-i18n';
	import { api } from '$lib/api.svelte.js';
	import { userState } from '$lib/states/user.svelte.js';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import Form from '$lib/components/ads/form.svelte';

	requiresAuth(locale);

	function handleCreated(data) {
		console.log('data', data);
	}
</script>

<Page title={$_('menu.create.ads')}>
	<Form onSuccess={handleCreated} />
</Page>
