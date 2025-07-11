<script lang="typescript">
	import { _, locale } from 'svelte-i18n';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import Logout from '$lib/components/auth/logout.svelte';

	requiresAuth($locale);
</script>

<Page title={$_('menu.auth.logout')} isCenter={true}>
	<section>
		<Logout />
	</section>
</Page>
